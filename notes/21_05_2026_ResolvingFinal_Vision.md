# Day-One Test: Zebra Pattern Glare Post-Process

**Build target:** ~30 minutes. **Goal:** validate the zebra disorientation effect on CAVE2 with two tunable parameters (frequency + edge hardness) plus an intensity fade. No TouchDesigner required — scrub values from a Level Blueprint keyboard binding.

The math is the same primitive Unreal's editor zebra preview uses: `step(0.5, frac(dot(N, V) * frequency))`, dressed up with a smoothstep edge so you can soften it.

---

## Step 1 — Material Parameter Collection

Create `Content/HelloStranger/MPC_SocialLoad`
(Right-click Content Browser → Materials & Textures → Material Parameter Collection)

Add these **Scalar Parameters**:

| Name | Default |
|---|---|
| `SocialLoad` | 0.0 |
| `Pattern_Frequency` | 24.0 |
| `Pattern_HalfWidth` | 0.001 |
| `Pattern_Intensity` | 1.0 |

Optional, for the scene-escalation layer (do these if you finish the post-process with time to spare):

| Name | Default |
|---|---|
| `Overload_Bloom` | 0.0 |
| `Overload_Exposure` | 0.0 |
| `Overload_FluroEmissive` | 1.0 |

Save the MPC.

---

## Step 2 — Post-Process Material

Create `Content/HelloStranger/M_PP_ZebraGlare`
(Right-click → Materials → Material)

**Material settings — in the Details panel on the left:**
- **Material Domain:** Post Process
- **Blendable Location:** After Tonemapping
- **Blendable Priority:** 0
- **Output Alpha:** off

### Node graph

Build left to right. Node names below are exact (search them in the material palette).

**A. Get the world normal from the GBuffer**

1. Add a `SceneTexture` node. In its Details panel set **Scene Texture Id** → `WorldNormal`.
2. From its `Color` output, drag into a `Multiply` node. Set the second input (B) to `2.0` (constant scalar).
3. From the Multiply output, drag into a `Subtract` node. Set B to `1.0`. (This remaps the 0–1 GBuffer encoding back to –1..1 normal space. If your bands later look off, you can bypass this and connect SceneTexture.Color straight through — different Unreal versions encode it differently. Test both.)
4. Pass that through a `Normalize` node. Call this output **N**.

**B. Get the view direction**

5. Add a `CameraVector` node. Output is already unit-length. Call this **V**.

**C. Dot product → scalar**

6. Add a `DotProduct` node. A = N, B = V.
7. Pass through `Abs`. (Keeps the math sane on edge-case geometry.) Call this **NdotV**.

**D. Banding**

