const whitelist = [process.env.CORPORATE_SITE_URL, process.env.UCHIRECO_SITE_URL]
export default () => {
  return {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    optionsSuccessStatus: 201
  }
}