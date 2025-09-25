import express from 'express';
import cookieParser from 'cookie-parser';
import registerRoute from './routes/registerRoute';
import auth from './routes/auth';
import adminRoute from './routes/admin';
import refreshRoute from './routes/refreshRoute';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/register',registerRoute);
app.use('/auth',auth);
app.use('/admin', adminRoute);
app.use('/refresh', refreshRoute);

app.listen(3000,()=>{
    console.log("server running on port 3000");
});