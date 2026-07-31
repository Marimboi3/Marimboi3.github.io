# 3D Print Calculator Project — Master Knowledge Base

**Source:** Personal C++ project (VS2019) — started during COVID for unofficial 3D print business  
**Location:** `D:/Documents/Visual Studio 2019/3D Print Calculator/`  
**Status:** v2.0 complete (2026-06-15) — bugs fixed, persistent config, CSV logging, input validation  
**Purpose**: Calculate minimum & recommended prices for 3D printed products; designed for non-technical use by sister (Ximena/Mena) for her business

---

## Problem Statement
Selling 3D printed products requires knowing the **floor price** (minimum to cover costs) and a **fair market price**. Existing slicers give time/filament but not cost breakdown. Commercial quoting tools are overkill for small-scale makers.

**Need**: Simple CLI tool that takes print time + filament → outputs MINIMUM and RECOMMENDED prices, logs history to CSV, remembers settings between runs.

---

## Solution: 3D Print Pricing Calculator v2.0
A cross-platform C++ console application that:
1. **Takes input**: Project name, number of parts, per-part print time + filament
2. **Calculates**: Electricity cost (scaled to your electric bill) + filament cost (scaled to roll price)
3. **Outputs**: MINIMUM price (best-case costs), RECOMMENDED price (typical costs), 2×/3× retail suggestions
4. **Logs**: Every job to CSV with timestamp for business records
5. **Remembers**: All settings in config file — edit once, use forever

---

## Core Algorithm

### Cost Model
```
Electricity cost = (Total print hours × Monthly electric bill) / Hours per month
Filament cost    = (Total filament meters × Roll price) / Roll length (meters)
```

**Two tiers for each**:
- **Low/Minimum**: Uses `lowBill` + `rollLowCost` → absolute floor price
- **Estimated/Typical**: Uses `avgBill` + `rollCost` → realistic quote baseline

**Retail suggestions**: 2× and 3× recommended price (common wholesale→retail markups)

---

## Configuration (Persistent, User-Editable)

**File**: `print_calc_config.txt` (auto-created on first run)

| Setting | Default | Your Sister's Likely Values |
|---------|---------|----------------------------|
| `avgBill` | 250 | Her actual monthly electric bill (e.g., 180) |
| `lowBill` | 130 | Summer low (e.g., 120) |
| `hoursMonth` | 744 | 730 (avg month hours) |
| `rollLength` | 330 | 330m (standard 1kg PLA spool ≈ 330m) |
| `rollCost` | 30 | Her bulk PLA cost (e.g., 25) |
| `rollLowCost` | 20 | Sale price (e.g., 18) |
| `useClockNotation` | 1 | **0** (critical for slicer decimal output) |

**Edit interactively**: `./PrintCalc --config` (prompts with current values)

---

## Time Input Modes — Critical for Non-Technical Users

| Mode | Config | Input Format | Slicer Output Example |
|------|--------|--------------|----------------------|
| **Clock hh.mm** | `useClockNotation=1` | `1.30` = 1h 30m | Manual entry: "1h 30m" → type `1.30` |
| **Decimal hours** | `useClockNotation=0` | `1.75` = 1h 45m | **Cura/PrusaSlicer: `1.75`** — use this mode! |

**Auto-detect safety net** (v2.0):
- In clock mode: minutes > 59 (e.g., `1.75`) → warns and treats as decimal
- Single decimal digit (e.g., `1.5`) → warns "ambiguous, treating as 1h 50m"

> **For sister**: Set `useClockNotation=0`. She copies slicer times directly (1.75, 2.5, 3.25...) — no conversion needed.

---

## Usage

### Linux / WSL
```bash
cd "D:/Documents/Visual Studio 2019/3D Print Calculator"
g++ -std=c++17 Source.cpp -o PrintCalc
./PrintCalc              # Run calculator
./PrintCalc --config     # Edit settings
./PrintCalc --help       # Show help
```

### Windows (Visual Studio 2019)
1. Open `3D Print Calculator.sln`
2. Build → Debug (F7)
3. Run: `Debug\3D Print Calculator.exe` (or `--config`, `--help`)

**Note**: The box-drawing characters (═════) may show warnings in VS2019 (code page 1252). They display correctly in modern terminals (Windows Terminal, WSL, Linux).

---

## Example Session (Sister's Workflow)

