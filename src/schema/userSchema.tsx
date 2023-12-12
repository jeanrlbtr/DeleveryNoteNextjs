import { z } from 'zod';

const UserSchema = z.object({
   name: z.string(),
   age: z.number().optional(),
   email: z.string().email(),
});

type User = z.infer<typeof UserSchema>;
