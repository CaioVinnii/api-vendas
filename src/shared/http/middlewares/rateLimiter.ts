import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 1,
  duration: 1
});

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (typeof req.ip === 'string') {
      await limiter.consume(req.ip);

      return next();
    } else {
      throw new AppError("Your ip is don't valid.", 429);
    }
  } catch (err) {
    throw new AppError('Too many requests.', 429);
  }
}