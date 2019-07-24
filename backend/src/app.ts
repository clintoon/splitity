import express, { Application } from 'express';

// Create a new express application instance
const app: Application = express();

app.get('/', (req, res): void => {
  res.send('Hello World!');
});

app.listen(3000, (): void => {
  console.log('Listening on port 3000');
});
