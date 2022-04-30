# Gestion des troupes

## Mouvement des troupes
Les troupes des deux camps se déplacent en même temps.

## Déroulement d'un combat
Un combat est une combinaison de zones, de généraux, de troupes et d'ordre. Lors d'un combat un peu y avoir plusieurs attaques.

La première étape est de sélectionner les généraux, maréchaux des deux camps
* Il faut ensuite donner l'ordre de l'attaque (parmi le 9 possibles)
* définir les canons (artillerie) en soutien de l'ordre (donner le nombre de case de distance avec une fonction qui détermine l'atténuation en fonction de la distance (à trouver))
* indiquer le nombre d'unités (troupes + artillerie si attaquées) impliquées de FACE en précisent l'avantage terrain (en donnant le nombre d'unité concernées par l'avantage)
* idem latéral
* idem arrière
**A l'issue on affiche le récapitulatif de l'ordre d'attaque, avec la capacité de modifier**

Après validation on entre les ordres du défenseur
* donner l'ordre
* préciser si il y a un appui de canon (artillerrie)
* indiquer les défenses de FACE (types de troupe) avec éventuellement un avantage terrain (avec le nombre d'unité protégée)
**si ordre de défense il n'y a pas d'ordre de côté ou arrière**
**A l'issue on affiche le récapitulatif de l'ordre d'attaque, avec la capacité de modifier**

On peut ensuite définir une nouvelle attaque dans la même zone de combat (on ne redéfini pas les généraux)
et on recommance


Avant de lancer le calcul on résume les ordres des différentes attaques avec la possiblité de modifier les paramètres.

On affiche le résultat du calcul :
* récapitulatif des bonus d'attaque et de protection
* pour chaque attaque on a un récapitilatif des résultats
  * en bleu les résultats de dés des français
  * en vert pour les russes
  * en noir les bonus obtenus (positions des troupes, mais pas les terrains)
  * en jaune on a le calcul (somme des points fr et ru)

**on doit pouvoir annuler en cas de problème**

Affichage du résultat du combat :
* nouvelle position
* pertes fr ou au-ru

On affiche la deuxième attaque


Synthèse des attaques avec :
* mise à jour des moraux des généraux
* récap des pertes, des points de victoire, et du moral

**le vainqueur moral est celui qui commence le tour suivant**
**on peut modifier les moraux calculés mais généralement sans modification**


Et on recommance



Reste à trouver les méthodes de calcul 



