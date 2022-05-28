# Rétro-ingénierie

Ce document consolide les éléments constituant le logiciel WAO à partir de l'analyse du code. Il a pour ambition de permettre une réécriture du logiciel dans un langage moderne supporté par les terminaux actuels.

## Variables globales
Variables définies dans le fichier `Modmain.bas`

```basic
Global jeu As Integer ' n° des bataille: 1= F = Austerlitz, 2=E = Eylau
                      ' 3=W = Wagram, 4=L = Leipzig, 5=A = Waterloo
Global a As Byte ' a : 1= AMI (Français) 0= Ennemi
Global temp As Integer 'climat Eylau ou saxon
Global Const VMU = 4, VMP = 5  'Valeur moyenne des unités,  valeur morale des pertes
Global ATTEN1, ATTEN2 As Single ' atténuation des pertes

Global Q(1, 20, 3, 30) As Single 'Nombre de chaque type d'unités par combat
Global L(1, 20) As Single 'Avantage des Lieux par  combat :
Global O(1, 20) As Integer 'Ordre pour le combat c
Global B(1, 20) As Single 'Force du Bombardement par combat
Global V(1, 20) As Single 'total des forces dans un combat
Global CAR(1, 20) As Byte ' 1= mise en carré, 0 = non

Global VL(12) As Single, QL(1, 20, 12) As Single 'valeur , nombre dans le lieux par combat
Global de!(1, 30), du!(1, 30), au!(1, 30), VU!(1, 30) 'Dés, bonus et valeur de chaque unité
Global db!(1, 11), QB!(1, 20, 11) 'Dés par type de batterie ,nombre de dés par combat
Global tu!(1, 30), gu!(1, 30) ' Type des unités ,groupe d'unités
Global UN$(1, 30), BN$(1, 11), GN$(1, 14), OO$(1, 9) ' Noms des unités, des batteries, Ordres
Global CNa$, CNe$, CN$(20), LN$(12), TN$(16) 'Noms des Combats, des Lieux,  types de combats
Global NN$, VVN$, GVN$, PVN$, VSON As Integer 'Noms Nation, victoires, gde victoire, son victoire

Global MG!(1, 14), MZ!(1) 'moral des généraux, moral moyen par zone
Global ZG(1, 14) As Byte ' Généraux commandant une zone
Global Tour% ' N° de tour

Global com As Integer, QC As Integer  'N° du combat en cours et nombre total

Global FC!(1), PC!(1), LR!(1) 'Par combat: Feu, Perte, Limite rupture,tir des batteries
Global SW!, SP!(1) 'Aprés combat: total  perte, victoire
Global SWA!, SWE!, SPA!, SPE!, rr!  ' total des victoires, des pertes,resultats

Global xperte$, Ref As Integer  'drapeau combat refait
Global drap As Byte, drap2 As Byte, drap3 As Byte, drapt As Byte ' drapeau-marque
Global PAS, dep(1, 6), durée, Tactuel, Tdepart As Integer 'Pas, Déplacement , durée
```

Affectation de variables `a = 1: ATTEN1 = 0.75: ATTEN2 = 0.75`.


## Gestion des troupes
Les troupes sont propres à chaque bataille. Elles sont définies par un nom, un nombre de dé et des valeurs de bonus.

Les différents composants : Unités (`$UN`), Bataillons (`$BN`), Généraux (`$GN`) et Ordres (`$OO`) sont stockés dans des tableaux à 2 dimensions.

``` basic
Global UN$(1, 40), BN$(1, 11), GN$(1, 14), OO$(1, 9) ' Noms des unités, des batteries, Ordres
```

Des types de généraux (`$gu`) et des types d'unités (`$tu`) sont définis dans des tableaux à 2 dimensions.

```basic
Global tu(1, 40), gu(1, 40) As Single ' Type des unités, type de général
```

``` text
Les généraux n'ont pas de caractéristique. Seul leur nom est enregistré.
```

Les batteries sont caractérisées par un nombre de dés par batterie (`$db`) et un nombre de dés par combat (`$QB`).

```basic
Global db(1, 11), QB(1, 20, 11) As Single 'Dés par type de batterie ,nombre de dés par combat
```

#### TODO
Les propriétés `de`, `du`, `au` et `tu` sont représentées par des entiers, mais il n'y a pas de table de corresondance.

**Le fichier `ficheAUS.txt` semble contenir les valeurs des différentes troupes. Ce fichier est chargé par le formulaire `FIntro1.frm`.**

