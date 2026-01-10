const Imagekit=require("imagekit")

const imagekit=new Imagekit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
})
const uploadFile=async (file,filename)=>{
    const response=await imagekit.upload({
        file:file,
        fileName:filename,
        folder:"ImageToCaption"
    })
    return response
}
module.exports=uploadFile;