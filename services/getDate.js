module.exports = () => {
  const now = new Date(Date.now()).toISOString();
  const published = now;
  const updated = now;
  return { published, updated };
};