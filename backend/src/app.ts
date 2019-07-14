import express, { Application } from "express";

// Create a new express application instance
const app: Application = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
