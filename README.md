<div align="center">

# 📋 Kanban Board API

### API REST sécurisée pour la gestion d'un tableau Kanban

Développée avec **NestJS**, **TypeScript**, **PostgreSQL** et **Prisma**

<br>

![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

<br>

**Backend • REST API • Authentication • Ownership • Tests • Documentation**

</div>

---

## 📖 Présentation

**Kanban Board API** est une API REST permettant à plusieurs utilisateurs de gérer leurs propres tableaux Kanban.

Chaque utilisateur peut s'inscrire, se connecter, créer des listes et gérer les cartes contenues dans ses listes.

L'API applique également des règles de sécurité afin qu'un utilisateur ne puisse pas consulter, modifier ou supprimer les ressources appartenant à un autre utilisateur.

Le projet a été réalisé avec **NestJS** et une base de données **PostgreSQL**, manipulée avec **Prisma ORM**.

---

## ✨ Fonctionnalités

### 👤 Utilisateurs

- Création d'un compte
- Authentification par email et mot de passe
- Consultation de son profil
- Modification des informations utilisateur
- Gestion des rôles `USER` et `ADMIN`
- Protection des mots de passe

### 📑 Listes

- Afficher ses listes
- Créer une liste
- Modifier une liste
- Modifier sa position
- Supprimer une liste
- Protection des listes par propriétaire

### 🗂️ Cartes

- Créer une carte dans une liste
- Afficher les cartes d'une liste
- Afficher une carte
- Modifier une carte
- Modifier sa position
- Déplacer une carte vers une autre liste
- Supprimer une carte
- Protection des cartes par propriétaire

### 🔐 Sécurité

- Authentification JWT
- Mots de passe hachés avec Argon2
- Routes protégées par un Guard
- Vérification de l'ownership
- Gestion des rôles
- Validation des données entrantes
- Mot de passe jamais retourné dans les réponses API

---

## 🏗️ Architecture

Le projet suit l'architecture modulaire de NestJS.

```text
Client
  │
  │ HTTP Request
  ▼
Controller
  │
  ▼
Service
  │
  ▼
Prisma ORM
  │
  ▼
PostgreSQL
```

Chaque module sépare les responsabilités entre les contrôleurs, les services et l'accès aux données.

---

## 📁 Structure du projet

```text
veille-techno-backend/
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   ├── guards/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   │
│   ├── users/
│   ├── lists/
│   ├── cards/
│   ├── prisma/
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── test/
│   └── app.e2e-spec.ts
│
├── package.json
├── prisma7.config.ts
└── README.md
```

---

## 🛠️ Technologies utilisées

| Technologie | Utilisation |
|---|---|
| Node.js | Environnement d'exécution JavaScript |
| TypeScript | Langage principal |
| NestJS | Framework backend |
| PostgreSQL | Base de données relationnelle |
| Prisma | ORM et migrations |
| JWT | Authentification |
| Argon2 | Hachage des mots de passe |
| Swagger / OpenAPI | Documentation de l'API |
| Jest | Tests automatisés |
| class-validator | Validation des DTO |

---

# 🚀 Installation

## 1. Cloner le projet

```bash
git clone https://github.com/FallouGAYE/veille-techno-backend.git
```

Puis :

```bash
cd veille-techno-backend
```

---

## 2. Installer les dépendances

```bash
npm install
```

---

## 3. Configurer PostgreSQL

Le projet utilise une base PostgreSQL.

Créer une base de données dédiée au projet puis configurer les informations de connexion dans le fichier `.env`.

---

## 4. Variables d'environnement

Créer un fichier :

```text
.env
```

Exemple :

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/kanban_db"

JWT_SECRET="change-this-secret"

JWT_EXPIRES_IN="1h"
```



Le JWT généré lors de la connexion possède une durée de validité d'environ **1 heure**.

---

## 🗄️ Base de données

### Générer Prisma Client

```bash
npx prisma generate
```

### Appliquer les migrations

```bash
npx prisma migrate dev
```

La base contient trois modèles principaux :

```text
User
 │
 └── List
      │
      └── Card
```

Une `List` appartient à un `User` grâce à `ownerId`.

Une `Card` appartient à une `List` grâce à `listId`.

La propriété d'une carte est donc déterminée par le propriétaire de sa liste.

---

# 🌱 Fixtures / Seed

Le projet contient un script permettant de créer automatiquement des données de démonstration.

```bash
npm run seed
```

Le seed crée notamment deux utilisateurs distincts avec leurs propres listes et cartes.

```text
User One
 └── User One List
      └── User One Card

User Two
 └── User Two List
      └── User Two Card
```

Ces données permettent notamment de vérifier les règles d'ownership.

Par exemple :

```text
User One → User One List
Résultat : autorisé

User One → User Two List
Résultat : 403 Forbidden
```

Les mots de passe créés par le seed sont également hachés avec **Argon2**.

---

# 🔐 Authentification

L'API utilise des **JSON Web Tokens (JWT)**.

Après une connexion réussie :

```http
POST /api/auth/login
```

l'API retourne :

```json
{
  "accessToken": "..."
}
```

Le token doit ensuite être envoyé dans les routes protégées :

```http
Authorization: Bearer <accessToken>
```

Le JWT contient notamment l'identifiant de l'utilisateur (`sub`) et une date d'expiration.

---

# 🛡️ Ownership

Une partie importante de la sécurité de l'application repose sur la notion d'**ownership**.

Chaque liste possède :

```text
ownerId
```

qui correspond à l'utilisateur qui l'a créée.

Un utilisateur peut donc modifier ou supprimer uniquement ses propres listes.

Les cartes héritent du propriétaire de leur liste.

Lors du déplacement d'une carte, l'application vérifie également que la liste de destination appartient au même utilisateur.

### Exemple

```text
Utilisateur A
 └── Liste A

Utilisateur B
 └── Liste B
```

Si l'utilisateur A tente de modifier la liste B :

```http
403 Forbidden
```

---

# ⚠️ Gestion des erreurs

L'API utilise les principaux codes HTTP suivants :

| Code | Signification | Exemple |
|---:|---|---|
| `200` | Requête réussie | connexion, lecture, modification |
| `201` | Ressource créée | utilisateur, liste ou carte |
| `204` | Suppression réussie | suppression liste/carte |
| `400` | Requête invalide | données incorrectes |
| `401` | Non authentifié | JWT absent ou invalide |
| `403` | Action interdite | ressource d'un autre utilisateur |
| `404` | Ressource inexistante | liste/carte introuvable |
| `409` | Conflit | email déjà utilisé |

### Différence entre 401 et 403

`401 Unauthorized` signifie que l'utilisateur n'est pas correctement authentifié.

`403 Forbidden` signifie que l'utilisateur est authentifié mais n'a pas le droit d'effectuer l'action demandée.

### Choix entre 403 et 404

Dans cette implémentation, lorsqu'une ressource existe mais appartient à un autre utilisateur, l'API retourne explicitement :

```http
403 Forbidden
```

Lorsqu'une ressource n'existe pas :

```http
404 Not Found
```

Ce choix permet de distinguer clairement une ressource inexistante d'un problème d'autorisation.

---

# 🗑️ Suppression en cascade

Les relations Prisma utilisent :

```prisma
onDelete: Cascade
```

Lorsqu'une liste est supprimée, les cartes associées à cette liste sont également supprimées automatiquement.

De même, la relation entre un utilisateur et ses listes utilise une suppression en cascade au niveau du schéma Prisma.

Cela évite de conserver des cartes orphelines dans la base de données.

---

# 📡 Routes principales

## Authentication

| Méthode | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Non | Créer un compte |
| POST | `/api/auth/login` | Non | Se connecter |

## Users

| Méthode | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/users/me` | Oui | Profil courant |
| PATCH | `/api/users/:id` | Oui | Modifier un utilisateur |

## Lists

| Méthode | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/lists` | Oui | Mes listes |
| POST | `/api/lists` | Oui | Créer une liste |
| PATCH | `/api/lists/:id` | Oui | Modifier une liste |
| DELETE | `/api/lists/:id` | Oui | Supprimer une liste |

## Cards

| Méthode | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/lists/:listId/cards` | Oui | Cartes d'une liste |
| POST | `/api/lists/:listId/cards` | Oui | Créer une carte |
| GET | `/api/cards/:id` | Oui | Afficher une carte |
| PATCH | `/api/cards/:id` | Oui | Modifier/déplacer une carte |
| DELETE | `/api/cards/:id` | Oui | Supprimer une carte |

---

# 📚 Documentation Swagger

Une documentation interactive de l'API est générée avec Swagger.

Démarrer l'application :

```bash
npm run start:dev
```

Puis ouvrir :

```text
http://localhost:3000/api
```

Swagger permet :

- de consulter toutes les routes ;
- de voir les paramètres et DTO ;
- de consulter les réponses HTTP ;
- de tester les endpoints ;
- d'utiliser un JWT avec le bouton **Authorize**.

---

# 🧪 Tests

Le projet utilise **Jest**.

### Tests unitaires

```bash
npm test
```

État actuel du projet :

```text
Test Suites : 11 passed / 11
Tests       : 75 passed / 75
```

### Couverture

```bash
npm run test:cov
```

Résultats obtenus :

```text
Statements : 81.67 %
Branches   : 95.94 %
Functions  : 95.45 %
Lines      : 83.56 %
```

La couverture globale dépasse donc **80 %**.

---

# ▶️ Lancer le projet

Mode développement :

```bash
npm run start:dev
```

Mode classique :

```bash
npm run start
```

Compiler :

```bash
npm run build
```

Mode production après compilation :

```bash
npm run start:prod
```

---

# 🔄 Fonctionnement général

```text
              ┌──────────────────┐
              │      Client      │
              └────────┬─────────┘
                       │ HTTP
                       ▼
              ┌──────────────────┐
              │   Controllers    │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │     Services     │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │      Prisma      │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   PostgreSQL     │
              └──────────────────┘
```

---

# 👨‍💻 Auteur

**Fallou GAYE**

Développement Backend / Full Stack / DevOps

GitHub : `FallouGAYE`

---

<div align="center">

### Kanban Board API

**NestJS • PostgreSQL • Prisma • JWT • Swagger • Jest**

Projet réalisé dans le cadre de la formation **Mastère Développement & DevOps**.

</div>
