type baseError={
    message:String
    code:number
}

export class CustomError{
    iError:baseError={code:0,message:""}
    constructor(error:baseError){
        this.setError(error)
    };
    getError(){
        return {
            statusCode: this.iError.code,
            message: this.iError.message
        }
    };
    getStrError(){
        return {
            statusCode: this.iError.code,
            body: JSON.stringify(this.iError.message),
        }
    };
    setError(error:baseError){
        if(error instanceof CustomError){this.iError=error.iError
        }else{
            this.iError.code = error.code||500
            this.iError.message = error.message}
    };
}

