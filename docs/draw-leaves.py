# Draws foreground foliage (palm fronds + monstera-like leaves) as transparent WebP layers.
import math, random, sys
from PIL import Image, ImageDraw, ImageFilter

SS = 2  # supersample

def bez(p0, p1, p2, t):
    return ((1-t)**2*p0[0] + 2*(1-t)*t*p1[0] + t*t*p2[0], (1-t)**2*p0[1] + 2*(1-t)*t*p1[1] + t*t*p2[1])

def frond(d, base, tip, ctrl, length, rnd, shades, n=34, spread=0.9, droop=0.35, width=0.055):
    pts = [bez(base, ctrl, tip, i / 60) for i in range(61)]
    for side in (-1, 1):
        for i in range(n):
            t = 0.08 + 0.9 * i / n
            p = bez(base, ctrl, tip, t)
            q = bez(base, ctrl, tip, min(1, t + 0.01))
            ang = math.atan2(q[1]-p[1], q[0]-p[0])
            # leaflets angle forward toward the tip, longer in the middle
            a = ang + side * (spread + rnd.uniform(-0.12, 0.12))
            L = length * (math.sin(math.pi * min(t * 1.05, 1)) ** 0.6) * rnd.uniform(0.85, 1.1)
            w = L * width
            # leaflet: tapered, drooping curve
            segs = 10
            left, right = [], []
            for k in range(segs + 1):
                u = k / segs
                da = a + side * droop * u * u
                x = p[0] + math.cos(a) * L * u + math.cos(da) * L * 0.15 * u * u
                y = p[1] + math.sin(a) * L * u + math.sin(da) * L * 0.15 * u * u + droop * L * 0.35 * u * u
                ww = w * math.sin(math.pi * min(1, u * 1.15 + 0.05)) * (1 - u * 0.6)
                nx, ny = -math.sin(a), math.cos(a)
                left.append((x + nx * ww, y + ny * ww))
                right.append((x - nx * ww, y - ny * ww))
            d.polygon(left + right[::-1], fill=rnd.choice(shades))
    for i in range(60):
        d.line([pts[i], pts[i+1]], fill=shades[0], width=int(6 * SS * (1 - i / 70)))

def leaf(d, cx, cy, size, rot, rnd, fill, holes=True):
    # Monstera-ish: heart-shaped blade with deep side splits.
    pts = []
    for k in range(120):
        th = 2 * math.pi * k / 120
        r = size * (0.62 + 0.38 * math.sin(th / 2) ** 0.5)
        x, y = r * math.cos(th) * 0.85, r * math.sin(th)
        pts.append((x, y))
    def tr(x, y):
        c, s = math.cos(rot), math.sin(rot)
        return (cx + x * c - y * s, cy + x * s + y * c)
    d.polygon([tr(*p) for p in pts], fill=fill)
    # splits from the edge toward the midrib (drawn as transparent wedges)
    for side in (-1, 1):
        for j in range(5):
            yy = -size * 0.65 + j * size * 0.32
            a0 = (side * size * 0.95, yy - size * 0.03)
            a1 = (side * size * 0.95, yy + size * 0.07)
            a2 = (side * size * 0.18, yy + size * 0.12)
            d.polygon([tr(*a0), tr(*a1), tr(*a2)], fill=(0, 0, 0, 0))
    # midrib
    d.line([tr(0, -size * 0.9), tr(0, size * 0.95)], fill=(0, 0, 0, 0), width=int(3 * SS))

def layer(out, w, h, seed, kind, blur):
    rnd = random.Random(seed)
    W, H = w * SS, h * SS
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    shades = [(22, 56, 33, 255), (31, 74, 42, 255), (42, 90, 50, 255), (56, 104, 58, 255), (70, 98, 48, 255)]
    side = 1 if kind == 'left' else -1
    edge = -W * 0.06 if side == 1 else W * 1.06
    specs = [
        # (base y, tip x, tip y, bend, length scale, droop)
        (-0.04, 0.55, 0.30, 0.10, 0.20, 0.45),
        (0.18, 0.92, 0.12, 0.16, 0.24, 0.35),
        (0.36, 0.80, 0.46, 0.12, 0.21, 0.40),
        (0.55, 0.95, 0.50, 0.18, 0.23, 0.30),
        (0.74, 0.70, 0.88, 0.10, 0.19, 0.45),
        (0.95, 0.85, 0.70, 0.20, 0.22, 0.35),
    ]
    if kind != 'left':
        specs = specs[1::2] + [(0.08, 0.6, 0.38, 0.12, 0.2, 0.4)]
    for by, tx, ty, bend, ls, dr in specs:
        by = H * (by + rnd.uniform(-0.03, 0.03))
        base = (edge, by)
        tip = (W * 0.5 + side * (W * tx - W * 0.5), H * (ty + rnd.uniform(-0.04, 0.04)))
        ctrl = ((base[0] + tip[0]) / 2, min(base[1], tip[1]) - H * bend)
        frond(d, base, tip, ctrl, W * ls * rnd.uniform(0.9, 1.1), rnd, shades, n=rnd.randint(30, 40), droop=dr)
    im = im.resize((w, h), Image.LANCZOS)
    if blur:
        im = im.filter(ImageFilter.GaussianBlur(blur))
    im.save(out, 'WEBP', quality=85, method=6)
    for name, col in (('light', (234, 220, 198)), ('photo', (120, 95, 70))):
        bg = Image.new('RGBA', im.size, col + (255,)); bg.alpha_composite(im)
        bg.convert('RGB').resize((w // 3, h // 3)).save(out.rsplit('.', 1)[0] + f'.{name}.jpg')

outdir = sys.argv[1]
layer(f'{outdir}/leaves-left.webp', 900, 1400, 7, 'left', 1.2)
layer(f'{outdir}/leaves-right.webp', 900, 1400, 11, 'right', 3.5)
