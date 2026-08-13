# 🏛️ Official Goa Exam Rules & Performance Optimization Audit

This document details the official **GPSC & GSSC exam pattern specifications**, performance optimization audit, and responsive mobile architecture.

---

## 🏛️ 1. Official Goa Government Exam Patterns

### A. GPSC Civil Services Examination (Officer Level)
- **Pre-Screening Test**:
  - **Question Count**: **60 Questions** (60 Marks)
  - **Duration**: **60 to 75 Minutes**
  - **Negative Marking**: None in Pre-Screening.
- **Screening Test (CBRT - Computer Based Recruitment Test)**:
  - **Question Count**: **75 Questions** (75 Marks)
  - **Duration**: **75 to 90 Minutes**
- **Written (Competitive) Main Exam**:
  - **Total Marks**: **250 Marks** (Paper I: 120 mins | Paper II: 90 mins)
  - **Negative Marking**: **-0.5 Marks** deducted for each wrong objective answer.

### B. GSSC LDC & MTS Recruitment (Subordinate Services)
- **Computer-Based Test (CBT)**: Multi-tier objective selection.
- **Skill Test**: Mandatory Typing Test (**30 WPM in English**).

---

## ⚡ 2. UI Performance & 60fps Animation Audit

1. **Hardware Acceleration (`will-change: transform`)**:
   - Added GPU-accelerated CSS layer compositing on cards, buttons, and memory flip tiles.
   - Reduced layout re-paints for 60fps buttery smooth UI animations.
2. **Fast Scale Transitions**:
   - Reduced tab view transition duration to `0.2s` for instant responsiveness.

---

## 📱 3. Responsive Breakpoint Specs

- **Desktop (`> 900px`)**: Fixed 260px left sidebar + 300px right OMR palette grid.
- **Tablet & Mobile (`<= 900px`)**:
  - Sidebar collapses to top bar stream.
  - OMR Palette grid expands to a 10-column responsive touch ribbon.

---

## 🧪 4. Automated Verification Test
Run the automated exam rules & performance test script:
```bash
python test_official_rules.py
```
- ✅ Verified hardware acceleration (`will-change` & `transform`).
- ✅ Verified mobile media query breakpoints (`@media (max-width: 900px)`).
