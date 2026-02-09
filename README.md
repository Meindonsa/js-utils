# @meindonsa/js-utils

Une librairie TypeScript complète d'utilitaires pour vos projets Angular, Vue et React.

[![npm version](https://img.shields.io/npm/v/@meindonsa/js-utils.svg)](https://www.npmjs.com/package/@meindonsa/js-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📦 Installation

```bash
npm install @meindonsa/js-utils
```

ou avec yarn :

```bash
yarn add @meindonsa/js-utils
```

## ✨ Fonctionnalités

- 🎯 **Tree-shaking** : Importez uniquement ce dont vous avez besoin
- 📘 **TypeScript natif** : Typage complet et IntelliSense
- 🔧 **ESM & CommonJS** : Compatible avec tous les systets de modules
- ✅ **Testé** : Couverture de tests complète
- 📚 **Documentation** : Documentation auto-générée avec TypeDoc
- 🚀 **Zéro dépendance** : Aucune dépendance externe

## 📖 Modules disponibles

### 📁 File (Fichiers)
Utilitaires pour la manipulation de fichiers, images, vidéos et PDFs.

```typescript
import { formatFileSize, isImage, fileToBase64, downloadFile } from '@meindonsa/js-utils/file';

// Formater la taille d'un fichier
formatFileSize(1048576); // '1.00 MB'

// Vérifier le type de fichier
isImage('image/jpeg'); // true

// Convertir un fichier en base64
const base64 = await fileToBase64(file);

// Télécharger un fichier
downloadFile(blob, 'document.pdf');
```

### 📅 Date
Utilitaires pour la manipulation de dates et heures.

```typescript
import { formatDate, addDays, diffInDays, isToday } from '@meindonsa/js-utils/date';

// Formater une date
formatDate(new Date(), 'DD/MM/YYYY'); // '15/01/2024'

// Ajouter des jours
const futureDate = addDays(new Date(), 7);

// Différence en jours
diffInDays(date1, date2); // 5

// Vérifier si c'est aujourd'hui
isToday(new Date()); // true
```

### ✅ Validation
Utilitaires pour la validation de données.

```typescript
import { isValidEmail, validatePassword, isValidUrl } from '@meindonsa/js-utils/validation';

// Valider un email
isValidEmail('user@example.com'); // true

// Valider un mot de passe
const result = validatePassword('MyP@ssw0rd', {
    minLength: 8,
    requireUppercase: true,
    requireNumbers: true
});
// { isValid: true, errors: [] }

// Valider une URL
isValidUrl('https://example.com'); // true
```

### 🎨 Format
Utilitaires pour le formatage de nombres, devises et texte.

```typescript
import { formatCurrency, truncate, toTitleCase, slugify } from '@meindonsa/js-utils/format';

// Formater une devise
formatCurrency(1234.56, 'EUR', 'fr-FR'); // '1 234,56 €'

// Tronquer du texte
truncate('Hello World', 8); // 'Hello...'

// Convertir en Title Case
toTitleCase('hello world'); // 'Hello World'

// Créer un slug
slugify('Hello World!'); // 'hello-world'
```

### 🎲 Random
Utilitaires pour la génération de valeurs aléatoires.

```typescript
import { randomNumeric, randomAlpha, randomAlphanumeric, randomUuid } from '@meindonsa/js-utils/random';

// Générer un code numérique
randomNumeric(6); // '472819'

// Générer du texte alphabétique
randomAlpha(8); // 'jkdfhqlm'

// Générer du texte alphanumérique
randomAlphanumeric(10); // 'a3k9d2h5l7'

// Générer un UUID
randomUuid(); // '550e8400-e29b-41d4-a716-446655440000'
```

### 🔍 Array
Utilitaires pour la recherche et manipulation de tableaux.

```typescript
import { findByProperty, unique, groupBy, sortBy } from '@meindonsa/js-utils/array';

// Rechercher par propriété
const user = findByProperty(users, 'id', 2);

// Supprimer les doublons
unique([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]

// Grouper par propriété
const grouped = groupBy(users, 'role');

// Trier par propriété
const sorted = sortBy(items, 'age', 'desc');
```

## 🎯 Utilisation

### Import global

```typescript
import * as Utils from '@meindonsa/js-utils';

Utils.formatDate(new Date(), 'YYYY-MM-DD');
Utils.isValidEmail('test@example.com');
```

### Import par module (recommandé pour le tree-shaking)

```typescript
import { formatDate, addDays } from '@meindonsa/js-utils/date';
import { isValidEmail } from '@meindonsa/js-utils/validation';
```

### Import avec namespace

```typescript
import { DateUtils, ValidationUtils } from '@meindonsa/js-utils';

DateUtils.formatDate(new Date(), 'YYYY-MM-DD');
ValidationUtils.isValidEmail('test@example.com');
```

## 🔧 Développement

### Installation des dépendances

```bash
npm install
```

### Build

```bash
npm run build
```

### Tests

```bash
# Lancer tous les tests
npm test

# Tests en mode watch
npm run test:watch

# Couverture de code
npm run test:coverage
```

### Documentation

```bash
npm run docs
```

La documentation sera générée dans le dossier `docs/`.

## 📝 Scripts disponibles

- `npm run build` : Compile la librairie (ESM, CJS et types)
- `npm test` : Lance les tests
- `npm run test:watch` : Lance les tests en mode watch
- `npm run test:coverage` : Génère un rapport de couverture
- `npm run docs` : Génère la documentation
- `npm run clean` : Nettoie le dossier dist

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 License

MIT © [Your Name]

## 🔗 Liens

- [Documentation](https://your-docs-url.com)
- [NPM Package](https://www.npmjs.com/package/@meindonsa/js-utils)
- [GitHub](https://github.com/your-username/utils)
- [Issues](https://github.com/your-username/utils/issues)