const express = require("express");
const helmet = require("helmet");
const app = express();
const port = process.env.PORT || process.env.port || 3000;

app.use(express.static("dist"));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
