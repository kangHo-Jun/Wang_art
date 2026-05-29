#!/usr/bin/env python3
"""Compress gallery images in place while preserving paths."""

from __future__ import annotations

import argparse
import io
import os
import tempfile
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageFile, ImageOps


MAX_WIDTH = 1920
QUALITY = 82
INPUT_DIR = Path("images")
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".tif", ".tiff"}

Image.MAX_IMAGE_PIXELS = None
ImageFile.LOAD_TRUNCATED_IMAGES = True


@dataclass
class Result:
    path: Path
    before: int
    after: int
    resized: bool
    error: str = ""


def format_bytes(num: int) -> str:
    units = ["B", "KB", "MB", "GB", "TB"]
    value = float(num)
    for unit in units:
        if value < 1024 or unit == units[-1]:
            return f"{value:.1f}{unit}"
        value /= 1024
    return f"{num}B"


def iter_images(root: Path) -> list[Path]:
    return sorted(
        path for path in root.rglob("*")
        if path.is_file() and path.suffix.lower() in IMAGE_EXTS
    )


def convert_mode_for_format(image: Image.Image, ext: str) -> Image.Image:
    if ext in {".jpg", ".jpeg"}:
        if image.mode not in ("RGB", "L"):
            return image.convert("RGB")
    if ext in {".tif", ".tiff"} and image.mode not in ("RGB", "L"):
        return image.convert("RGB")
    return image


def resize_if_needed(image: Image.Image) -> tuple[Image.Image, bool]:
    if image.width <= MAX_WIDTH:
        return image, False
    new_height = round(image.height * (MAX_WIDTH / image.width))
    resized = image.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
    return resized, True


def encode_image(image: Image.Image, ext: str) -> bytes:
    output = io.BytesIO()
    if ext in {".jpg", ".jpeg"}:
        image.save(
            output,
            format="JPEG",
            quality=QUALITY,
            optimize=True,
            progressive=True,
        )
    elif ext == ".png":
        image.save(output, format="PNG", optimize=True)
    elif ext in {".tif", ".tiff"}:
        image.save(
            output,
            format="TIFF",
            compression="jpeg",
            quality=QUALITY,
        )
    else:
        raise ValueError(f"Unsupported extension: {ext}")
    return output.getvalue()


def process_image(path: Path, dry_run: bool) -> Result:
    before = path.stat().st_size
    try:
        with Image.open(path) as src:
            image = ImageOps.exif_transpose(src)
            image = convert_mode_for_format(image, path.suffix.lower())
            image, resized = resize_if_needed(image)
            encoded = encode_image(image, path.suffix.lower())

        if not dry_run:
            fd, temp_name = tempfile.mkstemp(
                prefix=path.stem + "-",
                suffix=path.suffix,
                dir=str(path.parent),
            )
            os.close(fd)
            temp_path = Path(temp_name)
            try:
                temp_path.write_bytes(encoded)
                temp_path.replace(path)
            finally:
                if temp_path.exists():
                    temp_path.unlink()

        return Result(path=path, before=before, after=len(encoded), resized=resized)
    except Exception as exc:  # pragma: no cover
        return Result(path=path, before=before, after=before, resized=False, error=str(exc))


def print_summary(results: list[Result], dry_run: bool) -> None:
    total_before = sum(r.before for r in results)
    total_after = sum(r.after for r in results)
    changed = [r for r in results if not r.error]
    errors = [r for r in results if r.error]
    resized_count = sum(1 for r in changed if r.resized)
    saved = total_before - total_after
    ratio = 0 if total_before == 0 else (saved / total_before) * 100
    mode = "DRY RUN" if dry_run else "EXECUTE"

    print(f"[{mode}] processed: {len(results)} files")
    print(f"[{mode}] resized:   {resized_count} files")
    print(f"[{mode}] errors:    {len(errors)} files")
    print(f"[{mode}] before:    {format_bytes(total_before)}")
    print(f"[{mode}] after:     {format_bytes(total_after)}")
    print(f"[{mode}] saved:     {format_bytes(saved)} ({ratio:.1f}%)")
    print(f"[{mode}] sample results:")

    for result in sorted(changed, key=lambda r: r.before - r.after, reverse=True)[:20]:
        delta = result.before - result.after
        pct = 0 if result.before == 0 else (delta / result.before) * 100
        resized_flag = " resized" if result.resized else ""
        print(
            f"  {result.path.as_posix()} | "
            f"{format_bytes(result.before)} -> {format_bytes(result.after)} | "
            f"{pct:.1f}%{resized_flag}"
        )

    if errors:
        print(f"[{mode}] error details:")
        for result in errors[:20]:
            print(f"  {result.path.as_posix()} | {result.error}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Compress images in place.")
    parser.add_argument("--dry-run", action="store_true", help="Estimate output size only.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    paths = iter_images(INPUT_DIR)
    results = [process_image(path, args.dry_run) for path in paths]
    print_summary(results, args.dry_run)
    return 0 if all(not r.error for r in results) else 1


if __name__ == "__main__":
    raise SystemExit(main())
