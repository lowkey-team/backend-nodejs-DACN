import { StatusCodes } from "http-status-codes";

export const errorHandlingMiddleware = (err,req,res,next)=>{
    if(!err.statusCodes) err.statusCodes = StatusCodes.INTERNAL_SERVER_ERROR
    const responseError = {
        statusCodes: err.statusCodes,
        message: err.message || StatusCodes[err.statusCodes],
        stack:err.stack
    }

    res.status(responseError.statusCodes).json(responseError)
}