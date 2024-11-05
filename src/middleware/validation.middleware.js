import { Types } from "mongoose"
export const idOb = (value, helper) => {
    return Types.ObjectId.isValid(value) ? true : helper.message("Invalid object id")
    
          };
        
export const isValid=(schema)=>{
    return (req,res,next)=>{
        const object = {...req.body,...req.params,...req.query}
    
        const validationRes = schema.validate(object,{abortEarly:false})
        if(validationRes.error){
            const er= JSON.stringify(validationRes.error.details.map((error)=>error.message))
    
            return next(new Error(er))
    
        }
        return next()
    
    
    
    }
    
    }
