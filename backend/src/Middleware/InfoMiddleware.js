export const infoMiddleware= async(req,res,next)=>{
    console.log(`url ${req.url} with ${req.method}`)
    
    next()
}
