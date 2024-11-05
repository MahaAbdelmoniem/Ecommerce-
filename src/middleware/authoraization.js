export const authorization = (role)=>{
return async(req,res,next)=>{
    return req.user.role==role ? next()  :  next (new Error("You are not authorizated"))

}


}
