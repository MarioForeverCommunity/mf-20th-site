import { parse } from 'yaml';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function loadYaml<T>(filename: string): Promise<T> {
  const filePath = join(__dirname, '..', 'data', filename);
  
  if (!existsSync(filePath)) {
    throw new Error(`YAML file not found: ${filePath}`);
  }
  const content = readFileSync(filePath, 'utf-8');
  return parse(content) as T;
}