Il n'y a pas de tableaux des ordres.

## Austerlitz

### Troupes françaises

```basic
UN$(1, 0) = ""
UN$(1, 1) = ""
UN$(1, 2) = "régiment(s) d'infanterie affaiblie. ": de(1, 2) = 1: du(1, 2) = 0: au(1, 2) = 0: tu(1, 2) = 6
UN$(1, 3) = "régiment(s) d'infanterie lègère... ": de(1, 3) = 1: du(1, 3) = 1: au(1, 3) = 1: tu(1, 3) = 6
UN$(1, 4) = "régiment(s) d'infanterie de Ligne. ": de(1, 4) = 1: du(1, 4) = 2: au(1, 4) = 2: tu(1, 4) = 6
UN$(1, 5) = "régiment(s) de Grenadiers ........ ": de(1, 5) = 1: du(1, 5) = 3: au(1, 5) = 3: tu(1, 5) = 6
UN$(1, 6) = "Brigade légère avec Legrand.....": de(1, 6) = 2: du(1, 6) = 3: au(1, 6) = 3: tu(1, 6) = 6.5
UN$(1, 7) = "Brigade de Ligne avec Général.....": de(1, 7) = 2: du(1, 7) = 5: au(1, 7) = 5: tu(1, 7) = 6.5
UN$(1, 8) = "Brigade de Grenadiers avec Duroc .": de(1, 8) = 2: du(1, 8) = 7: au(1, 8) = 7: tu(1, 8) = 6.5
UN$(1, 9) = "Vieille Garde avec Bessière....": de(1, 9) = 2: du(1, 9) = 7: au(1, 9) = 7: tu(1, 9) = 6.5
UN$(1, 10) = ""
UN$(1, 11) = "division(s) de cavalerie affaiblie.": de(1, 11) = 2: du(1, 11) = 0: au(1, 11) = 0: tu(1, 11) = 12
UN$(1, 12) = "division(s) de hussards .": de(1, 12) = 2: du(1, 12) = 0.5: au(1, 12) = 2: tu(1, 12) = 12
UN$(1, 13) = "division(s) de chasseurs .": de(1, 13) = 2: du(1, 13) = 0.5: au(1, 13) = 2: tu(1, 13) = 12
UN$(1, 14) = "division(s) de dragons ...": de(1, 14) = 2: du(1, 14) = 1: au(1, 14) = 4: tu(1, 14) = 12
UN$(1, 15) = "division(s) de cuirassiers .": de(1, 15) = 2: du(1, 15) = 1: au(1, 15) = 4: tu(1, 15) = 12
UN$(1, 16) = "Div. de dragons de Walter  .": de(1, 16) = 2: du(1, 16) = 2: au(1, 16) = 5: tu(1, 16) = 12.5
UN$(1, 17) = "Grenadiers à cheval ,": de(1, 17) = 2: du(1, 17) = 2: au(1, 17) = 5: tu(1, 17) = 12
UN$(1, 18) = "Cuirassiers avec MURAT ,": de(1, 18) = 2.5: du(1, 18) = 2.5: au(1, 18) = 5: tu(1, 18) = 11.5
UN$(1, 19) = ""
UN$(1, 20) = "batterie d'artillerie légère.": de(1, 20) = 2.5: du(1, 20) = 2.5: au(1, 20) = 2.5: tu(1, 20) = 1
UN$(1, 21) = "batterie d'artillerie Lourde.": de(1, 21) = 5: du(1, 21) = 5: au(1, 21) = 5: tu(1, 21) = 2
UN$(1, 22) = ""
UN$(1, 23) = "Quartier Général ": de(1, 23) = 0: du(1, 23) = 1: au(1, 23) = 1: tu(1, 23) = 11
UN$(1, 24) = ""
UN$(1, 25) = ""
```

### Artillerie française

```basic
BN$(1, 0) = "1ere Batterie légère .": db(1, 0) = 2.5: 
BN$(1, 1) = "2eme Batterie légère .": db(1, 1) = 2.5
BN$(1, 2) = "Batterie légère réduite .": db(1, 2) = 1.3: 
BN$(1, 3) = "": db(1, 3) = 0
BN$(1, 4) = "1ere Batterie Lourde .": db(1, 4) = 5: 
BN$(1, 5) = "2eme Batterie Lourde .": db(1, 5) = 5
BN$(1, 6) = "Batterie Lourde réduite .": db(1, 6) = 2.5: 
BN$(1, 7) = "": db(1, 7) = 0
```

