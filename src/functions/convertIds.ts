const yaml = require('js-yaml');
const fs   = require('fs');

const notionIdToSlackId = async (id: string): Promise<string> => {
  const users = yaml.load(fs.readFileSync('./data/users.yaml', 'utf8'));
  const targetUser = users.find((user: any) => user.notionId === id)
  return targetUser.slackId
}

const slackIdToNotionId = async (id: string): Promise<string> => {
  const users = yaml.load(fs.readFileSync('./data/users.yaml', 'utf8'));

  const targetUser = users.find((user) => user.slackId === id)
  return targetUser.notionId
}

export { notionIdToSlackId, slackIdToNotionId }