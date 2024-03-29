# Coin Count

## Introduction
Coin Count est une plateforme web avancée conçue pour les passionnés de cryptomonnaies. Elle offre une expérience engageante et intuitive pour surveilxler et analyser les cryptomonnaies, s'adressant à la fois aux débutants et aux experts du domaine.

## Technologies
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-003A70?style=for-the-badge)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

## Fonctionnalités
### Gestion des Utilisateurs
Coin Count offre trois niveaux d'accès distincts, chacun avec des fonctionnalités spécifiques :
- Accès Anonyme : Accès aux tendances des cryptomonnaies les plus populaires et aux derniers articles.
- Accès Utilisateur Enregistré :
  - Création de compte personnel.
  - Options d'authentification : email/mot de passe ou OAuth2.
  - Liste de cryptomonnaies personnalisable et fil d'actualités.
  - Personnalisation du profil.
- Accès Administrateur :
  - Gérer les paramètres globaux de l'application.
  - Curater la liste des cryptomonnaies et les sources d'actualités.
  - Accéder à des analyses d'utilisateurs complètes.
- Données sur les Cryptomonnaies
  - Données crypto provenant de services tiers fiables.
  - API backend pour une gestion polyvalente des cryptomonnaies.

## Pour Commencer

### Prérequis
- [Docker](https://docs.docker.com/engine/install/)

### Installation
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/MokhtarBeny/CoinCount.git
   ```
2. Exécuter Docker Compose :

   ```bash
   docker-compose up
   ```
Cette commande construira et démarrera l'application Coin Count. La configuration Docker Compose garantit que les services frontend et backend sont configurés et lancés correctement.

### Utilisation

Une fois le processus Docker Compose terminé, Coin Count sera opérationnel. Vous pouvez accéder à la plateforme via votre navigateur web :

    Frontend : http://localhost:3000 
    Backend : http://localhost:5036 

Explorez les fonctionnalités de la plateforme en fonction de votre niveau d'accès :
- Les utilisateurs anonymes peuvent voir les cryptomonnaies populaires et les articles récents.
- Les utilisateurs enregistrés ont des capacités supplémentaires telles que la personnalisation de leur liste de cryptomonnaies et l'accès à des tendances détaillées.
- Les administrateurs peuvent gérer les paramètres de l'application, les niveaux d'accès des utilisateurs et les sources de contenu.

### CI/CD

Notre projet utilise GitHub Actions pour l'intégration continue et le déploiement, garantissant

 que chaque commit passe par des tests automatisés. Ce processus aide à maintenir la qualité et la fiabilité de la plateforme Coin Count.
Licence

## Tests

### Exécuter les Tests
Pour assurer la fiabilité et la stabilité de Coin Count, nous avons mis en place des tests en utilisant le framework Jest. Les tests sont une partie intégrale de notre processus de développement, et nous encourageons les contributeurs à exécuter les tests avant de soumettre des demandes de tirage.

### Comment Exécuter les Tests
Les tests peuvent être facilement exécutés pour le frontend et le backend. Voici comment vous pouvez faire :

- **Tests Backend** :
  1. Naviguez vers le dossier backend :
     ```bash
     cd backend
     ```
  2. Exécutez les tests avec la commande suivante :
     ```bash
     npm run test
     ```

- **Tests Frontend** :
  1. Naviguez vers le dossier frontend :
     ```bash
     cd frontend
     ```
  2. Exécutez les tests avec :
     ```bash
     npm run test
     ```

Ces commandes exécuteront les tests configurés pour chaque partie du projet. Il est important de s'assurer que tous les tests passent avec succès pour maintenir la qualité et la fonctionnalité de Coin Count.
