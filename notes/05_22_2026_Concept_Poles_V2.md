### 22/05/2026

# Hello Stranger
## Concept of Record

*Interactive CAVE2 installation on social anxiety in non-places*
*Matthew Bissell — DES307*

---

## Premise

A visitor stands inside a 320° wraparound display showing an abstract pastel supermarket — recognisable as a non-place but stripped to its bones. MediaPipe tracks the visitor's body through a webcam. As the visitor stands still, an internal pressure variable (`SocialLoad`) rises. As the rendered environment registers that pressure, the materials harden into high-contrast Riley-style banding, fluorescent fixtures over-illuminate, chromatic aberration creeps in at the edges, and the room becomes physically uncomfortable to stand in. Movement — any movement — generates a wave that briefly clears the pattern and reveals the underlying world. The visitor learns that the room punishes stillness and rewards motion. There is no win state. Recovery is temporary. The piece is a portrait of management, not resolution.

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

### Visual ontology

Five visual layers, each carrying a discrete meaning.

**Pastel substrate.** The supermarket itself: walls, gondolas, fluorescent fixtures, weathered surface textures packed into RGB channel masks (sunbleach, gutter grime, ground spatter). The substrate is the non-place as Augé describes it — bearing signs of human passage without containing any organic society. Real wear painted onto flat pastel forms that refuse to acknowledge it. The substrate is what *would* be visible if the visitor's pressure dropped to zero. It never quite does.

**Pattern bands.** Riley-derived high-contrast banding driven by the dot product of surface normals and view direction, thresholded into pure binary at peak `SocialLoad` and softened toward smoothstepped gradients at rest. The bands have the optical-glare property: they sit at spatial frequencies that produce involuntary cortical irritation in most viewers. They emerge from the surfaces of the supermarket rather than being painted on top, so they read as a property of the world's materials degrading.

**Poles.** Two or more discrete points in world space from which the band field radiates. Each pole has a position that drifts over time. The drift character changes with `SocialLoad`: at rest, poles trace slow rhythmic loops, almost meditative; at high `SocialLoad`, drift becomes jagged, twitchy, fast. Pole count scales with the number of people detected in the space — one visitor typically generates two poles (mapped to wrist landmarks); additional visitors add additional poles, which compress the band field between them into denser, more chaotic patterns. The poles are the work's *agents*: the patterns are generated *by* something specific, located in space, and behaving according to its own internal state.

**Calm pulses.** When movement is detected above a threshold, a wave expands outward from the visitor's wrist position. Inside the wave's current radius, the band intensity is locally reduced toward zero and the bloom intensity is locally reduced toward zero. The substrate is *revealed* within the wave: the pastel weathered supermarket appears as it would without the pattern affliction. The pulse is mechanically subtractive — it does not add brightness or content; it removes the visual stressor within its radius. The wave's expanding edge carries a faint warm emissive band where it is actively passing through, the only additive element. Each pulse decays over roughly two seconds.

**Lighting escalation.** Independent of the post-process pattern layer, the supermarket's own bloom and chromatic aberration scale with `SocialLoad`. At peak, the fluorescent fixtures blow out highlights into pure white, chromatic fringe creeps in at the periphery, and the scene's exposure rises into supermarket-overlit territory. This is the non-place becoming *more itself* — its own clinical lighting amplified into a stressor. It is critical that this escalation is recognisably continuous with the rest state: this is not a special effect overlay, it is the supermarket's own properties intensifying.

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

The work exists in two versions, deliberately scoped.

### v1 — DES307 deliverable

The shippable version, fully realised within unit scope.

- One MediaPipe-tracked visitor producing a single `SocialLoad` scalar over OSC.
- Riley-derived screen-space post-process pattern, driven by `dot(WorldNormal, CameraVector)` rather than by world-space pole positions.
- Bloom, exposure, and chromatic aberration escalation tied to `SocialLoad` via Material Parameter Collection.
- Soundscape responds to the same scalar.
- No explicit poles. The pattern's apparent radial origin is the camera (the visitor's POV).
- No calm pulse. Movement reduces `SocialLoad` globally, with the visual response read through the band intensity dropping.

