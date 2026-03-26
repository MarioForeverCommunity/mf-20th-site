import { parse } from 'yaml';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function loadYaml<T>(filename: string): Promise<T> {
  const filePath = join(process.cwd(), 'src', 'data', filename);
  
  if (!existsSync(filePath)) {
    throw new Error(`YAML file not found: ${filePath}`);
  }
  const content = readFileSync(filePath, 'utf-8');
  return parse(content) as T;
}
