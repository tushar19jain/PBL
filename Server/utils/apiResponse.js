class apiResponse{
    constructor(status,message="Ok",data){
        this.data=data;
        this.status=status;
        this.message=message;
    }
}

module.exports=apiResponse;