v1 demonstrates the core argument: pattern glare as somatic intervention, body as solution, stillness as accumulation. It validates the visual identity in the CAVE2 environment and produces calibration data for v2.

### v2 — full system

The piece described in this document. Built post-DES307, scope of future task or honours work.

- Pole-based pattern generation. `Pattern_Pole1_Pos`, `Pattern_Pole2_Pos` (Vector3) added to MPC. Band field derived from `length(WorldPos - PolePos)` summed across poles instead of view-relative dot product.
- Pole drift logic in Blueprint, modulated by `SocialLoad` (slow rhythmic loops at rest, jagged jitter at peak).
- Calm pulse system: radial wave decals or Niagara emitter spawned from wrist position on detected motion delta. Wave applies localised `-Pattern_Intensity` and `-Overload_Bloom` modulation, revealing substrate.
- Multi-person detection via additional OSC stream (`/faceCount` from MediaPipe face detection module). Each detected face spawns or activates an additional pole. Bounding box scale may be used as a proxy for proximity.
- Sound layer extended: each pole carries its own slow drift sound, pulses produce a calming sonic event, soundscape density scales with pole count.

v2 is the system *as designed*. v1 is the system *as shipped*.

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
| Pulse expansion velocity (v2) | 400–1200 units/sec | How fast does the calm wave propagate? Should feel responsive (under 100ms to traverse 50 units near the body) but not snap (full extent should take 1–2 seconds). |
| Pulse decay duration (v2) | 1.5–3.0 seconds | How long does each calm wave persist? Long enough to read, short enough that holding still doesn't bank infinite pulses. |
| Pole drift speed at rest (v2) | 5–30 units/sec | Slow enough to feel meditative, fast enough to register as motion. |
| Pole drift jitter at peak (v2) | high-frequency noise amplitude | The jitter character is the visual signature of the room's distress. |

CAVE2 testing produces the v1 row of this table. v2 values are extrapolated from v1 baselines.

---

## Open questions

**Multi-person tracking proxy.** MediaPipe's pose detection tracks one skeleton at a time. v2 multi-person support requires either MediaPipe's face_detection module (giving face count and bounding boxes but not skeletal positions) or a switch to YOLO/RTMP-style multi-person pose. For the immediate v2 build, face count + bounding box proxies are sufficient — additional poles can spawn at predetermined scene positions when face count exceeds 1, with the writeup noting this as an approximation. True multi-person positional tracking is a v3 concern.

**Stillness-builds vs movement-builds direction.** The mechanic is committed: stillness builds, movement releases. This direction maps to the Zika & Becker frame (movement as anxiety treatment) and produces a learnable, discoverable rule. The inverse — movement builds, stillness releases — was considered and rejected because it would render the piece a depiction of the freeze response rather than a tool for navigating it. The current direction makes an argument; the inverse would only describe a symptom.

**Soundscape integration.** The soundscape needs to follow the same affective logic as the visuals. The current direction is: ambient supermarket hum at rest, with murmurs/clangs/beeps emerging as `SocialLoad` rises. v2 should add pulse-sync sonic events (a single soft tone on each calm pulse — the same subtractive logic, briefly clearing the soundscape) and pole-sound assignment in multi-person scenarios. Sound design specification is its own document.

**Spatial use of the CAVE2 wraparound.** v1 treats the CAVE as a single wide camera view. v2 should consider whether the pole system can exploit the geometry — e.g., poles positioned outside the visible viewport such that band contours converge toward the visitor from behind/beside, leveraging peripheral vision that a flat monitor cannot reach. This is a CAVE-specific affordance worth not wasting.

---

## Coda

The piece's title is its argument. *Hello Stranger* — the impossible greeting of the non-place, the failed acknowledgement between bodies that pass each other in spaces designed to prevent acknowledgement. The visitor is greeted by a room that immediately begins to refuse them. They learn, slowly, that the only response is to keep moving. The piece does not resolve. It is a portrait of management, not resolution.

---

*Document version 1.0 — written before CAVE2 calibration. Constants TBD. To be updated post-test.*
