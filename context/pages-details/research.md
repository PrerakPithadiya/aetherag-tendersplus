# Proposed Page 2: Agricultural Research & Biomorphic R&D

## Strategic Objective
To build peerless credibility and academic authority. This page caters to agricultural research institutions, agronomists, and developers. It highlights the scientific integrity of AetherAg's modeling, provides access to downloadable whitepapers, and hosts the developer API sandbox.

---

## Visual & Aesthetic Alignment
In accordance with [DESIGN.md](file:///f:/Projects/design-through-stitch/context/DESIGN.md):
- **Typography:** Serif headlines (*Libre Caslon Text*) establish a botanical journal aesthetic. Monospaced blocks for developer code and tabular datasets use clean fonts alongside *Hanken Grotesk* for metadata and labels.
- **Color Palette:** Warm background Canvas (`#f9f9f7`), sharp Primary Ink (`#000000`) code block frames, with sparse Secondary Foliage (`#3b6934`) for variables and successful API response codes.
- **Layout:** High-density, multi-column tables and double-spaced editorial text blocks resembling research reports.
- **Design Elements:** Architectural layout, micro-borders (1px strokes), and no unnecessary embellishments.

---

## Page Structure & Section-by-Section Content

### 1. Hero: Agronomic Science, Calculated
A scholarly yet modern header presenting the scientific foundation of the system.
*   **Headline:** "Agronomic Science, Calculated." (Libre Caslon Text)
*   **Subheadline:** "Explore the peer-reviewed frameworks, biomorphic machine learning models, and telemetry schemas powering AetherAg's planetary-scale calculations." (Hanken Grotesk)
*   **Primary CTA:** "Explore API Reference" (Solid Primary Ink button)
*   **Secondary CTA:** "Download Whitepaper Index (PDF)" (Outlined Primary button)
*   **Hero Visual:** A high-resolution macro-photographic image showing the intricate vascular system of a soybean leaf superimposed with thin, precise white lines representing carbon-flux vectors.

### 2. Deep Dive: Core Agronomic Models
An editorial breakdown of the scientific algorithms running in the AetherAg cloud.
*   **Layout:** 3-column layout highlighting three core models.
*   **Model 1: Nitrogen Uptake Efficiency (NUE)**
    *   *Details:* Models the kinetic rate of nitrate and ammonium absorption as a function of soil temperature, moisture gradient, and microbiological population density. Prevents over-fertilization.
*   **Model 2: Biomorphic Transpiration Flux**
    *   *Details:* Simulates stomatal conductance and canopy transpiration. Combines sensor-derived leaf temperature with wind velocity to flag drought strain 36 hours before visual wilting occurs.
*   **Model 3: Microbiome Dynamics Analysis**
    *   *Details:* Synthesizes metagenomic soil sequencing samples with real-time carbon-dioxide flux to map beneficial bacterial and mycorrhizal fungal activity.

### 3. High-Density Table: Publications & Whitepapers
A structured database of peer-reviewed papers and internal research briefs validating AetherAg.
*   **Aesthetics:** High density, Hanken Grotesk typography. Thin horizontal borders (`border-b border-primary/10`) only, zero vertical grid lines, clean margins.
*   **Columns:**
    *   *Document Title* (e.g., "Synthesized Soil Metagenomics & Live Telemetry Correlation")
    *   *Lead Author* (e.g., "Dr. Elena Vance, Dept. of Agronomy")
    *   *Affiliation* (e.g., "Purdue University Research Lab")
    *   *Metric Tested* (e.g., "Microbial Respiration Accuracy")
    *   *Format / Link* (e.g., "[PDF Download] (4.2 MB)" in Secondary Foliage green)

### 4. Interactive Sandbox: Developer API Integration
A live-running mockup of the API terminal, enabling developers to query simulated sensor nodes.
*   **Concept:** A mock API console showcasing a cURL request and JSON response.
*   **Code Block (cURL Request):**
    ```bash
    curl -X GET "https://api.aetherag.com/v1/sensors/probe-902-88f" \
      -H "Authorization: Bearer $AETHER_API_KEY" \
      -H "Accept: application/json"
    ```
*   **Response Block (JSON Output):**
    ```json
    {
      "sensor_id": "probe-902-88f",
      "status": "optimal",
      "timestamp": "2026-06-14T21:30:00Z",
      "telemetry": {
        "soil_moisture_pct": 24.8,
        "soil_temperature_c": 19.2,
        "salinity_ec_ds_m": 1.45,
        "nitrogen_ppm": 42.1,
        "phosphorus_ppm": 12.8,
        "potassium_ppm": 88.4
      },
      "confidence_index": 0.985
    }
    ```
*   **Interactive Control:** A dropdown allowing users to switch parameters (e.g., requesting `"Soil telemetry"`, `"Atmospheric stress"`, or `"Yield predictions"`) which dynamically updates the JSON response field.

---

## Interactive Elements & Micro-Animations
- **Code Block Clipboard Copy:** A small "Copy" button inside the API sandbox that changes to a checkmark badge (`Copied!`) when clicked, styled in Secondary Foliage green with a quick slide-in transition.
- **Table Hover Rows:** Hovering over a research paper row highlights the entire row with a very subtle background tint (`bg-surface-container-low/50`), creating an editorial, searchable list feel.
- **Telemetry Pulse:** In the API response, values like `soil_moisture_pct` can have subtle micro-fades to simulate real-time changes if the user presses a "Refresh" button.

---

## SEO & Accessibility Blueprint
- **Page Title:** Agronomic Research & Developer API | AetherAg Science
- **Meta Description:** "Review the peer-reviewed science behind AetherAg's biomorphic soil and crop models. Access API documentation, read agronomy whitepapers, and integrate live soil sensors."
- **Heading Structure:**
    - `<h1>`: Agronomic Science, Calculated.
    - `<h2>`: Core Agronomic Models / Publications & Whitepapers / Developer API Integration
    - `<h3>`: Nitrogen Uptake Efficiency / Biomorphic Transpiration Flux / Microbiome Dynamics Analysis
- **Semantic HTML:** `<article>` for each scientific model description, `<code>` blocks wrapped in `<pre>` for code segments, and standard `<table>` markup with `<thead>` and `<tbody>` for publications.
- **Unique IDs:**
    - `research-hero`
    - `agronomic-models-grid`
    - `publications-database`
    - `developer-api-sandbox`
