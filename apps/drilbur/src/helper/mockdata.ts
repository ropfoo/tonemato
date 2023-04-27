import path from 'path';
import fs from 'fs/promises';

const MOCKFILEPATH = path.resolve(__dirname, '..', 'res', 'mock.json');

export const mockDataExists = async () =>
  (await fs.readdir(path.dirname(MOCKFILEPATH))).includes(
    path.basename(MOCKFILEPATH)
  );

export const saveMockData = async (content: any) =>
  await fs.writeFile(MOCKFILEPATH, JSON.stringify(content));

export const loadMockData = async () =>
  JSON.parse(await fs.readFile(MOCKFILEPATH, { encoding: 'utf-8' }));
