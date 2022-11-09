const yaml = require('js-yaml');
const fs   = require('fs');

export default async (name: string): Promise<string> => {
  const channels = yaml.load(fs.readFileSync('./data/slack.yaml', 'utf8'));
  const targetChannel = channels.find((channel: any) => channel.name === name)
  return targetChannel.id
}
