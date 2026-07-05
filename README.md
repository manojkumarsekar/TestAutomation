# Playwright Test Automation – DemoQA

![Playwright Tests](https://github.com/manojkumarsekar/TestAutomation/actions/workflows/playwright.yml/badge.svg)

Data-driven UI automation suite built with **Playwright + TypeScript**, using
the **Page Object Model**. Targets [demoqa.com](https://demoqa.com) as a
realistic playground covering forms, native and custom dropdowns, browser
tabs/windows, JS dialogs, and drag interactions.

## Highlights

- **Page Object Model** — locators and actions separated from test logic
- **Data-driven testing** — Practice Form runs from both JSON and CSV, switchable via an environment variable
- **Custom fixtures** — auto-navigation and page setup injected per test
- **Real-world automation problems solved**, including:
  - Hidden checkbox/radio inputs (clicking the visible label, not the underlying input)
  - JS `alert()` dialog interception without deadlocking on native dialogs
  - New tab / new window handling via `context.waitForEvent('page')`
  - React-select custom dropdowns vs. native multi-`<select>` elements
  - Drag-and-drop with jQuery UI (stepped mouse movement, not native HTML5 DnD)

## Project structure

```
pages/        Page Object Model classes (locators + actions)
fixtures/     Custom Playwright fixtures (auto-navigates before each test)
data/         Test data (formData.json, formData.csv)
utils/        CSV/JSON data readers
tests/        Spec files
.github/workflows/   CI pipeline (GitHub Actions)
```

## Pages covered

| Page | What it demonstrates |
|---|---|
| Practice Form | text inputs, radio/checkbox (hidden-input pattern), date picker, dropdowns, data-driven runs |
| Browser Windows | new tab, new window, new window with message |
| Alerts | native JS `alert()` dialog interception |
| Select Menu | react-select single/multi dropdown + native multi-select |
| Droppable | drag-and-drop |

## Setup

```bash
npm install
npm install -D csv-parse
npx playwright install
```

## Run tests

```bash
# All tests, Chromium only
npx playwright test --project=chromium

# Headed mode (watch it run)
npx playwright test --project=chromium --headed

# Practice form with CSV data instead of JSON
DATA_SOURCE=csv npx playwright test tests/practiceForm.spec.ts

# Windows PowerShell equivalent
$env:DATA_SOURCE="csv"; npx playwright test tests/practiceForm.spec.ts
```

## View report

```bash
npx playwright show-report
```

## CI

Every push to `main` runs the full suite on Chromium via GitHub Actions
(see badge above). The HTML report is uploaded as a workflow artifact for
30 days, downloadable from the Actions tab.

## Design notes

- **POM**: each page object (e.g. `PracticeFormPage`, `AlertsPage`,
  `SelectMenuPage`) encapsulates its own locators and actions; specs only
  call high-level methods, never raw locators.
- **Fixtures**: each fixture handles navigation and any page-specific setup
  (e.g. removing an overlapping ad banner) so every test starts from a
  clean, ready state.
- **Data-driven**: the Practice Form spec runs once per row in the chosen
  data file, demonstrating parameterized testing over a single hardcoded run.