```
$ ./PrintCalc
╔══════════════════════════════════════════════════════════════╗
║           3D Print Pricing Calculator v2.0                   ║
║   Calculate minimum & recommended prices for your prints     ║
╚══════════════════════════════════════════════════════════════╝

Current settings:
  Electricity:  avg=$180/mo  low=$120/mo  (730 hrs/mo)
  Filament:     330m/roll  std=$25  budget=$18
  Time format:  Decimal hours (e.g. 1.75 = 1.75h)
  Config file:  print_calc_config.txt (run with --config to edit)
  Log file:     print_log.csv

Project name: Custom Keychain
Number of parts: 3

--- Part 1 of 3 ---
  Print time (hours): 1.75
  Filament used (meters): 12

--- Part 2 of 3 ---
  Print time (hours): 2.0
  Filament used (meters): 15

--- Part 3 of 3 ---
  Print time (hours): 1.25
  Filament used (meters): 8

═══════════════════════════════════════════════
  RESULTS FOR: Custom Keychain
═══════════════════════════════════════════════
  Total print time:    5.00 hours
  Total filament:      35.00 meters
  ──────────────────────────────────────────
  Electricity (low):   $0.82
  Electricity (avg):   $1.23
  Filament (budget):   $1.91
  Filament (standard): $2.65
  ──────────────────────────────────────────
  MINIMUM price:       $2.73  (cover costs at best rates)
  RECOMMENDED price:   $3.88  (cover costs at typical rates)
═══════════════════════════════════════════════

  Suggested retail (2x recommended): $7.77
  Suggested retail (3x recommended): $11.65

  Logged to print_log.csv
```

---

## CSV Log Format (`print_log.csv`)

```csv
projectName,parts,totalTimeHours,totalFilamentMeters,lowElectricityCost,estElectricityCost,lowFilamentCost,estFilamentCost,lowTotalCost,estTotalCost
"Custom Keychain",3,5.00,35.00,0.82,1.23,1.91,2.65,2.73,3.88
```

- **Header auto-written** on first run (fresh file)
- **No duplicate headers** — preserves old logs
- **Quoted project names** — handles commas in names
- **Importable** to Excel/Google Sheets for business tracking

---

## v2.0 Bug Fixes & Improvements

| Issue | v1.0 Behavior | v2.0 Fix |
|-------|---------------|----------|
| Time input ambiguity | `1.75` → 1h 75m = 2.25h (wrong!) | Auto-detect: minutes>59 → decimal; mode toggle |
| Hardcoded settings | Edit source + recompile | `print_calc_config.txt` + `--config` editor |
| CSV headers | Never written or duplicated | Auto-header only on fresh file |
| Input validation | Crashes on letters/negatives | Loops until valid non-negative number |
| No CLI | Interactive only | `--config`, `--help` flags |
| No markup guidance | Just raw costs | Shows 2× and 3× retail suggestions |
| No persistence | Settings lost on exit | Config file auto-load/save |

---

## Technologies & Skills

| Domain | Specifics |
|--------|-----------|
| **C++** | C++17, i/o streams, filesystem, string parsing, CLI argument handling |
| **Build** | VS2019 (MSVC), g++ (Linux/WSL), cross-platform compatible |
| **Data** | CSV logging with header management, config file I/O (key=value) |
| **UX** | Input validation loops, clear prompts, auto-detect ambiguity warnings, formatted output tables |
| **Business logic** | Cost modeling, markup strategy, tiered pricing (min/rec/retail) |

---

## Resume Bullet Points
- Built cross-platform C++ CLI tool for 3D print job costing (electricity + filament → min/rec/retail prices)
- Implemented persistent configuration system (key=value file + interactive editor via `--config`)
- Designed dual-mode time input (clock hh.mm vs decimal hours) with auto-detection for slicer compatibility
- Added CSV logging with automatic header management and backward compatibility
- Applied input validation, CLI flags (`--config`, `--help`), and retail markup suggestions (2×/3×)
- Designed for non-technical end user (sister's business): zero setup after initial config, slicer-direct decimal input

---

## Future Roadmap (Prioritized)

| Priority | Feature |
|----------|---------|
| P1 | **Batch/pipe mode**: `--project "Name" --parts 3 --time 1.75,2.0,1.25 --filament 12,15,8` |
| P2 | **Modular refactor**: Split into Calculator/TimeParser/Config/CSVLogger + CMake + unit tests |
| P2 | **Printer profiles**: Power draw (W), bed size, nozzle → accurate electricity cost per printer |
| P3 | **Material presets**: PLA/PETG/ABS/TPU with density, cost, print temp defaults |
| P3 | **JSON config**: Nested structures for multi-printer, multi-material setups |
| P4 | **Simple TUI** (ncurses) or **web wrapper** for fully non-terminal users |
| P4 | **Quote export**: PDF/markdown with logo, itemized costs, suggested retail |

---

## Integration with Other Projects

- **Finance helper**: Import `print_log.csv` → track 3D print revenue/expenses, tax deductions
- **Portfolio**: Showcase as "C++ CLI tool with config persistence, CSV logging, dual-mode input parsing, business-oriented pricing logic"
- **Sister's business**: Pre-configure her printer/material/electricity → she runs `./PrintCalc`, enters slicer data, gets prices, CSV builds her quote history