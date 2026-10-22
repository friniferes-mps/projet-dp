# THE EMOTION GAME — ACADEMY V12

## Changements vérifiables
- Correction serveur : la scène `video` est maintenant autorisée.
- Capsule animée française de 75 s : lecture/pause/recommencer dans la projection (ce n’est pas un MP4 ni un TikTok).
- 10 fiches pédagogiques distinctes, avec textes séparés Fares/Mahmoud, méthode, exemple, question et synthèse ; affichage **privé dans la régie**.
- Grande finale « Tribunal des émotions » avec mise en scène animée et guide d’animation privé.
- Fonctionnalités existantes conservées : vote, chrono, sons, projection, classement.

## Démarrage
Node.js 20+ ; `npm start` puis `http://localhost:3000`.

## Test conseillé
Créer une session, ouvrir projection, sélectionner « Capsule 75 s », cliquer « LANCER LA CAPSULE » dans la projection ; tester pause et recommencer. Sélectionner « Quiz » puis vérifier les nouvelles fiches de la régie. Sélectionner « Défi final » et vérifier la mise en scène.

## Limites
La capsule est une animation HTML hors ligne sans voix enregistrée ; lire les textes à voix haute. Les vidéos externes Lumni restent dépendantes de l’accès au site. QR code natif non ajouté. La sécurité des votes reste adaptée à un exercice de classe, pas à un scrutin.
