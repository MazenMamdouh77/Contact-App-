const express = require("express")
const app = express()
const dotenv = require("dotenv");
dotenv.config();
const { connectDB } = require("./config/db");
const errorHandler = require("./middlewares/errorHandler")
const port = process.env.Port || 5000
app.use(express.json())
app.use(errorHandler)
app.use("/api/contacts",require("./routes/contactRoutes"))
app.use("/api/users",require("./routes/userRoutes"))

console.log(`Mongo URL: ${process.env.MONGO_URL}`);

app.listen(port,(req,res)=>{
    connectDB();
    console.log(`server is running on port ${port}`)
})