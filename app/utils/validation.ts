import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .nonempty("Le nom est obligatoire.")
    .regex(/^[a-zA-Z\s]+$/, "Le nom ne doit pas contenir de caractères spéciaux."),
  phoneNumber: z
    .string()
    .regex(/^6\d{8}$/, "Le numéro doit contenir 9 chiffres et commencer par 6."),
});

export type ContactValidation = z.infer<typeof contactSchema>;

export const validateField = <T>(schema: z.ZodType<T>, value: string): string | null => {
  const result = schema.safeParse(value);
  if (!result.success) {
    return result.error.issues[0].message;
  }
  return null;
};

export const validateContactField = (field: keyof ContactValidation, value: string) => {
  const fieldSchema = contactSchema.shape[field];
  return validateField(fieldSchema, value);
};

// Messages d'aide dynamiques pour le champ nom
export const getNameHelperText = (value: string, error?: string): string => {
  if (error) return error;
  if (!value) return "Entrez le nom du contact";
  if (!/^[a-zA-Z\s]*$/.test(value)) return "Le nom doit contenir uniquement des lettres et des espaces";
  if (value.length < 2) return "Le nom doit contenir au moins 2 caractères";
  return "Format du nom valide";
};

// Formater le numéro de téléphone avec des espaces
export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\s/g, '');
  if (digits.length <= 3) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  if (digits.length <= 7) return `${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
};

// Messages d'aide dynamiques pour le champ numéro de téléphone
export const getPhoneHelperText = (value: string, error?: string): string => {
  if (error) return error;
  const digits = value.replace(/\s/g, '');
  if (!digits) return "Format attendu : 6XX XX XX XX";
  if (!/^6/.test(digits)) return "Le numéro doit commencer par 6";
  if (!/^\d*$/.test(digits)) return "Utilisez uniquement des chiffres";
  if (digits.length < 9) {
    const remaining = 9 - digits.length;
    if (digits.length < 3) {
      return `Entrez encore ${3 - digits.length} chiffre${3 - digits.length > 1 ? 's' : ''} pour le premier groupe`;
    }
    return `${remaining} chiffre${remaining > 1 ? 's' : ''} manquant${remaining > 1 ? 's' : ''}`;
  }
  if (digits.length > 9) return "Le numéro doit contenir exactement 9 chiffres";
  return "Format du numéro valide";
};