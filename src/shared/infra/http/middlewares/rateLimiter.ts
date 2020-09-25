import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

/*
const redisClient = redis.createClient({
    host
});

export default function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction,
) {}
*/
