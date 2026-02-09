# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère à [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2026-01-09

### Ajouté

#### Module File
- `isImage()` - Vérifier si un fichier est une image
- `isVideo()` - Vérifier si un fichier est une vidéo
- `isDocument()` - Vérifier si un fichier est un document
- `getFileType()` - Obtenir le type de fichier
- `formatFileSize()` - Formater la taille d'un fichier
- `getFileExtension()` - Extraire l'extension d'un fichier
- `getFileNameWithoutExtension()` - Obtenir le nom sans extension
- `fileToBase64()` - Convertir un fichier en base64
- `base64ToBlob()` - Convertir base64 en Blob
- `downloadFile()` - Télécharger un fichier
- `validateFileSize()` - Valider la taille d'un fichier
- `validateFileType()` - Valider le type de fichier

#### Module Date
- `formatDate()` - Formater une date
- `addDays()` - Ajouter des jours à une date
- `addMonths()` - Ajouter des mois à une date
- `addYears()` - Ajouter des années à une date
- `diffInDays()` - Différence en jours entre deux dates
- `diffInHours()` - Différence en heures
- `diffInMinutes()` - Différence en minutes
- `isToday()` - Vérifier si c'est aujourd'hui
- `isYesterday()` - Vérifier si c'est hier
- `isTomorrow()` - Vérifier si c'est demain
- `isLeapYear()` - Vérifier si année bissextile
- `startOfDay()` - Début de la journée
- `endOfDay()` - Fin de la journée
- `startOfMonth()` - Début du mois
- `endOfMonth()` - Fin du mois
- `isBetween()` - Vérifier si une date est dans un intervalle
- `getRelativeTime()` - Obtenir le temps relatif

#### Module Validation
- `isValidEmail()` - Valider un email
- `isValidUrl()` - Valider une URL
- `isValidPhone()` - Valider un numéro de téléphone
- `isValidCreditCard()` - Valider une carte de crédit (Luhn)
- `validatePassword()` - Valider un mot de passe
- `isNumeric()` - Vérifier si numérique
- `isAlpha()` - Vérifier si alphabétique
- `isAlphanumeric()` - Vérifier si alphanumérique
- `isEmpty()` - Vérifier si vide
- `isInRange()` - Vérifier si dans un intervalle
- `matchesPattern()` - Vérifier si correspond à un pattern
- `isValidDate()` - Valider une date
- `isValidJson()` - Valider du JSON
- `isValidHexColor()` - Valider une couleur hexadécimale
- `isValidIpv4()` - Valider une adresse IPv4
- `isValidUsername()` - Valider un nom d'utilisateur

#### Module Format
- `formatNumber()` - Formater un nombre
- `formatCurrency()` - Formater une devise
- `formatPercentage()` - Formater un pourcentage
- `formatDecimal()` - Formater avec décimales
- `truncate()` - Tronquer du texte
- `toTitleCase()` - Convertir en Title Case
- `toCamelCase()` - Convertir en camelCase
- `toSnakeCase()` - Convertir en snake_case
- `toKebabCase()` - Convertir en kebab-case
- `capitalize()` - Capitaliser
- `removeAccents()` - Supprimer les accents
- `slugify()` - Créer un slug
- `pad()` - Ajouter du padding
- `mask()` - Masquer des données sensibles
- `formatPhone()` - Formater un numéro de téléphone
- `formatCreditCard()` - Formater un numéro de carte
- `escapeHtml()` - Échapper HTML
- `unescapeHtml()` - Dé-échapper HTML

#### Module Random
- `randomNumber()` - Nombre aléatoire
- `randomInt()` - Entier aléatoire
- `randomFloat()` - Nombre décimal aléatoire
- `randomBoolean()` - Booléen aléatoire
- `randomNumeric()` - Chaîne numérique aléatoire
- `randomAlpha()` - Chaîne alphabétique aléatoire
- `randomAlphanumeric()` - Chaîne alphanumérique aléatoire
- `randomString()` - Chaîne aléatoire personnalisée
- `randomHexColor()` - Couleur hexadécimale aléatoire
- `randomUuid()` - UUID v4 aléatoire
- `randomElement()` - Élément aléatoire d'un tableau
- `randomElements()` - Plusieurs éléments aléatoires
- `shuffle()` - Mélanger un tableau
- `randomPassword()` - Mot de passe aléatoire
- `randomDate()` - Date aléatoire
- `randomIpAddress()` - Adresse IP aléatoire
- `randomMacAddress()` - Adresse MAC aléatoire

#### Module Array
- `findByProperty()` - Trouver par propriété
- `findAllByProperty()` - Trouver tous par propriété
- `findIndexByProperty()` - Trouver l'index par propriété
- `searchArray()` - Rechercher dans un tableau
- `unique()` - Supprimer les doublons
- `uniqueByProperty()` - Supprimer doublons par propriété
- `groupBy()` - Grouper par propriété
- `sortBy()` - Trier par propriété
- `chunk()` - Découper en morceaux
- `flatten()` - Aplatir un tableau
- `intersection()` - Intersection de tableaux
- `difference()` - Différence de tableaux
- `union()` - Union de tableaux
- `sum()` - Somme des éléments
- `average()` - Moyenne des éléments
- `min()` - Minimum
- `max()` - Maximum
- `range()` - Intervalle (min/max)
- `paginate()` - Paginer un tableau
- `shuffleArray()` - Mélanger un tableau
- `sample()` - Échantillon aléatoire
- `countOccurrences()` - Compter les occurrences
- `isEqual()` - Vérifier l'égalité
- `rotate()` - Rotation d'éléments

### Infrastructure
- Support ESM et CommonJS
- Tree-shaking optimisé
- Tests unitaires avec Jest
- Documentation avec TypeDoc
- CI/CD configuré
- Couverture de tests à 80%

## [Unreleased]

### Prévu
- Module String dédié
- Module Object pour manipulation d'objets
- Module URL pour parsing et manipulation
- Fonctions de debounce/throttle
- Utilitaires de cryptographie basique