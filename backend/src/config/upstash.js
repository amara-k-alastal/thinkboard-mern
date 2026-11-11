import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"
import dotenv from "dotenv"

dotenv.config();

// creat a ratelimiter that allow 100 req per 60sec
const ratelimit = new Ratelimit({
    redis : Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow( 10 , "60 s")
})

export default ratelimit;