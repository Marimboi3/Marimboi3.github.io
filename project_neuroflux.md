# Neuro-FLux Project — Master Knowledge Base

**Source:** Master's Thesis (CMU, 2026) — "A Fully Flexible Wearable Continuous-wave Near-infrared Spectroscopy for Continuous Cerebral Hemodynamic Monitoring"  
**Advisor:** Dr. Jana Kainerstorfer  
**Lab:** Biomedical Optics Lab, CMU  
**Duration:** 2 years (Master's research)  
**Role:** Lead hardware & firmware engineer (sole developer on device)

---

## Problem Statement
Continuous cerebral hemodynamic monitoring is critical for early detection of neurological conditions (hypoxia, sleep apnea, neurocritical care). Existing modalities fail for continuous real-world use:
- **EEG**: Extensive setup, physical connections, restricted mobility
- **fMRI**: Immobile scanner, requires perfect stillness, no ambulatory use
- **FD/TD-NIRS**: Complex instrumentation (modulated/pulsed lasers, fiber optics), bulky, not wearable
- **Prior CW-NIRS wearables**: Rigid/partially flexible, reduced photon sensitivity, poor motion robustness, hair interference

**Gap:** No wearable CW-NIRS simultaneously achieves mechanical conformity to head curvature, stable optical coupling during motion, and high photon detection sensitivity.

---

## Solution: Neuro-FLux
A fully flexible, wearable CW-NIRS system integrating:
- **Flexible PCB** (~0.3 mm thick polyimide) conforming to head curvature
- **Large-area photodiode (LA-PD)** for enhanced photon collection
- **Embedded acquisition electronics** (AFE + MCU + BLE) on same flex PCB
- **Silicone skin interface** adapting to hair/skin contours
- **TPU 3D-printed enclosure** with designed flex points

---

## Hardware Architecture

### Flexible PCB
- **Dimensions**: 56.6 × 24.4 mm, ~0.3 mm total thickness
- **Layers**: 4 copper layers, patterned (not solid fills) for flexibility
- **Substrate**: Polyimide (mechanical durability under repeated bending)
- **Noise isolation**: Analog/digital ground planes separated across layers
- **Power domains**: Separate 3.7V LiPo → regulated 2.5V VCC (digital) + 1.8V (AFE), isolated LED/PD domains

### Optical Subsystem
- **LEDs**: Dual-wavelength SMT735D/850D (735 nm / 850 nm) in single package
- **Source-Detector distances**: 10 mm (superficial), 27/32/37 mm (cortical)
- **Photodiode**: PDB-C110 (Advanced Photonix), ~300 pF junction capacitance
- **AFE**: MAX86171 (Analog Devices) — adjustable PD biasing for LA-PD stability, 8-channel LED sequencing, ambient light cancellation, SPI interface

### MCU & Wireless
- **MCU**: STM32WB5MMG (STMicroelectronics) — integrated BLE 5.0
- **Firmware**: Custom driver for AFE register config, SPI comms, interrupt-driven acquisition, BLE data streaming
- **Power**: 150 mAh LiPo, ~1.5 hr at 100 Hz

### Mechanical Interface
- **Enclosure**: TPU 3D-printed with living hinges/flex points
- **Headband**: 25 mm elastic slots with tightening mechanism (fits all head sizes)
- **Skin interface**: Molded silicone pad (cast from 3D-printed negative mold) — compliant, reduces air gaps, stabilizes SD coupling during motion

---

## Acquisition System

### Frame-Based Sampling (100 Hz)
- **Frame period**: 10 ms
- **Active acquisition**: ~5.7 ms per frame
- **Channels**: 8 LED channels (2 wavelengths × 4 SD distances)
- **Per channel**: 8 samples averaged, 29.2 µs integration time
- **Sequence**: Alternating wavelengths, shortest→longest SD distance (minimizes HbO/HbR temporal mismatch)
- **Ambient cancellation**: Coarse analog + fine digital (pre/post LED exposure samples)
- **Low-power state**: AFE sleeps between frames

### Optimized Parameters (validated)
| Parameter | Value | Selection Rationale |
|-----------|-------|---------------------|
| PD settling time | 6.1 µs | No SNR impact vs longer; best timing stability |
| Sample averaging | 8 samples | Balance SNR vs frame timing; 16 samples caused dropped frames |
| Integration time | 29.2 µs | Good SNR; >58.6 µs increased timing jitter |
| Sampling rate | 100 Hz | 50 Hz vs 100 Hz: no SNR difference; similar power |

---

## Signal Processing Pipeline

```
Raw intensity (I) → Ambient-corrected I → ΔOD = ln(I/I₀) → Δμₐ via MBLL → Linear solve for Δ[HbO], Δ[Hb]
```

- **MBLL**: ΔOD = Δμₐ × d × DPF (DPF from literature, age/wavelength dependent)
- **Extinction coefficients**: 735/850 nm from literature (Prahl)
- **Analysis channel**: Longest SD (37 mm) → highest cerebral sensitivity, strong pulsatile component
- **SNR computation**: FFT power spectrum, HR band 0.8–2 Hz, signal = 5 pts around HR peak, noise = 5 pts at 1.5× HR freq
- **Time-frequency**: STFT spectrograms (30s windows, 75% overlap), ridge detection for HR tracking

---

## Experimental Validation

### Session 1: Neuro-FLux vs ISS Imagent (FD-NIRS)
- **Placement**: Bilateral forehead, SD pairs oriented away (minimize crosstalk)
- **Protocol**: 2-min rest → 3× paced breathing (0.3 Hz, 1 min) → 3× hyperventilation (0.5 Hz, 1 min)
- **Result**: Qualitative agreement in hemodynamic trends (mirrored HbO/HbR responses)

### Session 2: Neuro-FLux vs Artinis MRK II (CW-NIRS, commercial)
- **Same protocol, separate day, same subject**
- **SNR @ HR (resting baseline)**:
  - **Neuro-FLux (37 mm): 36.14 dB**
  - **Artinis MRK II (38 mm): 34.49 dB**
- **Conclusion**: Wearable flexible device achieves **comparable and slightly higher** signal quality than commercial CW-NIRS

### Time-Frequency Analysis
- Spectrogram shows HR frequency modulation during hyperventilation (0.5 Hz paced breathing) → return to baseline during rest
- Confirms real-time cardiovascular dynamics tracking

---

## Key Results Summary

| Metric | Neuro-FLux | Commercial CW-NIRS (Artinis) | FD-NIRS (ISS) |
|--------|------------|------------------------------|---------------|
| SNR @ HR | **36.14 dB** | 34.49 dB | N/A (qualitative only) |
| Form factor | Fully flexible, 56×24 mm | Rigid probes | Fiber-coupled, bulky |
| Optical coupling | Silicone interface + headband | Rigid holders | Fiber bundles |
| Motion robustness | Designed for ambulatory | Limited | Poor |
| Wireless | BLE (designed, not yet tested) | Wired | Wired |

---

## Limitations (Honest Assessment)

1. **Single participant** — no population variability data
2. **Separate-day comparisons** — physiological variability between sessions
3. **Hardware reliability** — intermittent LED failures from flex interconnect stress (tight tolerances)
4. **Wireless not validated** — data collected via wired UART due to time constraints
5. **Hair-covered regions untested** — LA-PD benefit on hair not verified

---

## Future Work (Prioritized)

| Priority | Work Item |
|----------|-----------|
| P0 | Implement BLE wireless data streaming (firmware complete, needs integration test) |
| P1 | Power optimization: adaptive sampling, AFE low-power features, target >8 hr battery |
| P1 | Multi-modal: integrate accelerometer (motion artifact rejection) + EEG electrodes |
| P2 | Flex PCB redesign: wider interconnects, strain relief, improved fabrication yield |
| P2 | Expanded validation: n≥10 subjects, diverse hair/skin types, ambulatory protocols |
| P3 | Closed-loop: real-time HR/SpO₂ feedback, adaptive acquisition parameters |

---

## Technologies & Skills Demonstrated

| Domain | Specifics |
|--------|-----------|
| **Hardware** | 4-layer flex PCB design (Altium), impedance control, analog/digital isolation, component selection |
| **Embedded** | STM32 (C, HAL), SPI/I2C, BLE stack, interrupt-driven RTOS-less firmware, power management |
| **Signal Processing** | MATLAB: MBLL, FFT SNR, STFT spectrograms, ridge detection, statistical validation |
| **Optical** | CW-NIRS physics, dual-wavelength LED integration, LA-PD biasing, ambient cancellation |
| **Mechanical** | TPU 3D printing, silicone molding, compliant interface design, headband ergonomics |
| **Experimental** | Study design, IRB, human subjects, commercial device benchmarking, statistical analysis |

---

## Portfolio Presentation (Current)
- **File**: `D:/Gitgit/Portfolio_FirstWebsite/neuro-flux.html`
- **Figures embedded**: Schematic (Fig1), Acquisition sequence (Fig3), ISS comparison (Fig6), HR spectrogram (Fig8)
- **Sections**: Overview, Technical Details, Validation Results, Discussion/Limitations, Tech Stack, Navigation to OCTAVE

---

## Resume Bullet Points
- Designed and fabricated fully flexible 4-layer PCB for wearable CW-NIRS (56×24 mm, 0.3 mm thick)
- Developed embedded firmware (STM32WB5MMG) with BLE, SPI AFE control, 100 Hz frame-based acquisition
- Implemented signal processing pipeline (MBLL, FFT SNR, STFT) in MATLAB; validated against commercial FD-NIRS and CW-NIRS
- Achieved 36.14 dB SNR at HR band — exceeding commercial CW-NIRS (34.49 dB) in controlled validation
- Designed mechanical enclosure (TPU) and silicone skin interface for stable optical coupling during motion
- Authored Master's thesis; presented at lab meetings and departmental symposium