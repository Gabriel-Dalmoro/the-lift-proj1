# Foreground cut-outs for the "text rises from behind the landscape" effect.
# For each column we find where the foreground starts (top of the plants, the city
# skyline); everything below that contour is foreground and is drawn above the text.
import sys
import numpy as np
from PIL import Image, ImageFilter

def smooth_cols(top, k):
    # Remove single-column spikes without rounding off real silhouettes.
    pad = np.pad(top, k, mode='edge')
    return np.array([np.median(pad[i:i + 2 * k + 1]) for i in range(len(top))])

def save(src_rgb, top, out, feather=1.5):
    h, w = src_rgb.shape[:2]
    yy = np.arange(h)[:, None]
    mask = (yy >= top[None, :]).astype(np.uint8) * 255
    m = Image.fromarray(mask).filter(ImageFilter.GaussianBlur(feather))
    im = Image.fromarray(src_rgb).convert('RGBA'); im.putalpha(m)
    im.save(out, 'WEBP', quality=84, method=6)
    prev = Image.new('RGBA', im.size, (255, 0, 160, 255)); prev.alpha_composite(im)
    prev.convert('RGB').resize((w // 3, h // 3)).save(out.rsplit('.', 1)[0] + '.preview.jpg')

kind = sys.argv[1]
if kind == 'terrace':
    dayim = Image.open(sys.argv[2]).convert('RGB')
    sun = np.asarray(Image.open(sys.argv[3]).convert('RGB'))
    hsv = np.asarray(dayim.convert('HSV')).astype(float)
    hue, sat, val = hsv[..., 0] * 360 / 255, hsv[..., 1] / 255, hsv[..., 2] / 255
    green = (hue > 55) & (hue < 170) & (sat > 0.2) & (val > 0.05)
    olive = (hue > 25) & (hue <= 55) & (sat > 0.4) & (val > 0.05) & (val < 0.6)
    p = Image.fromarray(((green | olive) * 255).astype(np.uint8)).filter(ImageFilter.MedianFilter(5))
    plant = np.asarray(p) > 128
    h, w = plant.shape
    LEDGE = 634  # top of the low wall at the back of the terrace: the real horizon line
    fg = np.zeros((h, w), bool)
    fg[LEDGE:] = True
    # Grow upwards from the ledge through foliage, so plants standing in front stay in front.
    reach = np.ones(w, bool)
    for y in range(LEDGE - 1, int(0.30 * h), -1):
        prev = reach
        spread = prev | np.roll(prev, 1) | np.roll(prev, -1) | np.roll(prev, 2) | np.roll(prev, -2)
        reach = plant[y] & spread
        if not reach.any():
            break
        fg[y] = reach
    m = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))
    m = m.filter(ImageFilter.GaussianBlur(1.5))
    im = Image.fromarray(sun).convert('RGBA'); im.putalpha(m)
    out = sys.argv[4]
    im.save(out, 'WEBP', quality=84, method=6)
    prev = Image.new('RGBA', im.size, (255, 0, 160, 255)); prev.alpha_composite(im)
    prev.convert('RGB').resize((w // 3, h // 3)).save(out.rsplit('.', 1)[0] + '.preview.jpg')
elif kind == 'skyline':
    im = np.asarray(Image.open(sys.argv[2]).convert('RGB')).astype(float)
    h, w, _ = im.shape
    lum = im.mean(2)
    top = np.full(w, h * 0.9)
    # Sky reference per row, from the clear middle of the frame.
    sky_row = np.median(im[:, int(w * 0.35):int(w * 0.65)], axis=1)
    for x in range(w):
        for y in range(0, int(h * 0.9)):
            d = np.abs(im[y, x] - sky_row[min(y, int(h * 0.42))]).sum()
            if d > 70:
                top[x] = y
                break
    top = smooth_cols(top, 2)
    save(im.astype(np.uint8), top, sys.argv[3], feather=1.0)
print('ok')
