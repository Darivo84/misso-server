const app = require('./app');
const PORT = 3001;

app.listen(PORT, () => {
  console.info(`MISSO server listening on port ${PORT}`);
});
