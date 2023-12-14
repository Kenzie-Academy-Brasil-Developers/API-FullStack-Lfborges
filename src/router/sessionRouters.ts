import express from 'express';
import { login } from '../controllers/sessionController';
import { validateBody } from 'middlewares';
import { sessionCreateSchema } from 'schemas/sessionSchema';

const loginRouter = express.Router();

loginRouter.post('/', validateBody(sessionCreateSchema), login);

export default loginRouter;