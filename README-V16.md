# THE EMOTION GAME — REFONTE V16

Refonte de la mise en page de projection à partir de V15, sans remplacer le système de jeu.

## Changements
- Illustrations affichées en entier avec `object-fit: contain` et fond flouté assorti (au lieu de recadrer les visages et les mots).
- Introduction reconstruite : chaque définition et son illustration dans une même carte.
- Capsule reconstruite : deux colonnes équilibrées, illustration complète et texte lisible.
- Titres et contrastes corrigés, marges supérieures augmentées, adaptation aux projecteurs 16:9.
- Missions : suppression des miniatures répétitives qui encombraient la question et la correction.
- Finale : illustration séparée des dialogues et des étapes.
- Nouvelle feuille `public/refonte-v16.css` appliquée après les anciens styles.
- Notes présentateurs, votes, régie et audio hérités de la V15.

## Démarrage
`npm start` puis ouvrir `http://localhost:3000`.

## Important
Les illustrations originales V15 sont des découpes d'un storyboard à résolution limitée et certaines contiennent du texte. Cette version corrige leur **mise en page**, pas leur résolution intrinsèque. Une amélioration supplémentaire nécessiterait des images originales indépendantes en haute résolution, sans texte incrusté.

Tests effectués : `node --check public/app.js`, `node --check server.js`. La commande `npm test` ne contient aucun test automatisé. Le rendu Safari et la projection physique restent à valider.
