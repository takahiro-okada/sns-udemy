const express = require("express");
const app = express();
const authRoute = require("./routers/auth");

require("dotenv").config();

const PORT = 5001;


app.use(express.json());

// ブラウザで5001ポートにアクセスすると、Hello Worldが表示される
// app.get("/", (req, res) => {
//   res.send("<h1>Hello World</h1>");
// })

app.use("/api/auth", authRoute);

app.listen(PORT, () => console.log("Server is running on port ${PORT}"));
