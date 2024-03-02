const express = require("express");
const app = express();
const cors = require("cors")

const path = require("path")

require("./Connection/connection")
const auth = require("./Routes/auth")
const list = require("./Routes/listR")
app.use(express.json());
app.use(cors());

app.use("/api/v1", auth);

app.use("/api/v2", list);

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "Frontend", "dist")));
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
});

app.listen(1000, ()=>{
    console.log("server started")
})