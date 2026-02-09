# Exemples d'utilisation

## Angular

### app.component.ts

```typescript
import { Component } from '@angular/core';
import { formatDate, addDays } from '@meindonsa/js-utils/utils/date';
import { formatCurrency } from '@meindonsa/js-utils/utils/format';
import { isValidEmail } from '@meindonsa/js-utils/utils/validation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  // Formater une date
  formattedDate = formatDate(new Date(), 'DD/MM/YYYY');

  // Calculer une date future
  futureDate = addDays(new Date(), 30);

  // Formater un prix
  price = formatCurrency(1299.99, 'EUR', 'fr-FR');

  // Valider un formulaire
  validateEmail(email: string): boolean {
    return isValidEmail(email);
  }
}
```

## Vue 3 (Composition API)

### ProductCard.vue

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { formatCurrency } from '@meindonsa/js-utils/utils/format';
import { formatDate } from '@meindonsa/js-utils/utils/date';

interface Props {
  price: number;
  createdAt: Date;
}

const props = defineProps<Props>();

const formattedPrice = computed(() => formatCurrency(props.price, 'EUR', 'fr-FR'));

const formattedDate = computed(() => formatDate(props.createdAt, 'DD/MM/YYYY'));
</script>

<template>
  <div class="product-card">
    <p>Prix: {{ formattedPrice }}</p>
    <p>Créé le: {{ formattedDate }}</p>
  </div>
</template>
```

## React

### UserForm.tsx

```typescript
import React, { useState } from 'react';
import { isValidEmail, validatePassword } from '@meindonsa/js-utils/utils/validation';
import { randomAlphanumeric } from '@meindonsa/js-utils/utils/random';

interface FormData {
  email: string;
  password: string;
}

export const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<string[]>([]);

  const generatePassword = () => {
    const newPassword = randomAlphanumeric(12, { mixedCase: true });
    setFormData(prev => ({ ...prev, password: newPassword }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!isValidEmail(formData.email)) {
      newErrors.push('Email invalide');
    }

    const passwordValidation = validatePassword(formData.password, {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true
    });

    if (!passwordValidation.isValid) {
      newErrors.push(...passwordValidation.errors);
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      // Soumettre le formulaire
      console.log('Form valid!', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        placeholder="Email"
      />

      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
        placeholder="Mot de passe"
      />

      <button type="button" onClick={generatePassword}>
        Générer un mot de passe
      </button>

      {errors.length > 0 && (
        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}

      <button type="submit">Enregistrer</button>
    </form>
  );
};
```

## Exemples de cas d'usage courants

### 1. Upload et validation de fichiers

```typescript
import {
  validateFileSize,
  validateFileType,
  formatFileSize,
  getFileExtension,
} from '@meindonsa/js-utils/utils/file';

function handleFileUpload(file: File) {
  // Vérifier la taille (max 5MB)
  if (!validateFileSize(file, 5)) {
    console.error(`Fichier trop volumineux: ${formatFileSize(file.size)}`);
    return;
  }

  // Vérifier le type
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!validateFileType(file, allowedTypes)) {
    console.error(`Type de fichier non autorisé: ${getFileExtension(file.name)}`);
    return;
  }

  // Fichier valide, procéder à l'upload
  console.log('Fichier valide!');
}
```

### 2. Recherche et filtrage de données

```typescript
import { searchArray, sortBy, paginate } from '@meindonsa/js-utils/utils/array';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [...];

// Rechercher
const searchResults = searchArray(users, 'john', ['name', 'email']);

// Trier
const sortedUsers = sortBy(searchResults, 'name', 'asc');

// Paginer
const page1 = paginate(sortedUsers, 1, 10);
console.log(page1.data); // 10 premiers résultats
console.log(page1.totalPages); // Nombre total de pages
```

### 3. Formatage pour l'affichage

```typescript
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  truncate,
} from '@meindonsa/js-utils/utils/format';

// Dashboard e-commerce
const productCard = {
  price: formatCurrency(1299.99, 'EUR', 'fr-FR'), // '1 299,99 €'
  views: formatNumber(125420), // '125,420'
  conversionRate: formatPercentage(0.0347, 2), // '3.47%'
  description: truncate('Lorem ipsum dolor sit amet...', 50),
};
```

### 4. Génération de codes et tokens

```typescript
import { randomNumeric, randomAlphanumeric, randomUuid } from '@meindonsa/js-utils/utils/random';

// Code de vérification SMS
const smsCode = randomNumeric(6); // '472819'

// Code promo
const promoCode = randomAlphanumeric(8, { uppercase: true }); // 'HJ3K9D2L'

// ID de transaction
const transactionId = randomUuid(); // '550e8400-e29b-41d4-a716-446655440000'
```

### 5. Manipulation de dates

```typescript
import {
  formatDate,
  addDays,
  diffInDays,
  isToday,
  getRelativeTime,
} from '@meindonsa/js-utils/utils/date';

// Calculer une date d'expiration
const expirationDate = addDays(new Date(), 30);
console.log(formatDate(expirationDate, 'DD/MM/YYYY'));

// Jours restants
const daysLeft = diffInDays(expirationDate, new Date());

// Affichage relatif
const commentDate = new Date('2024-01-10');
console.log(getRelativeTime(commentDate)); // '5 days ago'
```

### 6. Validation de formulaire complet

```typescript
import {
  isValidEmail,
  isValidPhone,
  validatePassword,
  isEmpty,
} from '@meindonsa/js-utils/utils/validation';

interface RegistrationForm {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

function validateRegistrationForm(form: RegistrationForm): string[] {
  const errors: string[] = [];

  if (isEmpty(form.email) || !isValidEmail(form.email)) {
    errors.push('Email invalide');
  }

  if (isEmpty(form.phone) || !isValidPhone(form.phone)) {
    errors.push('Numéro de téléphone invalide');
  }

  const passwordCheck = validatePassword(form.password);
  if (!passwordCheck.isValid) {
    errors.push(...passwordCheck.errors);
  }

  if (form.password !== form.confirmPassword) {
    errors.push('Les mots de passe ne correspondent pas');
  }

  return errors;
}
```
