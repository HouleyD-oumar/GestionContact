# Guide de Contribution

Merci de votre intérêt pour contribuer à notre projet de gestion de contacts ! Ce document décrit les lignes directrices pour contribuer au projet.

## 🌟 Comment Contribuer

### 1. Configuration Initiale

1. Forker le dépôt
2. Cloner votre fork :

   ```bash
   git clone https://github.com/VOTRE-USERNAME/GestionContact.git
   cd GestionContact
   ```

3. Ajouter le dépôt original comme remote :

   ```bash
   git remote add upstream https://github.com/HouleyD-oumar/GestionContact.git
   ```

### 2. Créer une Branche

Pour chaque nouvelle fonctionnalité ou correction :

```bash
git checkout -b ft-nom-de-la-feature  # pour une nouvelle fonctionnalité
# ou
git checkout -b fix-nom-du-bug        # pour une correction de bug
```

### 3. Standards de Code

#### Style de Code

- Utiliser des noms significatifs pour les variables et fonctions
- Respecter le principe DRY (Don't Repeat Yourself)
- Commenter le code complexe
- Utiliser TypeScript strictement typé

#### Convention de Nommage

- **Variables et Fonctions** : camelCase
  ```typescript
  const userName = "John";
  function getUserData() { }
  ```
- **Composants React** : PascalCase
  ```typescript
  function ContactCard() { }
  ```
- **Fichiers** : PascalCase pour les composants, camelCase pour les utilitaires
  ```
  ContactList.tsx
  validationUtils.ts
  ```

### 4. Tests

- Écrire des tests pour les nouvelles fonctionnalités
- S'assurer que tous les tests passent avant de soumettre une PR
- Vérifier la couverture de code

### 5. Commits

#### Format des Messages de Commit

```
<type>: <description>

[corps optionnel]

[pied de page optionnel]
```

#### Types de Commit

- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Documentation
- `style` : Formatage
- `refactor` : Refactoring du code
- `test` : Tests
- `chore` : Maintenance

#### Exemples

```bash
feat: ajouter la validation du numéro de téléphone
fix: corriger l'affichage des toasts sur mobile
docs: mettre à jour la documentation d'installation
```

### 6. Pull Requests

1. Mettre à jour votre branche :
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Pousser vos changements :
   ```bash
   git push origin ft-nom-de-la-feature
   ```

3. Créer une Pull Request :
   - Titre clair décrivant les changements
   - Description détaillée
   - Screenshots si pertinent
   - Mentionner les issues liées

#### Template de PR

```markdown
## Description
[Description de vos changements]

## Type de Changement
- [ ] 🚀 Nouvelle fonctionnalité
- [ ] 🐛 Correction de bug
- [ ] 📚 Documentation
- [ ] ♻️ Refactoring
- [ ] 🎨 Style
- [ ] ✅ Tests

## Capture d'écran (si applicable)
[Vos captures d'écran]

## Checklist
- [ ] J'ai testé mes changements
- [ ] J'ai mis à jour la documentation
- [ ] Mes changements ne créent pas de nouvelles erreurs/warnings
- [ ] J'ai ajouté des tests si nécessaire

## Issues Liées
Closes #[numéro de l'issue]
```

### 7. Revue de Code

- Répondre aux commentaires de manière constructive
- Faire les modifications demandées rapidement
- Maintenir une discussion professionnelle

## 🚨 Points Importants

1. **Sécurité** :
   - Ne pas commiter de secrets ou clés d'API
   - Signaler les vulnérabilités en privé

2. **Performance** :
   - Optimiser les rendus React
   - Minimiser les appels réseau
   - Suivre les bonnes pratiques de performance

3. **Accessibilité** :
   - Maintenir une navigation au clavier
   - Utiliser des attributs ARIA appropriés
   - Tester avec des lecteurs d'écran

## 📚 Ressources Utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation TypeScript](https://www.typescriptlang.org/docs)
- [Guide des Hooks React](https://reactjs.org/docs/hooks-intro.html)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Code de Conduite

- Être respectueux et inclusif
- Accepter les critiques constructives
- Focaliser sur ce qui est meilleur pour la communauté
- Faire preuve d'empathie envers les autres membres