### Généraux français

```basic
GN$(1, 0) = "NAPOLEON 1er":
GN$(1, 1) = "BERNADOTE":
GN$(1, 2) = "DAVOUT"
GN$(1, 3) = "SOULT": 
GN$(1, 4) = "LANNES": 
GN$(1, 5) = "MURAT": 
'GN$(1, 6) = "Autre"
```

### Troupes austro-russes

```basic
UN$(0, 0) = ""
UN$(0, 1) = "schwächregiment (rég. affaibli).... ": de(0, 1) = 1: du(0, 1) = 0: au(0, 1) = 0: tu(0, 1) = 6
UN$(0, 2) = "landwerregiment(en) (milice)....... ": de(0, 2) = 1: du(0, 2) = 0.5: au(0, 2) = 0.5: tu(0, 2) = 6
UN$(0, 3) = "iéguerski (regiment de chasseurs).. ": de(0, 3) = 1: du(0, 3) = 1: au(0, 3) = 1: tu(0, 3) = 6
UN$(0, 4) = "piéchoti (rég. de mousquetaires)... ": de(0, 4) = 1: du(0, 4) = 1.5: au(0, 4) = 2: tu(0, 4) = 6
UN$(0, 5) = "grenadierregiment(en).............. ": de(0, 5) = 1: du(0, 5) = 2: au(0, 5) = 1.5: tu(0, 5) = 6
UN$(0, 6) = "piérota Proviti (reg. de la garde). ": de(0, 6) = 1: du(0, 6) = 2.5: au(0, 6) = 2.5: tu(0, 6) = 6
UN$(0, 7) = "Jägerbrigade mit gl. Kienmayer...": de(0, 7) = 2: du(0, 7) = 3: au(0, 7) = 3: tu(0, 7) = 6.5
UN$(0, 8) = "Piéchoti y Vojd (Mousq. , Général ) ": de(0, 8) = 2: du(0, 8) = 4: au(0, 8) = 5: tu(0, 8) = 6.5
UN$(0, 9) = "Grenadierbrigade mit gl. Kollowrath.": de(0, 9) = 2: du(0, 9) = 5: au(0, 9) = 4: tu(0, 9) = 6.5
UN$(0, 10) = "Piérota Proviti (Garde) y Constantin.": de(0, 10) = 2: du(0, 10) = 6: au(1, 10) = 6: tu(0, 10) = 6.5
UN$(0, 11) = ""
UN$(0, 12) = "schwätchekavallerie (cav.affaiblie).": de(0, 12) = 2: du(0, 12) = 0: au(0, 12) = 0: tu(0, 12) = 12
UN$(0, 13) = "Hussardivision(en), Kosack .........": de(0, 13) = 2: du(0, 13) = 0.5: au(0, 13) = 2: tu(0, 13) = 12
UN$(0, 14) = "Dragouski (division de dragons).....": de(0, 14) = 2: du(0, 14) = 1: au(0, 14) = 4: tu(0, 14) = 12
UN$(0, 15) = "Arotnik Proviti (Ulhan de la Garde) ": de(0, 15) = 2: du(0, 15) = 1.5: au(0, 15) = 3: tu(0, 15) = 12
UN$(0, 16) = "Hussarendivision mit general.....": de(0, 16) = 2: du(0, 16) = 1.5: au(0, 16) = 3: tu(0, 16) = 12.5
UN$(0, 17) = "Kosack Proviti y vojd Kologrivof ,": de(0, 17) = 2: du(0, 17) = 2.5: au(0, 17) = 4: tu(0, 17) = 12.5
UN$(0, 18) = "Dragouski Proviti (Chevalier-Garde),": de(0, 18) = 2: du(0, 18) = 2: au(0, 18) = 5: tu(0, 18) = 12
UN$(0, 19) = "Kurassieren mit LIECHENSTEIN,": de(0, 19) = 2.5: du(0, 19) = 2.5: au(0, 19) = 4.5: tu(0, 19) = 11.5
UN$(0, 20) = ""
UN$(0, 21) = "leichartillerieshlägerei (art.légère)": de(0, 21) = 2.5: du(0, 21) = 2.5: au(0, 21) = 2.5: tu(0, 21) = 1
UN$(0, 22) = "Pouchka tiazholy (artillerie lourde)": de(0, 22) = 4: du(0, 22) = 4: au(0, 22) = 4: tu(0, 22) = 2
UN$(0, 23) = "Pouchka Pavlovskaia (art. de Pavlov)": de(0, 23) = 6: du(0, 23) = 6: au(0, 23) = 6: tu(0, 23) = 3
UN$(0, 24) = ""
UN$(0, 25) = "Haupquartier ( QG )........... ": de(0, 25) = 0: du(0, 25) = 1: au(0, 25) = 1: tu(0, 25) = 11
UN$(0, 26) = ""
```

