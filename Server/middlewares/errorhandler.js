
const errorhandler=async(err,req,res,next)=>{
    const status=err.status||500;
    const message=err.message||"server not responding";

    res.status(status).json({
        succes:false,
        status:status,
        message:message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    })
}

module.exports=errorhandler;
