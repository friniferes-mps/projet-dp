# THE EMOTION GAME — V17

## Changements
- Sélecteur des 10 missions dans la régie avec leurs décryptages existants, interventions de Fares et Mahmoud, méthodes, conseils et questions au public.
- Scène TikTok accessible depuis la régie : tentative d’intégration avec le lecteur officiel TikTok (embed.js), avec bouton d’ouverture externe si l’intégration est refusée.
- Le lecteur dépend d’Internet et des autorisations TikTok. Le lien court n’a pas pu être résolu dans l’environnement de développement ; l’intégration n’est donc **pas garantie**.
- Les fonctionnalités existantes (votes, régie, capsule, score) sont conservées.

## Lancement
`npm start` puis `http://localhost:3000`.

## Important
Pour une intégration TikTok fiable, remplacer le lien court par le lien canonique `https://www.tiktok.com/@compte/video/ID` et utiliser le vrai ID vidéo dans `data-video-id`. Tester le lecteur sur le réseau de l’établissement avant la présentation.