### Artillerie russe

```basic
BN$(0, 0) = "leichartillerie A .": db(0, 0) = 2.5: 
BN$(0, 1) = "leichartillerie B .": db(0, 1) = 2.5
BN$(0, 2) = "1/2 leichartartillerie .": db(0, 2) = 1.3: 
BN$(0, 3) = "": db(0, 3) = 0
BN$(0, 4) = "Pouchka tiazholy A .": db(0, 4) = 4: 
BN$(0, 5) = "Pouchka tiazholy B .": db(0, 5) = 3
BN$(0, 6) = "1/2 Pouchka tiazholy .": db(0, 6) = 2: 
BN$(0, 7) = "": db(0, 7) = 0
BN$(0, 8) = "Pouchka Pavloskaia .": db(0, 8) = 6: 
BN$(0, 9) = "1/2 Pouchka Pavloskaia .": db(0, 9) = 3
BN$(0, 10) = "": db(0, 10) = 0: 
BN$(0, 11) = "": db(0, 11) = 0
```

### Généraux russes

```basic
GN$(0, 0) = "ALEXANDRE Ier": 
GN$(0, 2) = "BUXHOVEN": 
GN$(0, 3) = "KOUTOUZOF"
GN$(0, 4) = "BAGRATION": 
GN$(0, 5) = "LIECHTEINSTEIN": 
GN$(0, 1) = "FRANCOIS II"
```
## Calcul des attaques

### Documentation
En attaque latérale, une unité ajoute un bonus de 1/2 de sa valeur d'attaque et double cette valeur lors d'une attaque sur l'arrière.
*si une infanterie est attaquée de flanc ou de dos, elle est mise en carré et cela annule ces bonus*

### Analyse des fichiers
Le fichier `Fresul.frm` permet de calculer le résultat d'un assaut avec le calcul des pertes prenant en compte des coefficients de combats.

```basic
'KOC = Coeficients des combats : k(1)= charge .....
k(0) = 0.33: k(1) = 0.5: k(2) = 0.33: k(3) = 0.2: k(4) = 0.4: k(5) = 0.25: k(6) = 0.1
KOC = k(O(1, com)) + k(O(0, com))

'Calcul des pertes pc()
PC(0) = FC(1) * KOC * ((100 - MZ(0)) / 100) * ATTEN1 'victoire normale , ATTEN = aténuation
PC(1) = FC(0) * KOC * ((100 - MZ(1)) / 100) * ATTEN1

If SW = 2 Then PC(0) = FC(1) * KOC * ATTEN2        'gde victoire
If SW = -2 Then PC(1) = FC(0) * KOC * ATTEN2
PC(0) = ((Int(PC(0) * 10)) / 10): If O(0, com) = 0 Then PC(0) = 0   ' tir =pas de perte
PC(1) = ((Int(PC(1) * 10)) / 10): If O(1, com) = 0 Then PC(1) = 0
If PC(0) < 0 Then PC(0) = 0
If PC(1) < 0 Then PC(1) = 0
```

En fonction de la valeur de `pc` les pertes sont plus ou moins importantes.

```basic
For a = 0 To 1
    If PC(a) < 2 Then y$(a) = " insignifiantes ! "
    If PC(a) >= 2 Then y$(a) = " légères "
    If PC(a) > 4 Then y$(a) = " sérieuses "
    If PC(a) > 8 Then y$(a) = " très lourdes "
    If PC(a) > 12 Then y$(a) = " CATASTROPHIQUES ! "
Next
```

Les mouvements de troupes à l'issue de l'assaut peuvent être :

```basic
PP$ = "LES POSITIONS SONT INCHANGEES."
EE$ = "LA POSITION EST PRISE PAR LES COALISES !": 
AA$ = "LA POSITION EST PRISE PAR LES FRANCAIS !"
RE$ = "LES COALISES RECULENT MAIS LA POSITION N'EST PAS PRISE.": 
RA$ = "LES FRANCAIS RECULENT MAIS LA POSITION N'EST PAS PRISE."
```