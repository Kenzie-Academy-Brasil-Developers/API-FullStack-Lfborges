import { z } from 'zod';

const contactSchema = z.object({
    id: z.string(),
    full_name: z.string().max(255),
    email: z.string().max(255).email(),
    phone_number: z.string().max(20),
    registration_date: z.string(),
    delete_date: z.string().nullish(),
});

const contactCreateSchema = contactSchema.omit({
    id:true,
    registration_date: true,
    delete_date: true,
})

const contactReturnSchema = contactSchema;
const contactReadSchema = contactReturnSchema.array();
const contactUpdateSchema = contactCreateSchema.partial();

export {
    contactSchema,
    contactCreateSchema,
    contactReturnSchema,
    contactReadSchema,
    contactUpdateSchema,
};