const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "../web-build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../web-build", "index.html"));
});

app.listen(5000, () =>
  console.log("Express server is running on localhost:5000")
);