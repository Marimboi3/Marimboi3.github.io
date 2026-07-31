# OCTAVE Project — Master Knowledge Base

**Source:** NIH DEBUT Challenge Submission (2nd Place Winner) + UC Riverside Senior Design (BIEN 175C)  
**Team:** Christopher Clark, Minh-Huy Tran, Alexis Valencia, Briana Marquez, Sofia Gandarilla  
**Advisors:** Dr. H. Park (UCR Bioengineering), Dr. W. Dong (VA Loma Linda Healthcare)  
**Duration:** Senior year (2 semesters)  
**Role:** Lead optomechanical designer — designed/manufactured all optomechanical mounts, compound stage system, front assembly

---

## Problem Statement
**Conductive hearing loss (CHL)** affects ~70 million people globally. Current diagnostics are inadequate:
- **Otoscopy**: Cannot visualize past tympanic membrane (TM)
- **CT/MRI**: Spatial resolution ~0.5–0.625 mm — cannot resolve middle-ear structures (ossicles ~mm scale); ionizing radiation (CT); no live imaging
- **Exploratory surgery**: Invasive, last resort
- **Audiometry**: Subjective patient response; no structural localization of conduction pathway damage

**Gap:** No clinical tool combines **high-resolution structural imaging** (to see middle-ear anatomy) with **quantitative functional vibrometry** (to measure ossicular vibration in response to sound) in a practical, handheld form factor.

---

## Solution: OCTAVE
**Optical Coherence Tomography and Vibrometry Endoscope** — a handheld probe for the external auditory meatus (EAM) that simultaneously:
1. **OCT Imaging**: 1310 nm swept-source OCT, 11 µm axial resolution, 2 mm imaging window — resolves middle-ear structures (TM, malleus, incus, stapes)
2. **Doppler Vibrometry**: Measures ossicular vibration amplitude/frequency in response to sound stimuli via Doppler shift
3. **Integrated fiberscope**: Direct EAM visualization for positioning
4. **Clinical form factor**: ~0.6 kg, 308×98×72 mm, articulating arm mountable

---

## My Contributions (Lead Optomechanical Design)

### 1. Miniaturized Optomechanical Mounts (All Optical Components)
- **Design**: 3-part system — clamp + base + 3× silicone insulators (angular adjustment)
- **Manufacturing**: SLA 3D printing (50 µm resolution) — 1-to-1 CAD representation
- **Adjustment range**: ~1.7°/turn per screw, 5° total per component (x/y rotation)
- **Tolerance absorption**: Designed for <1° print warping, ±50 µm positional variation
- **Components mounted**: Collimator, beam splitter, 2× gold mirrors, MEMS mirror, 2× achromatic doublets, 2× GRIN lenses
- **Cost/weight advantage**: Resin vs aluminum/steel (Thorlabs/Newport) — fraction of cost/weight, impact-resistant

### 2. Compound Two-Tier Linear Stage System
- **Main stage**: Rack-and-gear actuation, dovetail slides, 2–6 cm probe depth range, manual brake
- **Reference arm stage**: Fine-adjustment screw (80 µm/rotation), precise imaging window control
- **Parallel optical layout**: Reference/sample arms side-by-side — minimizes footprint, enables independent adjustment
- **Manufacturing**: CNC-millable or laser-cut acrylic (2 mm & 4 mm panels)

