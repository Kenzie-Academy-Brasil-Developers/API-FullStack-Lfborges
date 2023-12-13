import { z } from "zod";

const sessionCreateSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

const sessionReturnSchema = z.object({
    token: z.string(),
});

export { sessionCreateSchema, sessionReturnSchema };