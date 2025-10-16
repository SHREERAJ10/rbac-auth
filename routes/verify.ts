import express from 'express';
import emailRoute from './emailRoute';

const verify = express.Router();

verify.use('/email',emailRoute);

export default verify;
