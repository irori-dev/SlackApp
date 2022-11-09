const yaml = require('js-yaml');
const fs   = require('fs');

export default async (name: string): Promise<string> => {
  const users = yaml.load(fs.readFileSync('./data/users.yaml', 'utf8'));
  const targetUser = users.find((user) => user.name === name)
  return targetUser.notionId
}
