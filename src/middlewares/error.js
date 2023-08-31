module.exports = (err, req, res, next) => {
  res.status(500).send("(server error) something goes wrong")
};
