import express from 'express';
import cookieParser from 'cookie-parser';
import registerRoute from './routes/authRoute/registerRoute';
import auth from './routes/authRoute/auth';
import adminRoute from './routes/protectedRoute/admin';
import refreshRoute from './routes/authRoute/refreshRoute';
import verify from './routes/verify';
import reset from './routes/reset';
import limiter from './middlewares/rateLimit';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(limiter);

app.use('/register',registerRoute);
app.use('/auth',auth);
app.use('/admin', adminRoute);
app.use('/refresh', refreshRoute); //To get access-refresh token for refresh token rotation
app.use('/verify',verify);
app.use('/reset',reset);

app.listen(3000,()=>{   
    console.log("server running on port 3000");
});