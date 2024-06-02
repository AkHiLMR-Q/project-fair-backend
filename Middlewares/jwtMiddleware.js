const jwt=require('jsonwebtoken')

//token verification

const jwtMiddleware=(req,res,next)=>{
    console.log("inside jwt middleware");


   try {
     //get token
     const token=req.headers['authorization'].slice(7)
     console.log(token);
     //verify the token
 const jwtVerification=jwt.verify(token,"itsok2024")
 console.log(jwtVerification);//payload userid
 req.payload=jwtVerification.userId
   } catch (err) {
    res.status(401).json({"AuthorizationError":err.message})
   }

    next()
}
module.exports=jwtMiddleware