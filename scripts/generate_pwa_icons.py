import struct
import zlib
import os
import math

def make_png(width, height, get_pixel):
    """
    Generate an uncompressed RGBA PNG file from a pixel function.
    get_pixel(x, y) -> (r, g, b, a) with 0-255 values
    """
    raw_rows = []
    for y in range(height):
        row = bytearray([0]) # filter type 0: None
        for x in range(width):
            r, g, b, a = get_pixel(x, y)
            row.extend([r, g, b, a])
        raw_rows.append(bytes(row))
    
    raw_data = b"".join(raw_rows)
    compressed_data = zlib.compress(raw_data, 9)
    
    def chunk(tag, data):
        length = struct.pack(">I", len(data))
        crc = struct.pack(">I", zlib.crc32(tag + data) & 0xffffffff)
        return length + tag + data + crc
    
    ihdr_data = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    
    png = (
        b"\x89PNG\r\n\x1a\n" +
        chunk(b"IHDR", ihdr_data) +
        chunk(b"IDAT", compressed_data) +
        chunk(b"IEND", b"")
    )
    return png

def render_icon(width, height, is_maskable=False):
    cx = width / 2.0
    cy = height / 2.0
    # For maskable, keep content strictly inside safe zone radius
    max_radius = width * 0.40 if is_maskable else width * 0.46

    def get_pixel(x, y):
        dx = x - cx
        dy = y - cy
        dist = math.sqrt(dx * dx + dy * dy)
        
        # Base gradient color (indigo #4F46E5 -> purple #7C3AED -> pink #EC4899)
        t = (x + y) / (width + height)
        if t < 0.5:
            f = t / 0.5
            r = int(79 + (124 - 79) * f)
            g = int(70 + (58 - 70) * f)
            b = int(229 + (237 - 229) * f)
        else:
            f = (t - 0.5) / 0.5
            r = int(124 + (236 - 124) * f)
            g = int(58 + (72 - 58) * f)
            b = int(237 + (153 - 237) * f)
            
        # Rounded corner clip for non-maskable icons
        if not is_maskable:
            # Rounded rect squircle
            corner_r = width * 0.22
            # Check if within squircle
            in_x = abs(dx) < (width / 2.0 - corner_r)
            in_y = abs(dy) < (height / 2.0 - corner_r)
            if not in_x and not in_y:
                cdx = abs(dx) - (width / 2.0 - corner_r)
                cdy = abs(dy) - (height / 2.0 - corner_r)
                if cdx * cdx + cdy * cdy > corner_r * corner_r:
                    return (0, 0, 0, 0) # transparent outside

        # Inner emblem: Central star & book
        # Sparkle star on top:
        star_cy = cy - height * 0.12
        sdx = abs(x - cx)
        sdy = abs(y - star_cy)
        star_r = width * 0.18
        if sdx + sdy < star_r:
            # Gold star
            return (253, 224, 71, 255)

        # Open book shape in lower half
        book_y_top = cy - height * 0.02
        book_y_bot = cy + height * 0.26
        book_w = width * 0.32
        if book_y_top <= y <= book_y_bot and abs(dx) <= book_w:
            # Book page texture
            if abs(dx) < width * 0.02:
                # spine
                return (124, 58, 237, 255)
            elif abs(dx) < book_w * 0.95:
                # white pages
                return (255, 255, 255, 255)

        # Smiley mascot in book center
        if (cy + height * 0.08) <= y <= (cy + height * 0.20):
            # eye 1
            if math.hypot(x - (cx - width * 0.10), y - (cy + height * 0.11)) < width * 0.025:
                return (79, 70, 229, 255)
            # eye 2
            if math.hypot(x - (cx + width * 0.10), y - (cy + height * 0.11)) < width * 0.025:
                return (79, 70, 229, 255)
            # smile arc
            arc_y = cy + height * 0.16
            if abs(y - arc_y) < width * 0.015 and abs(dx) < width * 0.08:
                return (236, 72, 153, 255)

        return (r, g, b, 255)

    return make_png(width, height, get_pixel)

os.makedirs("/public", exist_ok=True)

print("Generating PWA icons...")
# 192x192 standard icon
with open("/public/pwa-192x192.png", "wb") as f:
    f.write(render_icon(192, 192, False))
print("Created /public/pwa-192x192.png")

# 512x512 standard icon
with open("/public/pwa-512x512.png", "wb") as f:
    f.write(render_icon(512, 512, False))
print("Created /public/pwa-512x512.png")

# 512x512 maskable icon (full bleed with safe zone)
with open("/public/pwa-maskable-512x512.png", "wb") as f:
    f.write(render_icon(512, 512, True))
print("Created /public/pwa-maskable-512x512.png")

# 180x180 Apple touch icon
with open("/public/apple-touch-icon.png", "wb") as f:
    f.write(render_icon(180, 180, False))
print("Created /public/apple-touch-icon.png")

# Favicon (48x48 PNG or ICO)
with open("/public/favicon.ico", "wb") as f:
    f.write(render_icon(48, 48, False))
print("Created /public/favicon.ico")

print("All PWA icons generated successfully!")
