# Foreground cut-out: everything below a real horizon line (a counter, a parapet), plus
# every plant that grows up from it. Same method as the terrace in docs/foreground-cutouts.py.
import sys
import numpy as np
from PIL import Image, ImageFilter
src, out, base, stop = sys.argv[1], sys.argv[2], int(sys.argv[3]), float(sys.argv[4])
# Optional: minimum saturation for foliage, and the size of leaf masses to keep (drops thin vines on walls).
min_sat = float(sys.argv[5]) if len(sys.argv) > 5 else 0.2
mass = int(sys.argv[6]) if len(sys.argv) > 6 else 0
# Optional: x range (fractions) where only the horizon line counts, keeping the text's path clean.
clear = (float(sys.argv[7]), float(sys.argv[8])) if len(sys.argv) > 8 else None
im = Image.open(src).convert('RGB')
rgb = np.asarray(im)
hsv = np.asarray(im.convert('HSV')).astype(float)
hue, sat, val = hsv[..., 0] * 360 / 255, hsv[..., 1] / 255, hsv[..., 2] / 255
green = (hue > 55) & (hue < 170) & (sat > min_sat) & (val > 0.04)
olive = (hue > 25) & (hue <= 55) & (sat > max(0.4, min_sat + 0.1)) & (val > 0.04) & (val < 0.6)
p = Image.fromarray(((green | olive) * 255).astype(np.uint8)).filter(ImageFilter.MedianFilter(5))
if mass:
    p = p.filter(ImageFilter.MinFilter(mass)).filter(ImageFilter.MaxFilter(mass))
plant = np.asarray(p) > 128
h, w = plant.shape
fg = np.zeros((h, w), bool)
fg[base:] = True
reach = np.ones(w, bool)
for y in range(base - 1, int(stop * h), -1):
    spread = reach | np.roll(reach, 1) | np.roll(reach, -1) | np.roll(reach, 2) | np.roll(reach, -2)
    reach = plant[y] & spread
    if not reach.any():
        break
    fg[y] = reach
if clear:
    fg[:base, int(clear[0] * w):int(clear[1] * w)] = False
m = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))
m = m.filter(ImageFilter.GaussianBlur(1.5))
o = Image.fromarray(rgb).convert('RGBA'); o.putalpha(m)
o.save(out, 'WEBP', quality=84, method=6)
pv = Image.new('RGBA', o.size, (255, 0, 160, 255)); pv.alpha_composite(o)
pv.convert('RGB').resize((w // 3, h // 3)).save(out.rsplit('.', 1)[0] + '.preview.jpg')
print('ok', out)
