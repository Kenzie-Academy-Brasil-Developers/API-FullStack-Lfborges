import express from 'express';
import 'express-async-errors'
import { handleError } from './errors/handleError';
import contactRouter from './router/contactRoutes';
import loginRouter from './router/sessionRouters';
import userRouter from './router/userRouters';

const app = express();
app.use(express.json());

app.use('/user', userRouter)
app.use('/contacts', contactRouter)
app.use('/login', loginRouter)

app.use(handleError)

export default app;
