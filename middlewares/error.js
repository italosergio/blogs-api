module.exports = (err, _req, res, _next) => {
  console.error(err);
  return res.status(500).send('Crash server... (Lascou!)');
};