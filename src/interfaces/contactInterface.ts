import { z } from "zod";
import { contactSchema, contactCreateSchema, contactReadSchema, contactReturnSchema, contactUpdateSchema } from "schemas/contactSchema";
import { DeepPartial } from "typeorm";

type Contact = z.infer<typeof contactSchema>;
type ContactCreate = z.infer<typeof contactCreateSchema>;
type ContactReturn = z.infer<typeof contactReturnSchema>;
type ContactUpdate = DeepPartial<typeof contactUpdateSchema>;
type ContactRead = z.infer<typeof contactReadSchema>;

export { Contact, ContactCreate, ContactReturn, ContactUpdate, ContactRead}