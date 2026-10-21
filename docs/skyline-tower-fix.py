# Redo the skyline cut-out around the right-hand tower (sky beside it and around the crane was counted as building).
import numpy as np
from PIL import Image, ImageFilter
im = np.asarray(Image.open('public/images/closing-lyon.webp').convert('RGB')).astype(float)
fg = Image.open('public/images/closing-lyon-fg.webp')
alpha = np.asarray(fg.split()[3]).copy()
h, w, _ = im.shape
X0, X1 = 1440, 1700
L = np.median(im[:, 1405:1435], axis=1); R = np.median(im[:, 1705:1735], axis=1)
top = np.zeros(w, int)
for x in range(X0, X1):
    t = (x - X0) / (X1 - X0); ref = L * (1 - t) + R * t
    d = np.abs(im[:, x] - ref).sum(1) > 60
    run = 0
    for y in range(150, int(h * 0.7)):
        run = run + 1 if d[y] else 0
        if run >= 10: top[x] = y - 9; break
    else: top[x] = int(h*0.7)
a0 = np.asarray(fg.split()[3])
def otop(x): return int(np.argmax(a0[:, x] > 128))
hz0, hz1 = otop(X0 - 1), otop(X1)
for x in range(X0, X1):
    top[x] = min(top[x], round(hz0 + (hz1 - hz0) * (x - X0) / (X1 - X0)))
mask = (np.arange(h)[:, None] >= top[None, X0:X1]).astype(np.uint8) * 255
full = alpha.copy(); full[:, X0:X1] = mask
blur = np.asarray(Image.fromarray(full).filter(ImageFilter.GaussianBlur(1.0)))
alpha[:, X0-3:X1+3] = blur[:, X0-3:X1+3]
rgba = Image.fromarray(im.astype(np.uint8)).convert('RGBA'); rgba.putalpha(Image.fromarray(alpha))
rgba.save('public/images/closing-lyon-fg.webp', 'WEBP', quality=92, method=6)
print(top[X0:X1:10])
