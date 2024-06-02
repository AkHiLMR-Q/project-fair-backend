const applicationMiddleware=(req,res,next)=>{
    console.log("inside Application middleware");
    next()
}
module.exports=applicationMiddleware