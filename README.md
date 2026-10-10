# Echo Cave

A 3D sonar game in a single 2,710-byte `data:` URL, made for [SHRINK](https://shrink.hackclub.com).

You are in a pitch-black, endless cave. Ping to light it up for a moment and listen to the echoes. A hidden beacon hums somewhere; find it by ear. Something else hears your pings too.

## Play

Paste the contents of [`uri.txt`](uri.txt) into a browser address bar, or open `index.html`. Headphones recommended.

| Input | Action |
|---|---|
| Tap / click / Space | Ping |
| Arrows / WASD | Move and turn |
| Hold pointer | Walk (pointer x steers; mouse locks for free look) |

## How it works

- **Cave:** one function, `sin(x+seed) + sin(1.3z) + sin(.7(x+z)) - .9`, decides what is solid. It drives the geometry, collision, echo rays and occlusion. Its frequencies share a period, so the world wraps and never ends.
- **3D:** about 33,000 points, rotated by yaw and perspective-projected onto a 2D canvas.
- **Sonar:** a wavefront expands from the ping; a point lights when the front reaches it and nothing solid is in between.
- **Audio:** every sound is one oscillator with a pitch and gain envelope, panned in stereo and fed through a feedback delay. Echoes are delayed by wall distance.

## Files

- `index.html` — readable, commented source
- `min.html` — hand-golfed version
- `build.mjs` — encodes `min.html` into `uri.txt` and checks the size (`node build.mjs`)
- `uri.txt` — the submission
