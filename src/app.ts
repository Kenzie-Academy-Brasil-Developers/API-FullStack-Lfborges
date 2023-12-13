import express from 'express';
import 'express-async-errors'
import { handleError } from 'errors/handleError';

const app = express();
app.use(express.json());

app.use('/user',)
app.use('/contacts',)
app.use('/login', )

app.use(handleError)

export default app;