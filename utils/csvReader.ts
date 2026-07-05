import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { FormData } from '../pages/PracticeFormPage';

/**
 * Reads a CSV file and converts each row into a FormData object.
 * Multi-value fields (subjects, hobbies) are pipe-separated in the CSV,
 * e.g. "Maths|English|Science" -> ["Maths", "English", "Science"]
 */
export function readFormDataFromCsv(fileName = 'formData.csv'): FormData[] {
  const filePath = path.join(__dirname, '..', 'data', fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const records: Record<string, string>[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  return records.map((row) => ({
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    gender: row.gender as FormData['gender'],
    mobile: row.mobile,
    dateOfBirth: row.dateOfBirth,
    subjects: row.subjects.split('|'),
    hobbies: row.hobbies.split('|'),
    currentAddress: row.currentAddress,
    state: row.state,
    city: row.city,
  }));
}
