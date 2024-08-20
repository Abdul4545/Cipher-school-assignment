require("dotenv").config()
const path = require("path")
require("./config/db.js")

const authRouter = require("./routes/authRoutes.js")
const questionRouter = require("./routes/questionRoutes.js")
const testRoutes = require("./routes/testRoutes.js")


const express = require("express")
const cors = require("cors")

const app = express();
app.use(cors({origin: true}))
app.use(express.json())


app.get("/", (req, res) => {
    res.send("App is running");
})


app.use("/cypherschool/auth", authRouter);

app.use('/cypherschool/question', questionRouter);

app.use("/cypherschool", testRoutes);


app.listen(process.env.PORT, () => {
    console.log(`----------- Server listening at port ${process.env.PORT} -------------`);
});