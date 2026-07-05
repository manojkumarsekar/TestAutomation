import fs from 'fs';
import path from 'path';
import { FormData } from '../pages/PracticeFormPage';

export function readFormDataFromJson(fileName = 'formData.json'): FormData[] {
  const filePath = path.join(__dirname, '..', 'data', fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as FormData[];
}
