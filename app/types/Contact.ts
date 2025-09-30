// Structure d'un contact dans l'app
export interface Contact {
  // ID unique (nombre ou texte)
  id: string | number;

  // Nom du contact (min 2 caractères, pas de caractères spéciaux)
  nom: string;

  // Numéro de téléphone (9 chiffres, commence par 6)
  numero: number;
}