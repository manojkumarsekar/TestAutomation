# Playwright Automation – DemoQA Practice Form

Data-driven UI automation suite built with Playwright + TypeScript, using the
Page Object Model. Test data can be sourced from either JSON or CSV.

## Structure

```
pages/        Page Object Model classes (locators + actions)
fixtures/     Custom Playwright fixtures (auto-navigates to the page under test)
data/         Test data (formData.json, formData.csv)
utils/        Data readers (csvReader.ts, jsonReader.ts)
tests/        Spec files
```

## Setup

```bash
npm install
npm install -D csv-parse
npx playwright install
```

## Run tests

```bash
# Default (JSON data)
npx playwright test tests/practiceForm.spec.ts --project=chromium

# Using CSV data instead
DATA_SOURCE=csv npx playwright test tests/practiceForm.spec.ts --project=chromium

# Windows PowerShell
$env:DATA_SOURCE="csv"; npx playwright test tests/practiceForm.spec.ts --project=chromium

# Headed mode (watch it run)
npx playwright test tests/practiceForm.spec.ts --project=chromium --headed
```

## View report

```bash
npx playwright show-report
```

## Design notes

- **POM**: `PracticeFormPage` encapsulates all locators and actions for the
  form; specs only call high-level methods (`fillForm`, `submit`,
  `expectSubmissionSuccess`), not raw locators.
- **Data-driven**: the same spec runs once per row in the chosen data file,
  demonstrating parameterized testing over a hardcoded single run.
- **Fixture**: `formsPage` fixture handles navigation and ad-removal setup
  so every test starts from a clean, ready state.
