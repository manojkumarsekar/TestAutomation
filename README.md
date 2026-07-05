# Playwright Test Automation – DemoQA

**Author:** Manoj Kumar

![Playwright Tests](https://github.com/manojkumarsekar/TestAutomation/actions/workflows/playwright.yml/badge.svg)

Data-driven UI automation suite built with **Playwright + TypeScript**, using
the **Page Object Model**. Targets [demoqa.com](https://demoqa.com) as a
comprehensive playground covering 14+ test scenarios including forms, widgets,
dropdowns, browser windows, dialogs, drag interactions, date pickers, tooltips,
and API integration.

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

## Skills Demonstrated

- **UI Interaction Patterns**: form inputs, buttons, dropdowns, checkboxes, radio buttons, tabs, menus, sliders
- **Advanced Interactions**: drag-and-drop, hover states, context menus, keyboard navigation
- **Date/Time Handling**: calendar pickers, time selectors, date validation
- **Dialog Handling**: alert, confirm, and prompt dialog interception
- **Browser Management**: new tabs, new windows, context switching
- **API Testing**: REST API integration, response validation
- **Data-Driven Testing**: parameterized runs from JSON and CSV
- **Test Architecture**: Page Object Model, custom fixtures, reusable locators
- **TypeScript**: strong typing, interfaces, inheritance
- **Accessibility Selectors**: semantic role-based queries (`getByRole`, `getByText`, `getByLabel`)

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
| Browser Windows | new tab, new window, new window with message handling |
| Alerts | native JS `alert()`, `confirm()`, `prompt()` dialog interception |
| Select Menu | react-select single/multi dropdown + native multi-select elements |
| Droppable | drag-and-drop interactions with jQuery UI |
| Menu | context menu and sub-menu navigation |
| Tabs | tab switching and content verification |
| Resizable | resizable element interactions |
| Tool Tips | hover interactions and tooltip visibility validation |
| Progress Bar | button interactions and progress state verification |
| Slider | range input value manipulation |
| Date Picker | date and time selection from calendar pickers |
| Book Store API | REST API integration and response handling |
| Text Book | complex table navigation and data retrieval |

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

**GitHub Actions** (`.github/workflows/playwright.yml`)
Every push to `main` and pull requests run the full test suite on Chromium via GitHub Actions
(see badge above). The HTML report is uploaded as a workflow artifact for
30 days, downloadable from the Actions tab.

**Azure DevOps** (`azure-pipelines.yml`)
Alternative CI/CD pipeline configured for teams using Azure DevOps. Provides
equivalent functionality with Azure-native artifact storage and reporting.

**What's validated:**
- All 14+ test scenarios (forms, widgets, dialogs, API, etc.)
- Page Object Model structure and fixture integrity
- Data-driven test parameterization (JSON & CSV)
- Chromium browser with full dependencies
- Accessibility-first selectors (`getByRole`, `getByLabel`, etc.)
- API integration and response handling

**Local CI simulation:**
```bash
# Run full suite (all projects, all browsers)
npx playwright test

# Run specific test suite
npx playwright test tests/practiceForm.spec.ts

# Run and debug with UI
npx playwright test --ui
```

## Design notes

- **POM**: each page object (e.g. `PracticeFormPage`, `AlertsPage`,
  `SelectMenuPage`) encapsulates its own locators and actions; specs only
  call high-level methods, never raw locators.
- **Fixtures**: each fixture handles navigation and any page-specific setup
  (e.g. removing an overlapping ad banner) so every test starts from a
  clean, ready state.
- **Data-driven**: the Practice Form spec runs once per row in the chosen
  data file, demonstrating parameterized testing over a single hardcoded run.
