const app = require('./app');
const PORT = 3002;

app.listen(PORT, () => {
  console.info(`MISSO consumer listening on port: ${PORT}`);
});
