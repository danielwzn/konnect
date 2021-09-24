const logger = (req, res, next) => {
  const { method } = req;
  const { url } = req;
  const time = new Date().getTime();
  next();
};

module.exports = logger;
