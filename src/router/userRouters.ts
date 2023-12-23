import express from 'express';
import { userController } from '../controllers';
import { validateBody, validateToken, checkUserId, checkEmailExist, cheackDuplicateContact } from '../middlewares';
import { userCreateSchema } from '../schemas/userSchema';
import { contactCreateSchema } from '../schemas/contactSchema';

const userRouter = express.Router();


userRouter.post("/", validateBody(userCreateSchema), checkEmailExist, userController.create);
userRouter.get("/", userController.read);
userRouter.patch("/:userId", validateToken, checkUserId, userController.update);
userRouter.delete("/:UserId", validateToken, checkUserId, userController.destroy);
userRouter.post("/:userId/contacts", validateToken, validateBody(contactCreateSchema), cheackDuplicateContact, userController.addContact);
userRouter.delete("/userId/contact/:contactid/", validateToken, checkUserId, userController.removeContact)


export default userRouter;
