import { z } from "zod";
import { userSchema, userCreateSchema, userReadSchema, userReturnSchema, userUpdateSchema } from "schemas/userSchema";
import { DeepPartial } from "typeorm";

type Users = z.infer<typeof userSchema>;
type UsersCreate = z.infer<typeof userCreateSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;
type UserUpdate = DeepPartial<typeof userUpdateSchema>;
type UserRead = z.infer<typeof userReadSchema>;

export { Users, UsersCreate, UserReturn, UserUpdate, UserRead}