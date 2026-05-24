
# SGD230 Journal
## 29 April 2026

## Brief OSC distraction

Some good coding references 

(Daniel Shiffman's The Nature of Code)

This was exploring exactly what is being transmitted 

--- 

A byte is literally 8 light switches in a row. Each switch is on or off:
0 0 0 0 0 0 0 0  = 0
0 0 0 0 0 0 0 1  = 1
0 0 0 0 0 0 1 0  = 2
0 0 0 0 0 0 1 1  = 3
...
1 1 1 1 1 1 1 1  = 255
That's all binary is — a number written with only two digits available, where each position is a power of two. Same logic as decimal (where each position is a power of ten), just simpler hardware.
Where 0–255 shows up everywhere:

Colour channels. RGB(255, 0, 0) = pure red. Each channel (red, green, blue) gets one byte, so 256 levels of intensity per channel. Three bytes per pixel = 24-bit colour = ~16.7 million possible colours. That's why colour pickers go up to 255 and not 100 or 1000 — it's the natural ceiling of one byte.
MIDI uses 7-bit values (0–127) because the 8th bit was reserved for status flags. That's why MIDI feels coarse — 128 levels of velocity isn't much.
8-bit greyscale images — same thing, one byte per pixel for brightness.

Why floats are different:
A float (32-bit floating point) uses 4 bytes (32 bits) and can represent decimal numbers across a huge range — roughly ±3.4 × 10^38, with about 7 digits of precision. The format reserves bits for the sign, exponent, and mantissa (don't worry about the mechanics, just trust me).
This is why your OSC messages send floats: 0.0 to 1.0 with smooth interpolation between requires fractional values, which a single byte can't represent. A byte going 0, 1, 2, 3 in steps of 1 is too chunky for material parameters. A float can do 0.4738291 and the next frame 0.4738294 — perfectly smooth.
So when something says "channel is 255":
It usually means an 8-bit channel at full intensity. In Unreal materials, colours are often normalised so that 1.0 in the float world = 255 in the 8-bit world. The display layer converts between them. That's why you'll sometimes see colour values written as (1.0, 0.0, 0.0) (float) and sometimes (255, 0, 0) (byte) — same red, different number system.
On the "x, y, z mapped to different things" pattern:
You're spotting a deep convention in computer graphics and signal processing: vectors are reusable structures. A 3D vector is just three floats grouped together. What those three floats mean depends on context.

In a mesh: x, y, z = position in 3D space
In a normal: x, y, z = direction the surface faces
In a colour: r, g, b = colour channels (often stored in the same data type as a vector)
In a texture coordinate: u, v = position on a 2D texture (sometimes also w for 3D textures)
In your MediaPipe data: x = horizontal frame position, y = vertical, z = depth from camera

---

### Grander Vision

Measuring the crowd: 

### Grander vision: measuring the crowd

A core part of anxiety in non-places is sensory: the visual noise of brands and products, the beeps of registers, trolleys clanging. Those are external. But anxiety also has an internal dimension — the lone struggle, the work of keeping up appearances — that's harder to externalise.
The ideal version of Hello Stranger makes both visible at once. Each person in the CAVE2 spawns a proximity sphere — a small bubble of "okay" projected onto the environment around them. Inside their bubble, the world is calmer. Outside it, in the periphery, the corruption builds. This mirrors the actual experience: when you're anxious, you tunnel-vision. Your immediate field shrinks to a manageable bubble while the edges of perception fill with movement and threat.
Each person's movement controls the size and integrity of their own bubble. More people in the space pushes up the global SocialLoad — anxiety grows faster — but each person can only manage their own bubble. The pressure is shared, the agency isn't. Visitors feel the room get worse without knowing why. They might assume it's about them.
At full overload, the bubble itself starts failing — the edges close in, until the periphery dancing is all there is. The light snuffs out. There is no calm space left, only the management of how fast it collapses.
It feels like you're suffocating.

### (equirectangular) ###
Projecting at this aspect ratio could be difficult. 16:1 doesn't capture a 320 panaromic like I had hoped.

16:9 might work better here even if its not 'correct' ratio

![alt text](image.png)


HighResShot 8000x500

Very valuable command from unreal!