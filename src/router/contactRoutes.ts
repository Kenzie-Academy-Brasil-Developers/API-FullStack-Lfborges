import express from 'express';
import { contactController } from 'controllers';
import { validateBody, validateContactUser, validateToken, checkUserId, cheackDuplicateContact } from 'middlewares';
import { contactCreateSchema } from 'schemas/contactSchema';

const contactRouter = express.Router();

contactRouter.post('/', validateBody(contactCreateSchema), validateToken,cheackDuplicateContact, validateContactUser, contactController.create);
contactRouter.get('/', validateToken, contactController.read);
contactRouter.patch('/:contactId', validateToken, contactController.update);
contactRouter.delete('/:contactId', validateToken, contactController.destroy);

export default contactRouter;