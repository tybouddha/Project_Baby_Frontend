# Project Baby Frontend

![Project Baby Logo](/assets/images/logo128.png)

## Description

Project Baby est une application qui rassemblera une feuille de route des rendez-vous médicaux, un calendrier avec un agenda connecté afin de créer des rappels et un carnet pour noter les informations concernant l’enfant allant du début de grossesse jusqu’au 2ème anniversaire de l’enfant ainsi que des informations afin de rassurer les “jeunes” parents durant cette aventure...

## Installation

Suivez les étapes ci-dessous pour installer et configurer ce projet en local.

1. Clonez le dépôt :  
   Clonez le dépôt GitHub en utilisant la commande suivante :

```bash
git clone https://github.com/tybouddha/Project_Baby_Frontend.git
```

2. Installez les dépendances :
   Assurez-vous que toutes les dépendances du projet sont installées en exécutant la commande suivante : `yarn install`
3. Lancez le appli :
   Pour démarrer l’application en mode de développement, utilisez la commande suivante : `yarn start`

## Variables environnementales avec Expo

1. Crée un .env.local
2. dans .env.local utiliser le prefix: `EXPO_PUBLIC_`
   - exemple: `EXPO_PUBLIC_API_URL=http://<votre_IP_address_local>:3000`
3. Pour l'utilser: `process.env.EXPO_PUBLIC_API_URL`

- "The Expo CLI will automatically load environment variables with an EXPO*PUBLIC* prefix from .env files"
- source: [https://docs.expo.dev/guides/environment-variables/](https://docs.expo.dev/guides/environment-variables/)

## Git command

- créer un branch: ` git branch [nom_de_branch]`
- voir touts les branch: `git branch`
- pull branch direct `git pull origin [nom_de_branch]`
- suppreimer branch `git branch -d [nom_de_branch]`

## Installation de Navigation

le depart de ce projet est `npx create-expo-app@latest --template`

1. Navigation

```bash
yarn add @react-navigation/native@6
expo install react-native-screens react-native-safe-area-context
```

Stack navigation:
`yarn add @react-navigation/native-stack@6`
Tab navigation:
`yarn add @react-navigation/bottom-tabs@6`

2. FontAwesome
   `yarn add @fortawesome/react-native-fontawesome @fortawesome/fontawesome-svg-core react-native-svg`
   `yarn add @fortawesome/free-solid-svg-icons`

## Autres références de code

1. [Header](./docs/Header.md)
2. [Police](./docs/Police.md)
3. [AutresDetails](./docs/AutresDetails.md)

4. Les templates
   1. TemplateView
      - children est le nom (syntax) de propertié pour touts les trucs entre le balise `<TemplateView>{children}<TemplateView/>`
      - exemple: DocumentsScreen.js, CarenetBebeScreen.js
   2. TemplateViewNoNav
      - Les Propétiés:
        - navigation (navigation Object )
        - cacheProfilevwProfil (Boolean, true => cache le profil icon)
        - afficherArriére (Boolean, true => ajouter une flesh pour aller au derniér écran)
      - children est le nom (syntax) de propertié pour touts les trucs entre le balise `<TemplateViewNoNav>{children}<TemplateViewNoNav/>`
      - ce template n'ai pas de profil icon et peux avoir une flesh pour aller au dernieres écran.
      - exemple: CreerProjet.js, WelcomScreen.js

## Recherche infos bebé
