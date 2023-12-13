import { z } from "zod";
import { sessionCreateSchema, sessionReturnSchema } from "schemas/sessionSchema";

type SessionCreate = z.infer<typeof sessionCreateSchema>;
type SessionReturn = z.infer<typeof sessionReturnSchema>;

export { SessionCreate, SessionReturn }