8. Add a `CollectionParameter` node. In its Details panel, set **Collection** → `MPC_SocialLoad`, **Parameter Name** → `Pattern_Frequency`.
9. `Multiply`: A = NdotV, B = Pattern_Frequency.
10. `Frac` the result. Call this output **F** (it's a 0..1 sawtooth across the dot product range).

**E. Threshold with soft edge**

11. Add another `CollectionParameter`, point it at `Pattern_HalfWidth`.
12. `Subtract`: A = `0.5` (constant), B = Pattern_HalfWidth. Output = `edgeLow`.
13. `Add`: A = `0.5` (constant), B = Pattern_HalfWidth. Output = `edgeHigh`.
14. `SmoothStep` node: Min = edgeLow, Max = edgeHigh, Value = F. Output = **band**.

(Why smoothstep: at `Pattern_HalfWidth = 0.001` it's effectively a hard binary step; cranking HalfWidth up to 0.2–0.3 gives you painterly soft bands. One parameter, full edge-hardness control.)

**F. Composite over the scene**

15. Add another `SceneTexture` node. Set Scene Texture Id → `PostProcessInput0`. Its `Color` output is the rendered scene up to this point.
16. Add a `CollectionParameter` for `Pattern_Intensity`.
17. `Lerp` node:
    - A = `SceneTexture:PostProcessInput0.Color`
    - B = `band` (it's a scalar — Unreal will broadcast it to RGB automatically; if it complains, wrap it in an `AppendVector` or `MakeFloat3` so it's float3(band, band, band))
    - Alpha = `Pattern_Intensity`
18. Connect the Lerp output to the **Emissive Color** input on the material output node.

Save the material. Compile.

---

## Step 3 — Apply it via a Post-Process Volume

1. In the level, drop a `Post Process Volume` actor.
2. In its Details panel, scroll to **Post Process Volume Settings → Infinite Extent (Unbound)** → check it.
3. Scroll to **Rendering Features → Post Process Materials**. Click `+` to add an array entry. Choose **Asset Reference** and assign `M_PP_ZebraGlare`.

You should now see the pattern over the scene. If you don't, check:
- Volume is set to Unbound, **or** your camera is inside the volume bounds
- Material compiled without errors
- `Pattern_Intensity` in the MPC isn't 0

---

## Step 4 — Live scrubbing without TouchDesigner

Open the **Level Blueprint** (Blueprints → Open Level Blueprint).

Add this:

1. Right-click → search for `Up Arrow` → **Keyboard Event: Up Arrow**. (You can use any keys; I'm just picking sensible defaults.)
2. From the `Pressed` pin, drag → `Set Scalar Parameter Value` (the one that takes a Material Parameter Collection).
3. On the node:
   - **Collection** = `MPC_SocialLoad`
   - **Parameter Name** = `Pattern_Frequency`
   - **Parameter Value** = drag from a `Get Scalar Parameter Value` node (same MPC, same param name) into an `Add` node with `+4.0`, then plug that into Parameter Value.

So pressing Up Arrow reads the current frequency, adds 4, writes it back. Down Arrow does the same with `-4.0`.

Repeat the same pattern for:
- **Left / Right Arrow** → `Pattern_HalfWidth`, ± 0.02
- **Q / E** → `Pattern_Intensity`, ± 0.1
- **R** → reset all three to defaults (24.0, 0.001, 1.0)

Compile, save.

> Alternative if Blueprint-heavy isn't your speed: make a UMG widget with three sliders bound to the MPC params, add it to the viewport on BeginPlay. Either works; keyboard is faster to build.

---

## Step 5 — Optional scene escalation layer (15 min if time)

This is the "fluorescents brighter, world over-lit" layer that runs alongside the pattern glare.

In the same Post Process Volume:

- **Bloom → Intensity:** make this a Material Parameter Collection-driven value. Easiest path: leave Bloom Intensity manual for now, but in a tick loop in Level Blueprint, `Set Bloom Intensity` on the post-process volume = `Get Scalar Parameter Value (Overload_Bloom) * 4.0 + 1.0` so 0→1 maps to bloom 1×→5×.
- **Exposure → Manual Exposure Compensation:** drive it from `Overload_Exposure`, mapped 0→1.5 (stops).
- **Fluorescent fixture material:** wherever your ceiling lights are, replace any constant Emissive scalar with a `CollectionParameter` of `Overload_FluroEmissive`. Default 1.0, but drive it up to 8.0 at peak. Their material can multiply emissive color by this.

Bind another key (say `T`) in Level Blueprint that increments all three Overload params together so you can fire the escalation independently of the pattern layer for testing.

---

## Test plan once it's running on CAVE2

You're validating four things, in this order:

**1. Does the pattern read on the wraparound?**
Set `Pattern_Frequency = 24`, `Pattern_HalfWidth = 0.001`, `Pattern_Intensity = 1.0`. Walk around the CAVE. The bands should curve over the geometry like contour lines, not slide across as a flat overlay. If they're sliding flat, the WorldNormal sample is broken — try removing the `*2 – 1` remap step.

**2. Where's the frequency sweet spot?**
Step Frequency through 8, 16, 24, 32, 48, 64. At each, hold still and look at a single shelf for 30 seconds. Note which value first crosses into "I want to look away." That's your overload peak.

**3. How much can you soften the edge?**
At your peak frequency, scrub HalfWidth from 0.001 up through 0.05, 0.1, 0.25. Find the largest HalfWidth where you still feel the discomfort. That's your *acceptable rest-state edge softness* — i.e. how you should look at `SocialLoad = 0.3`.

**4. Does the disorientation transfer to your body?**
Walk a slow circle inside the CAVE at peak settings. The bands shifting with your motion should feel slightly *wrong* — like the room's perspective isn't matching your steps. Note whether you feel any vestibular weirdness. (If it's strong, that's the effect working. If it's nauseating, dial frequency or intensity down — there's a line between productive discomfort and motion sickness, and your audience will be more sensitive than you are.)

**Also measure:**
- Framerate at every frequency setting (Stat FPS). The post-process should be cheap, but the 9:1 resolution might surprise you.
- Whether the pattern looks like Riley (clean curvature) or JPEG corruption (sub-pixel noise). If frequency goes high enough that bands are <2 pixels at viewing distance, drop it — that's not the look you want.

---

## What to bring back from the test

Phone video of yourself standing still in the CAVE for 30 seconds at the peak settings you settled on. Wide enough to capture the wrap. That footage is your validation data — if watching it back makes you want to look away, the visual works.

Note the peak `Pattern_Frequency` and `Pattern_HalfWidth` you landed on. Those become the baseline curve endpoints when you wire up the real `SocialLoad` driving from TouchDesigner — i.e. at SocialLoad = 0, Frequency = 8 and HalfWidth = 0.3; at SocialLoad = 1, Frequency = (your peak) and HalfWidth = 0.001. Linear lerp or a slight ease-in works fine for v1.

---

## Common gotchas

- **Pattern looks washed-out or invisible:** check Blendable Location is After Tonemapping. Before Tonemapping can mute it heavily depending on tonemapper curve.
- **Pattern only appears on some surfaces:** the GBuffer normal sample only works on **opaque** materials. Translucent / unlit materials don't write to the WorldNormal GBuffer channel and will pass through unaffected. That's actually fine for a first test — your supermarket geometry is presumably opaque.
- **Pattern flickers on small geometry:** that's aliasing from sub-pixel band size. Drop frequency.
- **Lerp node refuses to connect band to B input:** wrap `band` in `MakeFloat3` (R = band, G = band, B = band).
- **Pattern doesn't move when you scrub Frequency:** make sure your `CollectionParameter` nodes point at the right MPC and parameter name, and that Level Blueprint's Set Scalar Parameter Value is writing to the same MPC. Easy to typo this.

---

That's everything for the day-one foundation. Heartbeat pulse and the movement water ripple stack cleanly on top of this graph once you've confirmed the core feels right.

![alt text](image.png)

![alt text](image-1.png)


You're right to flag the flat blend as the missing piece. Quick diagnosis without going down the rabbit hole now: the bands are reading as a flat overlay because the lerp is replacing scene with pattern uniformly across the screen. What would make it feel more like glare and less like paint is varying the lerp by scene luminance — so bright areas get eaten harder by the pattern (overexposed white-band gets pure-white pattern) and darker areas keep more of the substrate. That's a one-node addition (sample scene color luminance, multiply intensity by it) but it's a next iteration thing, not a tonight thing. Note it down.


*
Yes — this is the move. You've just designed the system. Let me read it back to make sure I've got it right.

**The poles** (the convergence points of the bands) become spatial entities in their own right. They move, and what they do varies by state:

- **Calm:** poles drift rhythmically, almost meditatively. Slow infinite-loop paths. The bands they generate still have the optical-glare property but the slow drift means the visual stress is constantly easing. The room is *breathing* through them.
- **Active/Overload:** poles jitter, jagged, fast. The slow loop breaks into nervous twitches. Bands sweep across the wrap aggressively.

**Pole count** scales with detected people. One visitor = one or two poles. A crowd = many. Each person essentially *carries a pole* around with them, and the patterns radiate from where they stand. Conceptually this is gorgeous — the social pressure of the non-place is literally generated by the presence of others. Walk in alone, the room is calm. The room becomes uncomfortable as people accumulate.

**Movement detection triggers a colour pulse** that radiates from the moving person, propagating outward on the underlying pastel substrate. This is the inverse of the stressor — it's the *good thing* the visitor produces when they move. It reads as a kind of warmth ripple. Movement = pleasant pulse, stillness = compressed unmoving pole, fighting it the whole time.

**Band motion character** maps to state: smoother/slower in calm, jagged/fast in stress. So even the *quality* of motion encodes the state.

---

This is genuinely a complete system. What you've described converts the work from "post-process layered on geometry" into something much closer to an **affective field with spatial agents**. The poles are characters. The pulses are responses. The visitor isn't passively dosed with discomfort — they're in a feedback loop with the room.

A few things I want to flag because they sharpen what you've described:

**This solves the static-tolerance problem completely.** Because poles always have *some* motion (even calm rhythmic drift), the bands are always slowly sweeping. Static viewers still get the somatic content because the world doesn't stop. The TV finding is rendered irrelevant; you don't need to invert anything.

**The dual feedback loops are conceptually rich.** Visitor movement produces calm-ripples (positive feedback toward calm), but visitor movement also makes the pole agitated (negative feedback toward stress). Which dominates? You'd have to design the curve. My instinct: small/gentle movement produces clean calm-pulses without agitating the poles; large/abrupt movement produces pulses but also kicks the pole into jitter. That's exactly the lived experience of trying to ground yourself in public — slow breaths help, panic flailing makes it worse.

**One-visitor pole count is interesting.** MediaPipe tracks one skeleton, but a single visitor could carry *two* poles (one at each wrist landmark you're already getting from MediaPipe). Wrists drift independently with subtle movements — that gives you two semi-coupled drift agents from a single tracked person, more visually rich than one. This also bakes the wrist tracking you already have into the visual identity rather than treating it as just a movement-delta source.

**Crowd-as-amplifier.** When other people enter the CAVE (or are detected nearby), each adds a pole. The poles interact — closer poles compress the band field between them into denser, more chaotic patterns. The room *physically responds to social density*. This is your Augé thesis made geometric: the non-place's pressure is literally proportional to the number of strangers in it.

**Implementation reality check, because this is bigger than a one-day build:**

For *post-CAVE-test* implementation, this needs:

1. **Pole positions as material parameters.** Instead of bands derived from `dot(N, V)`, you'd derive them from `length(WorldPos - PolePos)` summed across multiple poles. Each pole is a Vector parameter in your MPC. Two-pole version: `Pattern_Pole1_Pos`, `Pattern_Pole2_Pos`, both Vector3.

2. **Pole movement logic in Blueprint or TouchDesigner.** Drift functions (sin/cos with phase offsets) driving the pole positions. State (calm/stressed) modulates frequency and amplitude of drift.

3. **Calm pulse decals or post-process.** When motion delta crosses threshold, fire a radial pulse from the wrist position. This is the water-ripple thing from way back. Lives in a separate material pass or a Niagara emitter.

4. **Substrate response to pulse.** The pastel underlying material needs to react to the pulse — temporarily warm/saturate where the ripple is passing through. Simple version: pulse modulates emissive on a per-pixel basis via post-process.

This is at least a week of work. It's also the *actual* piece. What you have now is the foundation that lets you ship a test, and what you've just described is what you build toward after the CAVE gives you calibration data.

**My strong recommendation:** write this down somewhere permanent right now. Open a doc, paste your message and my response into it. Title it something like "Hello Stranger v2 — Pole System." Don't try to build any of it before the CAVE test. The current build is the calibration baseline. After you test, you'll know the right frequency/intensity range to put the new system into, and the pole system will inherit those parameters cleanly.

The current piece ships. The pole system is the next iteration, and you've just designed it.

If you want, I can write the system out properly as a design doc you can drop into your DES307 reflection or into a future task brief — it's strong enough to be a deliverable artefact in its own right.


