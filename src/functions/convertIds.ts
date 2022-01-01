const idData = require('../../data/ids.json'); 

const notionIdToSlackId = (id: string): string => {
  const findJson = idData.find(json => json["notion"] == id)
  return findJson["slack"]
}

const slackIdToNotionId = (id: string): string => {
  const findJson = idData.find(json => json["slack"] == id)
  return findJson["notion"]
}

export { notionIdToSlackId, slackIdToNotionId }