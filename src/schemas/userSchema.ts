import { z } from "zod";
import { contactReturnSchema, contactReadSchema } from "./contactSchema";

const userSchema = z.object({
    id: z.number(),
    full_name: z.string().max(255),
    email: z.string().max(255).email(),
    password: z.string().max(255),
    phone_number: z.string().max(20),
    registration_date: z.string(),
    delete_date: z.string().nullish(),
    contacts: contactReadSchema,
});

const userCreateSchema = userSchema.omit({
    id: true,
    registration_date: true,
    contacts: true,
    delete_date: true,
});

const userReturnSchema = userSchema.omit({password: true})

const userReadSchema = userReturnSchema.array();

const userUpdateSchema = userCreateSchema.partial();

export {
    userSchema,
    userCreateSchema,
    userReturnSchema,
    userReadSchema,
    userUpdateSchema,
}