# Hello Stranger
## Concept of Record

*Interactive CAVE2 installation on social anxiety in non-places*
*Matthew Bissell — DES307*

---

## Premise

A visitor stands inside a 320° wraparound display showing an abstract pastel supermarket — recognisable as a non-place but stripped to its bones. MediaPipe tracks the visitor's body through a webcam. As the visitor stands still, an internal pressure variable (`SocialLoad`) rises. As the rendered environment registers that pressure, the materials harden into high-contrast Riley-style banding, fluorescent fixtures over-illuminate, chromatic aberration creeps in at the edges, and the room becomes physically uncomfortable to stand in. At the centre of the visitor's view, the room offers a small drifting zone of partial reprieve — a softer area where the pattern breaks up through the weathering and the substrate beneath becomes visible. Movement expands this zone briefly; stillness shrinks it. The visitor cannot escape the pressure, only locate the room's drifting tolerance and try to remain inside it. There is no win state. Recovery is temporary. The piece is a portrait of management, not resolution.

---

## The Argument

*Hello Stranger* makes three claims:

**One.** Non-places (in Augé's sense — supermarkets, airports, motorways) carry implicit codes that demand stillness and compliance. They are spaces that require us to be present without belonging. The discomfort of being in them is real, somatic, and largely unspeakable. The piece renders that discomfort literal.

**Two.** Pattern glare — the cortical hyperexcitability triggered by certain high-contrast spatial frequencies (Wilkins et al., 1984; Monger et al., 2015) — is not aesthetic. It is a measurable physiological response. Using it as the dominant visual language means the work doesn't *depict* anxiety, it *produces* a small dose of it. The viewer is not a witness; they are the subject.

**Three.** Physical movement is the actual intervention. Zika and Becker (2021) demonstrate the clinical efficacy of physical activity in treating social anxiety. The piece literalises that finding: movement is the only mechanism that lowers `SocialLoad`. The visitor discovers, somatically and without instruction, that fidgeting, pacing, breathing, shifting weight — small bodily refusals of the non-place's stillness mandate — are how the discomfort eases.

The work is therefore not about anxiety in the abstract. It is about the specific lived experience of being in a non-place, with the body as the only available tool.

---

## The System

### State

A single scalar — `SocialLoad`, range 0.0 to 1.0 — represents the visitor's accumulated pressure. It is computed in TouchDesigner from MediaPipe's pose tracking output and broadcast to Unreal over OSC.

`SocialLoad` rises continuously while a visitor is detected and stationary. It falls in response to wrist motion delta. The integration is asymmetric: pressure accumulates faster than it dissipates. Held stillness over time produces overload. Continuous active movement holds it down. There is no equilibrium state where the visitor is comfortable doing nothing.

### Visual and auditory ontology

Six layers, each carrying a discrete meaning.

**Pastel substrate.** The supermarket itself: walls, gondolas, fluorescent fixtures, weathered surface textures packed into RGB channel masks (sunbleach, gutter grime, ground spatter). The substrate is the non-place as Augé describes it — bearing signs of human passage without containing any organic society. Real wear painted onto flat pastel forms that refuse to acknowledge it. The substrate is what *would* be visible if the visitor's pressure dropped to zero. It never quite does.

**Pattern bands.** Riley-derived high-contrast banding driven by the dot product of surface normals and view direction, thresholded into pure binary at peak `SocialLoad` and softened toward smoothstepped gradients at rest. The bands have the optical-glare property: they sit at spatial frequencies that produce involuntary cortical irritation in most viewers. They emerge from the surfaces of the supermarket rather than being painted on top, so they read as a property of the world's materials degrading.

**Poles.** Two or more discrete points in world space from which the band field radiates. Each pole has a position that drifts over time. The drift character changes with `SocialLoad`: at rest, poles trace slow rhythmic loops, almost meditative; at high `SocialLoad`, drift becomes jagged, twitchy, fast. Poles are scripted entities, not tied to live tracked bodies — they appear and disappear on slow timed cycles over the duration of a session, fading in and out, drifting past the visitor at irregular intervals. From the visitor's perspective, the room is being affected by presences they cannot see. This is conceptually deliberate: the non-place's strangers are *felt, not seen*. The crowd that produces the social pressure of a supermarket is rarely individually attended to; it is an ambient density. Scripted poles render that ambient density without requiring live multi-person tracking, and the writeup is honest about this. The poles are the work's *agents*: the patterns are generated *by* something specific, located in space, and behaving according to its own internal state — even if that something is a curve in a timeline rather than a real body.

**The calm zone.** A soft radius of partial reprieve, geometrically locked to the centre of the visitor's view (in v1) or biased loosely toward the visitor's approximated position (in v1.5). Inside the zone, `Pattern_Intensity` is reduced and the pastel weathered substrate becomes visible; the bands soften and break up through the weathering rather than holding their hard binary edges. The zone is not carried by the visitor — it is *offered by the room*, weakly, at its centre. The supermarket has one tolerable spot and the visitor's task is to find and hold it. The zone breathes: its radius oscillates on a slow infinity-drift, always slightly off-centre, never reliably the same shape twice. Its size is inversely tied to `SocialLoad` — large when the room is calm, contracting to a tight pocket under pressure. Movement modulates the radius — small bodily motions briefly inflate the zone before it relaxes back. The mechanic is mechanically subtractive: the zone removes pattern intensity within its radius rather than adding any content. The visitor sees the supermarket *as it would be* without the affliction, but only in the small wandering circle the room currently grants. Outside the zone, the bands and the clinical halftone press from the periphery; the visitor cannot escape the pressure, only locate the room's drifting tolerance and try to remain inside it.

A discrete acknowledgement of movement (a peripheral water-ripple overlay, a faint sonic chime, or a particle event) is reserved as a v1.5 or v2 addition. The current commitment is that the room *registers* movement through the breathing zone alone; whether it *responds* with a separately-marked event is a deferred design decision.

**Lighting escalation.** Independent of the post-process pattern layer, the supermarket's own bloom and chromatic aberration scale with `SocialLoad`. At peak, the fluorescent fixtures blow out highlights into pure white, chromatic fringe creeps in at the periphery, and the scene's exposure rises into supermarket-overlit territory. This is the non-place becoming *more itself* — its own clinical lighting amplified into a stressor. It is critical that this escalation is recognisably continuous with the rest state: this is not a special effect overlay, it is the supermarket's own properties intensifying.

**Soundscape.** A three-layer auditory system that follows the same affective logic as the visuals. The base layer is the ambient hum of a supermarket — fluorescents, refrigeration units, distant scanners, the white-noise wash of recycled air. Volume scales with `SocialLoad`. The second layer is a heavy clock-tick that runs at roughly 30 BPM at rest and accelerates toward 80–100 BPM at peak; its timbre also hardens as `SocialLoad` rises, from a clean wooden tick to a mechanical crunch to an industrial slam. The clock-tick is the non-place's own time pressure made audible — the queue, the checkout, the implicit demand that you keep moving through. The third layer is a low blood-rush whoosh that emerges only at high `SocialLoad`, the body's own internal sound externalised, the auditory counterpart to pattern glare. On detected movement, a soft tonal exhale briefly cuts through all three layers — the audio counterpart of the calm pulse, mechanically subtractive in character. The soundscape's structure is intentionally non-musical: nothing in it should reward sustained listening. Like the visuals, it is engineered to be unpleasant to remain in.

### The interaction loop

The loop is dual-feedback and intentionally unresolvable.

A visitor entering the space is registered. `SocialLoad` begins to rise from rest. Poles are present from the start, drifting slowly; the band field is faint and softly threshold-feathered. As `SocialLoad` rises, the pole drift becomes more agitated, the bands tighten and harden, the bloom climbs, the fluorescents push toward overexposure. The room becomes uncomfortable to stand in.

The visitor moves. Each motion delta does two things simultaneously:

- Drops `SocialLoad` proportionally to the motion magnitude. The macro state eases.
- Fires a calm pulse from the wrist position. The local visual stressor clears briefly, the substrate breathes through.

Both effects together reward movement immediately and visibly. The pulse provides *instant* visual feedback (the local clearing); the `SocialLoad` drop provides *cumulative* feedback (the overall ramp eases). The visitor learns the rule without being told.

But the visitor cannot move forever. The moment they stop, `SocialLoad` resumes climbing. Pulses decay. The bands return. The room never reaches a stable comfortable state. The piece is a sustained *negotiation*, not a level to be cleared.

---

## Pillars

**Augé (1995) — *Non-Places*.** The supermarket is the canonical non-place. The piece's environment is not an abstract space but a specific kind of space, with its own behavioural codes (stillness, queueing, compliance, no acknowledgement of strangers). The weathered pastel substrate carries Augé's central contradiction at surface level: signs of millions of human passages with no record of anyone having actually *been* there. The bands are what happens when that contradiction stops being legible and starts being painful.

**Ikeda — *test pattern*, *data.tron*, *superposition*.** Ikeda's practice demonstrates that intense, scientifically-precise visual material is permitted in installation contexts. *Hello Stranger* borrows none of Ikeda's specific visual vocabulary (no streak-glitch, no datamosh — those are the language of medium corruption, and our discomfort lives in the viewer's nervous system not in the signal). But Ikeda's permission — that the work can be *too much*, can be physiological — is foundational. The piece commits to producing visual stress, not depicting it.

**Penny — *Petit Mal*, *Traces*, *Fugitive*; *Making Sense* (2017).** Penny's position is that the body is both sensor and subject. *Hello Stranger* is not stylistically Pennyesque, but it inherits his central question: what does it mean for the body to be the input? The piece's answer is that the body's options for response — stillness or movement — are not neutral inputs but contested behaviours in the space being depicted. The supermarket *expects* stillness. The piece *punishes* it. The visitor's body is therefore not just an input device, it is a site of conflict between the room's demands and the work's mechanic.

**Wilkins, Monger, Allen — pattern glare research.** The work's central technical claim rests on this literature. The piece would not function on a viewer whose cortex did not respond involuntarily to high-contrast banding at certain spatial frequencies. Calibration of those frequencies is therefore not aesthetic choice but somatic engineering. Spatial frequency, contrast hardness, and edge feathering are the three parameters that determine whether the work *is* the pattern glare effect or merely *resembles* it.

---

## Iteration plan

The work exists in three versions, deliberately scoped against real deadlines.

### v1 — DES307 "this works" deliverable (due 29th)

The shippable working version. Validates the core mechanic and visual identity.

- One MediaPipe-tracked visitor producing a single `SocialLoad` scalar over OSC.
- Riley-derived screen-space post-process pattern, driven by `dot(WorldNormal, CameraVector)`.
- Bloom, exposure, and chromatic aberration escalation tied to `SocialLoad` via Material Parameter Collection.
- Basic soundscape — supermarket ambient hum scaling with `SocialLoad`. No clock-tick yet, no blood-rush.
- **Breathing calm zone.** A soft radius around screen-centre where `Pattern_Intensity` is reduced and the substrate is visible. Radius oscillates on a slow infinity drift, scaled inversely by `SocialLoad`. Movement events temporarily inflate the radius before it relaxes back. Implemented as a distance-from-centre-UV sample in the post-process material, modulating the existing `Pattern_Intensity` lerp. No external position tracking required. *This is the core interaction. It ships in v1.*
- No poles. The pattern's apparent radial origin is the camera (the visitor's POV).
- No discrete movement-acknowledgement event (peripheral ripple / sonic chime). Deferred.
- CAVE2 calibrated constants applied.

v1 demonstrates the core argument: pattern glare as somatic intervention, body as solution, stillness as accumulation, movement as partial reprieve. The breathing zone is the heart of the piece and is in scope for this deliverable.

### v1.5 — public showing (due 10th)

Two weeks beyond v1. Adds atmospheric density and sonic depth without taking on live multi-person tracking. The version shown to audiences.

- **Scripted multi-pole system.** Two to four poles on predetermined paths, slow drift loops with phase offsets, fading in and out over session duration. No live face detection. From the visitor's POV, the room is being affected by ambient presences. `Pattern_Pole1_Pos` through `Pattern_Pole4_Pos` (Vector3) added to MPC.
- **Pole drift character modulates with `SocialLoad`.** Slow rhythmic loops at rest, jagged jitter at peak. Blueprint timeline driving the pole position scalars.
- **Band field generation from poles.** The pattern shader is updated to derive bands from `length(WorldPos - PolePos)` summed across active poles, rather than from view-relative dot product. This is the structural shader change between v1 and v1.5.
- **Breathing zone upgrade.** Zone drift is biased loosely toward the approximated skeleton centroid from MediaPipe rather than locked to screen centre. Bias is heavily smoothed: ~80% drift, ~20% target. This averaging hides MediaPipe's skeleton-jump instability — the zone is never moving fast or precisely, so reassignment glitches are invisible. The room still *misregisters* the visitor; this is conceptually correct.
- **Full soundscape in MetaSounds.** Three layers — supermarket hum, clock-tick (BPM and timbre scale with `SocialLoad`), blood-rush whoosh (low-frequency presence at high `SocialLoad`). Soft tonal exhale on movement detection events.
- **Movement acknowledgement event.** A discrete peripheral water-ripple overlay at the bottom of the screen, or a soft sonic chime, or a small particle bloom — the room's quiet acknowledgement that the visitor's gesture has been received. Lives outside the central visual conversation, sits in peripheral vision. *Exact form deferred to design exploration.*

v1.5 is what the audience sees. It is the work *as exhibitable*, with the technical honesty that the social density is scripted rather than tracked.

### v2 — full system (post-10th, future task / honours / portfolio)

The piece as fully designed. Out of scope for current deadlines.

- Live face-driven pole spawning via MediaPipe face_detection over a second OSC stream (`/faceCount`, bounding box scale as proximity proxy).
- Multi-skeleton tracking (requires non-MediaPipe pose solution — YOLO/RTMP).
- Gaze tracking nudging band convergence toward the visitor's actual focal point.
- True spatial use of the CAVE2 wraparound geometry — poles positioned outside the visible viewport, band contours converging from peripheral vision.
- Substrate weathering responds to pulse history — areas where the visitor has produced repeated pulses become slightly more legible over time, while unmoved areas of the wrap stay buried under pattern. The room *remembers* where it has been calmed.

v2 is the system *as designed*. v1.5 is the system *as exhibitable*. v1 is the system *as proven*.

---

## Calibration constants

The following values are to be determined empirically through CAVE2 testing. Currently held as placeholders.

| Parameter | Range | Calibration question |
|---|---|---|
| `Pattern_Frequency` at peak | 8–64 cycles | At what spatial frequency does the pattern cross from decorative to physically uncomfortable, without crossing into sub-pixel noise? |
| `Pattern_HalfWidth` at peak | 0.001–0.3 | How hard does the band edge need to be to trigger glare? Where is the threshold between feathered (rest) and binary (overload)? |
| `Overload_Bloom` peak multiplier | 1×–8× | At what bloom level do the fluorescents blow out into stressor territory without dissolving the pattern into pure white? |
| `Overload_Exposure` peak EV | +0 to +1.5 | How much over-exposure compounds with bloom before the scene becomes illegible? |
| `SocialLoad` integration rate | 0.05–0.5 units/sec stillness | How quickly does the room overload a still visitor? Should reach mid-range within 10–15 seconds for the mechanic to be discoverable, peak within 30–60 seconds for the somatic content to land. |
| `SocialLoad` decay rate | 0.1–1.0 units/sec movement | How much movement is required to hold the line vs reduce pressure? Should require sustained motion, not single gestures. |
| Calm zone radius at rest | 0.2–0.5 (UV-space) | How much of the screen is granted to the visitor when `SocialLoad` is low? Too generous and there is no pressure; too small and the visitor never sees the substrate. |
| Calm zone radius at peak | 0.0–0.1 (UV-space) | How small does the zone shrink under maximum pressure? Zero entirely removes the reprieve, which may be conceptually correct but tonally too punishing. Worth testing both. |
| Calm zone drift speed | slow infinity loop, ~10–30 sec period | The zone should feel like it is *almost* yours but never quite — close enough to find, never close enough to lock onto. |
| Calm zone movement-inflation amount | 0.1–0.3 radius units | How much does a gesture briefly grow the zone? Should be perceptible without being a victory. |
| Calm zone movement-inflation decay | 0.5–1.5 seconds | How quickly does the inflation relax back? Short enough that holding still always loses ground, long enough that gestures feel acknowledged. |
| Calm zone edge falloff | smoothstep width | Sharp edge reads as "mask"; soft edge reads as "tolerance gradient." Soft is correct conceptually. |
| Pole drift speed at rest (v1.5) | 5–30 units/sec | Slow enough to feel meditative, fast enough to register as motion. |
| Pole drift jitter at peak (v1.5) | high-frequency noise amplitude | The jitter character is the visual signature of the room's distress. |
| Pole fade-in/out duration (v1.5) | 3–10 seconds | How gracefully do poles enter and leave the scene? Should not be sudden — the ambient presence should accrete. |
| Clock-tick BPM (v1.5) | 30 BPM at rest → 80–100 BPM at peak | Linear or exponential ramp? Worth testing whether the acceleration is steady (sense of inevitability) or back-loaded (sense of escalation). |
| Clock-tick timbre at peak (v1.5) | clean tick → mechanical crunch → industrial slam | Sound design layering. |
| Blood-rush whoosh threshold (v1.5) | 0.6–0.8 `SocialLoad` | Below what `SocialLoad` value is the whoosh inaudible? It should emerge as the visitor crosses into genuine discomfort, not be constantly present. |

CAVE2 testing produces the v1 row of this table. v2 values are extrapolated from v1 baselines.

---

## Open questions

**Multi-person tracking is deferred.** Live multi-person tracking is not in scope for v1.5. MediaPipe's pose detection tracks one skeleton at a time and the face_detection module would only give count + bounding boxes, not skeletal positions. Rather than half-implement live tracking, v1.5 commits to scripted poles. The decision is conceptually defensible: a non-place's strangers are felt as ambient density, not attended to individually. The writeup notes this as a deliberate scoping choice, with live face-driven spawning identified as a v2 concern.

**Stillness-builds vs movement-builds direction — resolved.** Stillness builds, movement releases. The inverse was considered and rejected because it would render the piece a depiction of the freeze response rather than a tool for navigating it. The current direction maps to Zika & Becker's frame (movement as anxiety treatment) and produces a learnable, discoverable rule. The early observation that static viewing felt insufficiently stressful on a monitor test does not change this decision — the moving-poles system in v1.5 ensures the pattern field always carries motion, so stillness has visual content without requiring the mechanic to be inverted.

**Pulse character — resolved as breathing zone.** The substrate-reveal mechanic is implemented as a slow-breathing radius of partial clemency rather than as discrete waves fired from the visitor's wrist. The zone is offered by the room (locked to screen centre in v1, biased to approximated visitor position in v1.5) rather than carried by the visitor. Movement modulates the zone's radius rather than firing separately marked events. A discrete *acknowledgement* of movement (peripheral water-ripple overlay, sonic chime, or particle bloom) is reserved for v1.5+ as a deferred design decision. The visual texture of the zone's edge (clean falloff vs cymatic ripples) is also open.

**Spatial use of the CAVE2 wraparound — deferred to v2.** v1 and v1.5 treat the CAVE as a single wide camera view. The pole system could in principle exploit the geometry (poles positioned outside the visible viewport, band contours converging from peripheral vision), but this is a v2 concern and is not in scope for the 10th showing.

**Substrate memory — v2 only.** Whether the substrate remembers where pulses have passed is an interesting question (areas the visitor has calmed becoming slightly more persistently legible over time) but it is a v2 enhancement, explicitly out of scope for v1.5.

---

## Coda

The piece's title is its argument. *Hello Stranger* — the impossible greeting of the non-place, the failed acknowledgement between bodies that pass each other in spaces designed to prevent acknowledgement. The visitor is greeted by a room that immediately begins to refuse them. They learn, slowly, that the only response is to keep moving. The piece does not resolve. It is a portrait of management, not resolution.

---

*Document version 1.2 — breathing zone established as the pulse mechanic. v1 / v1.5 / v2 scoping confirmed. Constants TBD pending CAVE2 calibration.*