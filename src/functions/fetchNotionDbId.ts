const yaml = require('js-yaml');
const fs   = require('fs');

export default async (title: string): Promise<string> => {
  const notions = yaml.load(fs.readFileSync('./data/notion.yaml', 'utf8'));
  const targetNotion = notions.find((notion: any) => notion.title === title)
  return targetNotion.id
}
