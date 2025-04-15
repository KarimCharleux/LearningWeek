# Learning Week Air France

Application de gestion des événements pour la Learning Week d'Air France, développée avec Angular et TailwindCSS.

## Fonctionnalités

- Affichage des événements par jour/semaine
- Filtrage par type d'activité, département et lieu
- Inscription/désinscription aux événements
- Affichage des événements auxquels l'utilisateur est inscrit
- Recommandations personnalisées
- Interface responsive aux couleurs d'Air France

## Structure du projet

- **Composants**:
  - `NavbarComponent`: Barre de navigation
  - `HeaderComponent`: En-tête de l'application
  - `CalendarComponent`: Vue principale des événements
  - `EventCardComponent`: Affichage d'un événement individuel
  - `MyBookingsComponent`: Liste des réservations de l'utilisateur
  - `RecommendedComponent`: Événements recommandés
  - `FooterComponent`: Pied de page avec informations

- **Services**:
  - `EventService`: Gestion des événements et réservations

- **Modèles**:
  - `Event`: Structure des données d'un événement
  - Énumérations pour les types d'événements et départements

## Technologies utilisées

- Angular 17
- TailwindCSS
- Angular Material
- TypeScript

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/KarimCharleux/LearningWeek.git

# Accéder au répertoire
cd LearningWeek

# Installer les dépendances
npm install

# Lancer l'application en mode développement
ng serve
```

## Captures d'écran

![Aperçu de l'application](src/assets/screenshot.png)

## Développement futur

- Authentification des utilisateurs
- Notifications pour les rappels d'événements
- Système de notation des événements passés
- Intégration avec des calendriers externes (Google Calendar, Outlook)
- Fonctionnalités sociales pour partager des événements

## Licence

Développé pour Air France - Tous droits réservés
