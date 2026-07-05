import { test, expect } from '../fixtures/formsPage.fixture';
import { readFormDataFromJson } from '../utils/jsonReader';
import { readFormDataFromCsv } from '../utils/csvReader';
import { FormData } from '../pages/PracticeFormPage';

/**
 * Choose data source by setting the DATA_SOURCE env variable before running:
 *
 *   DATA_SOURCE=json npx playwright test tests/practiceForm.spec.ts   (default)
 *   DATA_SOURCE=csv  npx playwright test tests/practiceForm.spec.ts
 *
 * On Windows PowerShell:
 *   $env:DATA_SOURCE="csv"; npx playwright test tests/practiceForm.spec.ts
 */
const dataSource = process.env.DATA_SOURCE ?? 'json';

const testData: FormData[] =
  dataSource === 'csv' ? readFormDataFromCsv() : readFormDataFromJson();

for (const data of testData) {
  test(`submit practice form for ${data.firstName} ${data.lastName} [${dataSource}]`, async ({
    formsPage,
  }) => {
    await formsPage.fillForm(data);
    await formsPage.submit();
    await formsPage.expectSubmissionSuccess();
  });
}
