const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validationToken = asyncHandler(async(req,res,nxt)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.SECRET_TOKEN,(err,decoded)=>{
            if (err) {
                return res.status(401).json({ message: "Not Authorized User" });
            }
            req.user = decoded.user;
            console.log(decoded)
            nxt();
        })
        if(!token){
            return res.status(401).json({ message: "Not Authorized User Or Invalid token" });
        }
}})

module.exports = validationToken