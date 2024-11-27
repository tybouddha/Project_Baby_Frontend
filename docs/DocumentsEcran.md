# DocumentScreen.js: useFocusEffect & useCallback()

Lorsqu’un utilisateur décide d’ajouter un document, une modal s’affiche. Cette modal propose à l’utilisateur une option pour ajouter une photo. Si l’utilisateur choisit d’ajouter une photo, il est ensuite redirigé vers un écran de caméra qui ne fait pas partie de la pile de navigation de la barre de navigation par onglets. Afin de sauvegarder les informations que l’utilisateur aurait pu saisir dans la modal, nous utilisons Redux pour stocker ces données. C’est ce qu’on appelle le “documents redux” (reducers/document.js).

Après que l’utilisateur a terminé avec l’écran de caméra et revient sur l’écran Documents, nous avons utilisé Redux pour nous assurer que la modal reste ouverte. Et si elle s’était fermée, Redux contenait un booléen permettant de rouvrir la modal.

Dans la modal, nous avons utilisé le composant VwAjouterDocument.js, qui utilise le hook useFocusEffect. Ce hook est activé lorsque la modal est en focus. Il permet de préremplir les champs avec les informations précédemment saisies par l’utilisateur (et stocker dans le document redux).

Lorsque l’utilisateur soumet ou ferme la modal, les valeurs du “documents redux” sont réinitialisées à null (la propriété “modalOuvert” est mise à false).
