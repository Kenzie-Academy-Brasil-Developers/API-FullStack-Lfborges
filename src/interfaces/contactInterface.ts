import { z } from "zod";
import { contactSchema, contactCreateSchema, contactReadSchema, contactReturnSchema, contactUpdateSchema } from "schemas/contactSchema";
import { DeepPartial } from "typeorm";

type Contacts = z.infer<typeof contactSchema>;
type ContactsCreate = z.infer<typeof contactCreateSchema>;
type ContactReturn = z.infer<typeof contactReturnSchema>;
type ContactUpdate = DeepPartial<typeof contactUpdateSchema>;
type ContactRead = z.infer<typeof contactReadSchema>;

export { Contacts, ContactsCreate, ContactReturn, ContactUpdate, ContactRead}