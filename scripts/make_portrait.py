"""Generate the portfolio portrait assets from the source PNG.

Usage:
  python scripts/make_portrait.py

Writes public/images/mohamed-amiri.jpg (800x800) and
public/images/mohamed-amiri-400.jpg (400x400), square-cropped.
"""
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "source", "portrait.png")
OUT_DIR = os.path.join(ROOT, "public", "images")
FILES = [
    ("mohamed-amiri.jpg", 800, 86),
    ("mohamed-amiri-400.jpg", 400, 84),
]


def main():
    im = Image.open(SRC).convert("RGB")
    w, h = im.size
    print("source", w, h)

    # Keep the full width, anchor the square near the top of the frame so the
    # head keeps headroom and the shoulders / polo fill the lower part.
    side = w
    top = 30
    square = im.crop((0, top, side, top + side))

    for name, size, quality in FILES:
        out = square.resize((size, size), Image.LANCZOS)
        out.save(
            os.path.join(OUT_DIR, name),
            quality=quality,
            optimize=True,
            progressive=True,
        )
        print("wrote", name, out.size)


if __name__ == "__main__":
    main()
