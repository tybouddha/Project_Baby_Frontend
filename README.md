# Project Baby Frontend

![Project Baby Logo](/assets/images/logo128.png)

## Installation de application avec yarn

1. clone repo
2. yarn install
3. yarn start

## Variables environnementales avec Expo

1. Crée un .env.local
2. dans .env.local utiliser le prefix: `EXPO_PUBLIC_`
   - exemple: `EXPO_PUBLIC_API_URL=http://192.168.100.47:3000`
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
4. Template View
   - children est le nom (syntax) de propertié pour touts les trucs entre le balise `<TemplateView>{children}<TemplateView/>`
   - exemple: DocumentsScreen.js
