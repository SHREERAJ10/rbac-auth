import express from 'express';
import forgotPasswordRoute from './forgotPasswordRoute';

const reset = express.Router();

reset.use('/password',forgotPasswordRoute);

export default reset;
