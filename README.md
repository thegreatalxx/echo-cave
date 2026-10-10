# Echo Cave

A 3D sonar game, with split-screen, in a single 2,889-byte `data:` URL. Made for [SHRINK](https://shrink.hackclub.com).

You are in a pitch-black, endless cave. Ping to light it up for a moment and listen to the echoes. A hidden beacon hums somewhere; find it by ear. Something else hears your pings too.

Press `2` for split-screen: a race to the beacon, green on the left and blue on the right.

## Play

Paste the contents of [`uri.txt`](uri.txt) into a browser address bar, or open `index.html`. Headphones recommended for one player.

| Mode | Move | Ping |
|---|---|---|
| One player | WASD or arrows; hold the pointer to walk | Space, Enter or a tap |
| Two players, P1 (green) | WASD | Space |
| Two players, P2 (blue) | Arrows | Enter |

## How it works

- **Cave:** one function, `sin(x+seed) + sin(1.3z) + sin(.7(x+z)) - .9`, decides what is solid. It drives the geometry, collision, echo rays and occlusion. Its frequencies share a period, so the world wraps and never ends.
- **3D:** up to about 30,000 points, rotated by yaw and perspective-projected onto a 2D canvas, once per player.
- **Sonar:** a wavefront expands from the ping; a point lights when the front reaches it and nothing solid is in between. Light is shared, so your ping also shows the cave, and you, to the other player.
- **Audio:** every sound is one oscillator with a pitch and gain envelope, panned in stereo and fed through a feedback delay. Echoes are delayed by wall distance. In split-screen each player gets one speaker.
- **Stalker:** drifts through walls towards the most recent ping. Being caught resets your score.

## Files

- `index.html` — readable, commented source
- `min.html` — hand-golfed version
- `build.mjs` — encodes `min.html` into `uri.txt` and checks the size (`node build.mjs`)
- `uri.txt` — the submission
