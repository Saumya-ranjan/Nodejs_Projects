const birds = require("./bird");
const express = require("express");
app = express();
// ...

app.use("/birds", birds);

app.listen(5000, (req, res) => {
  console.log("running on port 5000");
});
