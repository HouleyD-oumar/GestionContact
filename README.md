# Gestion de contacts 

C'est un mini-projet pour pratiquer le travail en équipe. Il permet de créer et de gérer des contacts avec nom et numéro de téléphone.

## Fonctionalités

- Création de contact avec `nom` et `numero`
- Gestion de contact avec `modification ou suppression de contact`
- Consultation des Contacts existant

## Configuration

- Cloner le projet :

```bash
git clone https://github.com/HouleyD-oumar/GestionContact.git
```

- Installer les dépendances :

```bash
npm install
```

- Lancer le projet :

```bash
npm run dev
```

## Technologies

- Next.js 15
- React 19 (avec Hooks pour la gestion d'état)
- TypeScript 5
- Tailwind CSS 4
- ESLint
- React-Toastify (pour les notifications)

## Contraintes et bonnes pratiques

### 🎨 Design Pattern et UI

- Palette de Couleurs :
  - Principales :
    - Bleu Nuit (`#0A1931`) - Navigation et en-têtes
    - Blanc (`#FFFFFF`) - Arrière-plan principal
    - Noir (`#000000`) - Texte principal
  - Actions (CTA) :
    - Primaire (`#185ADB`) - Actions principales
    - Succès (`#4CAF50`) - Validations
    - Attention (`#FFA500`) - Modifications
    - Danger (`#DC3545`) - Suppressions

- Modales :
  - Mise à jour : Fond blanc, en-tête clair, formulaires espacés
  - Confirmation : Centrée, message concis, icônes intuitives
  - Actions : Boutons différenciés par couleur

- Messages et Toasts :
  - Position en haut à droite
  - Durée de 3 secondes
  - Messages clairs et intuitifs
  - Code couleur contextuel (succès, information, avertissement, erreur)

### 💻 Conventions de Code

- Conventions de nommage :
  - camelCase pour les variables et propriétés (ex: `firstName`, `phoneNumber`)
  - PascalCase pour les composants (ex: `ContactForm`, `ContactList`)
- Gestion des états :
  - Utilisation des hooks React (`useState`, `useEffect`)
  - Mise à jour automatique de la liste des contacts
- Validation des données :
  - Nom : non vide et sans caractères spéciaux
  - Numéro de téléphone : exactement 9 chiffres et commençant par 6
- Feedback utilisateur :
  - Affichage de toasts pour les actions réussies/échouées
  - Messages d'erreur explicites pour la validation
- Architecture et code :
  - Séparation des responsabilités (components, services)
  - Code TypeScript typé
  - Responsive design (mobile et desktop)
  - Versionner le code sur GitHub

## Contribution

Pour contribuer au projet :

1. Créez une branche pour votre tâche avec le format : `ft-{nom-de-la-feature}`

   ```bash
   git checkout -b ft-contact-form
   ```

2. Après avoir terminé votre tâche :

   ```bash
   git add .
   git commit -m "feat: description de votre feature"
   git push origin ft-contact-form
   ```

3. Créez une Pull Request vers la branche `dev`
   - Assurez-vous que votre code respecte les conventions
   - Attendez la review des autres membres de l'équipe

## Équipe Frontend

- [HouleyD-oumar](https://github.com/HouleyD-oumar)
- [ibrahim-sempy](https://github.com/ibrahim-sempy)
- [siradio1diallo](https://github.com/siradio1diallo)
- [IDIATOUTOURE](https://github.com/IDIATOUTOURE)
- [Layla023](https://github.com/Layla023)
