import ratelimit from "../config/upstash.js"


const  rateLimiter =  async(req , res , next)=>{

    try{
        const { success } = await ratelimit.limit("my-limit-key");  // هيك كل المشتريكن هيشتركو ع نفس الليمت يعني انا واميره وساره ووفاء مسموحلنا نبعت 100 طلب ف الدقيقه 
        // const { success } = await ratelimit.limit(userid);  مش هقدر استخدمها هنا بس بشكل عام هي اللي تستخدم بس انا ما عندي اوثمتكيش حاليا ف هعملها بطريقه تانيه  // اما هنا انا لحال واميره لحال وساره لحال كل واحد الو عداد مختلف المهم هادي تطبيق في مشاريع كبر ان شاء الله
        

        if(!success){
            return res.status(429).json({
                message : "Too Many Requests , Please Try Again Later"
            })
        }
        next()
    }catch(error){
        console.log("Rate limit error" , error)
        next(error)
    }
}

export default rateLimiter;