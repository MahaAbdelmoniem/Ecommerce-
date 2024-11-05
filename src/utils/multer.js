import multer, { diskStorage } from "multer"
export const fileArrayType = {
    image:["image/jpg","image/png"],
    pdf:["application/pdf"],
    vedio:["video/mp4"]
}

export const uploadFile = (fileUploadType)=>{

const fileFilter=(req,file,cb)=>{

if(!fileUploadType.includes(file.mimetype))
{
   
return cb(new Error("Wrong format"),false)
}
return cb(null,true)

}

return multer({storage:diskStorage({}),fileFilter})



}


