import { z } from 'zod';

// Schéma de validation pour un nouveau contact
export const contactSchema = z.object({
  name: z
    .string()
    .nonempty("Le nom est obligatoire.")
    .regex(/^[a-zA-Z\s]+$/, "Le nom ne doit pas contenir de caractères spéciaux."),
  phoneNumber: z
    .string()
    .regex(/^6\d{8}$/, "Le numéro doit contenir 9 chiffres et commencer par 6."),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;