### 3. Front Assembly (Patient Interface)
- **Otoscope head**: Welch Allyn disposable speculum compatible — protects patient (GRIN lens can't contact EAM) and protects GRIN lens
- **Fiberscope integration**: Co-axial with GRIN lens for direct EAM visualization during insertion
- **Speaker/Microphone Unit (SMU)**: Simultaneously induces TM vibration (speaker) and measures sound pressure (microphone) for vibrometry
- **Visible alignment laser**: Superimposed on 1310 nm IR beam for scan positioning (IR invisible to user)

### 4. Case Integration & Validation
- Built case around aligned optical stages (left wall: adjustment knobs + stage locks)
- Performed ImageJ warping analysis on SLA prints → optimized print orientation/resolution/material
- Optical alignment verification: power meter measurements (49.9% throughput after alignment)
- Human ear validation: TM visualization, photo/video capture, MEMS scanning verified

---

## Optical System Architecture

### Michelson Interferometer Configuration
```
SLD (1310 nm) → Collimator → Beam Splitter
                    ↓                    ↓
             Reference Arm          Sample Arm
             (Gold mirror)          (MEMS mirror → 2× achromats → GRIN lens)
                    ↓                    ↓
                    └───── Converge at Collimator/Detector ────┘
```

### Key Specifications
| Parameter | Value |
|-----------|-------|
| Laser source | 1310 nm SLD (broadband) |
| Axial resolution | 11 µm |
| Imaging window | 2 mm (depth) |
| GRIN lens | 10 cm length, 2.3 mm diameter |
| MEMS mirror | 2-axis scanning (lateral/vertical) |
| Optical throughput | 49.9% (after fine alignment) |
| Probe weight | ~0.6 kg |
| Probe dimensions | 308 mm L × 98 mm W × 72 mm H (extended: 270 mm) |

---

## Mechanical Architecture

### Compound Stage System
- **Main stage**: Rack & gear, dovetail, 2–6 cm depth, manual brake
- **Reference stage**: Fine screw, 80 µm/turn, precise imaging window
- **Material**: Acrylic panels (2 mm & 4 mm) — CNC or laser cut
- **Bearings**: 2× 5mm, 1× ¼ ID, 2mm axle

### Optomechanical Mounts (Novel)
- **Per optic**: Clamp + base with pegs + 3× silicone insulators (right-angle)
- **Adjustment**: x/y rotation via insulators, ~5° max
- **SLA printing**: 50 µm resolution, <1° warping achieved
- **Cost**: ~10× cheaper than Thorlabs/Newport aluminum mounts

### Front Assembly
- Otoscope head (Welch Allyn specula) — patient safety + GRIN protection
- Fiberscope co-axial — direct visualization
- SMU (speaker + mic) — vibrometry stimulus + pressure verification
- Visible laser — IR beam positioning

### Case & Mounting
- Acrylic outer shell (2 mm/4 mm panels)
- Articulating arm mount (clinical positioning)
- Left wall: linear knobs + stage locks

---

## Software Suite (Custom Windows GUI)

### Dual-Display Architecture
- **Primary**: 1920×1080 monitor (full OCT + fiberscope + controls)
- **Secondary**: 400×800 touchscreen LCD (bedside control)

### Windows & Workflows
1. **Patient Info Window**: Name, DOB, gender → auto-creates per-patient data folder
2. **Imaging Window**: Real-time OCT B-scan + live fiberscope feed; photo capture; video recording
3. **Vibrometry Window**: Real-time Doppler vibrometry; "Conduct Study" automated sequence
4. **Navigation**: Seamless switching between windows; logo-button exit on LCD

### Validated Workflows
- Human ear TM visualization with visible laser on umbo
- Photo → saved to patient folder
- Video recording → saved to patient folder
- Window navigation on touchscreen
- MEMS scanning verification (video documented)
- Optical alignment via power meter (video documented)
- Main stage linear motion (video documented)

---

## Validation Results

### Optical Performance
- **Throughput**: 49.9% of input 1310 nm SLD intensity after alignment
- **OCT imaging**: Fingertip composite B-scan resolves 3 skin layers (epidermis, dermis with sweat duct, hypodermis) — confirms full system integration
- **Human ear**: TM visualization successful; visible laser focused on umbo

### Mechanical Precision
- **SLA warping**: <1° from perpendicular (ImageJ analysis optimized print settings)
- **Optomechanical adjustment**: ±50 µm positional, <1° angular — within design targets
- **Stage linearity**: Verified equivalent IR intensity at RA stage limits

---

## Regulatory Pathway

| Aspect | Detail |
|--------|--------|
| **FDA Class** | Class II (diagnostic imaging) |
| **Predicate** | OCT middle-ear device (2020, regulation 892.1560, Product Code QJG) |
| **Pathway** | 510(k) substantial equivalence |
| **GMP** | Subject to Quality System Regulations (predicate not exempt) |
| **Risk** | Low — possible TM puncture if misused |

---

## Market Analysis (from DEBUT Submission)

| Metric | Value |
|--------|-------|
| **TAM/SAM** | 8,161 US hospitals/clinics/ASCs with ENT services |
| **SOM** | 2,321 VA medical centers/clinics/ASCs (elderly focus) |
| **Probe BOM** | ~$3,700 (optics + structure + hardware) |
| **Full kit cost** | ~$140,700 (incl. base unit, DAQ, fiberscope) |
| **Sale price** | $230,000/kit |
| **Net profit/kit** | $61,720 (26.8% margin) |
| **5-yr projection** | 93 VA centers by Year 5 |
| **Maintenance (5 yr)** | ~$12,580 |
| **Marketing/sale** | ~$15,000 |

---

## Intellectual Property & Novelty

### Patent Landscape
- **Closest prior art**: US 2017/0251924 A1 (Doppler OCT middle ear endoscope)
- **Competing approaches**: 
  - Achromatic lens instead of GRIN (multi-element, larger)
  - Split fiber-coupled units (fiber noise, clinical adjustment issues)
- **OCTAVE advantages**: GRIN = single-element chromatic correction + compact; all-optics-in-one = no fiber noise

### Novel Claims
1. **Miniaturized SLA optomechanical system** — low-cost, lightweight, impact-resistant
2. **Integrated compound stage** — independent main/reference adjustment in parallel layout
3. **Custom alignment plates & component test benches** — QA methodology for production
4. **Unified software GUI** — simultaneous OCT + fiberscope + vibrometry on touchscreen
5. **Design patent eligible** — custom visual language (logos, icons, layout)

---

## Technologies & Skills Demonstrated

| Domain | Specifics |
|--------|-----------|
| **Optomechanical Design** | Fusion 360 (assembly, tolerancing), SLA 3D printing (50 µm), optomechanical mount design, compound linear stage (dovetail, rack & gear), ImageJ warping analysis |
| **Optical Engineering** | Michelson interferometer alignment, GRIN lens + MEMS mirror integration, power meter characterization (49.9% throughput), beam path optimization |
| **Software & Systems** | Windows GUI (real-time imaging), multi-display sync, patient data management, video/photo capture pipeline |
| **Regulatory/Business** | FDA Class II/510(k) strategy, reimbursement analysis (Medicare), market sizing (TAM/SAM/SOM), BOM costing, manufacturing cost estimation |
| **Project Leadership** | 5-person team coordination, optical/mechanical integration, design reviews, competition submission (NIH DEBUT 2nd Place) |

---

## Portfolio Presentation (Current)
- **File**: `D:/Gitgit/Portfolio_FirstWebsite/OCTAVE.html`
- **Figures embedded**: CAD assembly (Fig1), Optomechanics/your design (Fig3), Handheld probe (Fig13), OCT fingertip (Fig16)
- **Sections**: Overview, Technical Details, Software Suite, Regulatory/Market, IP/Novelty, Tech Stack, Navigation to Neuro-FLux

---

## Resume Bullet Points
- Led optomechanical design for NIH DEBUT Challenge 2nd Place winning OCT/vibrometry endoscope (5-person team)
- Designed and SLA-manufactured miniaturized optomechanical mounts for all 8 optical components (clamps, bases, silicone insulators) — 10× cost reduction vs commercial mounts
- Engineered compound two-tier linear stage system (rack-and-gear main stage + fine-adjustment reference stage) enabling independent probe-depth and imaging-window control
- Designed front assembly: Welch Allyn-compatible otoscope head, co-axial fiberscope, speaker/microphone vibrometry unit, visible alignment laser
- Performed ImageJ warping analysis to optimize SLA print parameters; achieved <1° warping, ±50 µm positional tolerance
- Validated optical alignment (49.9% throughput via power meter) and human-ear TM visualization with integrated software GUI
- Contributed to regulatory strategy (FDA Class II, 510(k) predicate), market analysis ($230k sale price, 26.8% margin), and IP landscape assessment