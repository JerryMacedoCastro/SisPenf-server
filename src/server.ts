import express from 'express';

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hi Docker!!!");
});
app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3333');
});
