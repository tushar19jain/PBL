class apiError extends Error{
    constructor(status,message="Something went wrong"){
        super(message);
        this.status=status;
    }
}
module.exports=apiError;