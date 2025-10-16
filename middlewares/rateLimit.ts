import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 8,
    message:"Too many requests from this IP"
});

export default limiter;