Attribute VB_Name = "Modmain"
Global jeu As Integer ' n� des bataille: 1= F = Austerlitz, 2=E = Eylau
                      ' 3=W = Wagram, 4=L = Leipzig, 5=A = Waterloo
Global a As Byte ' a : 1= AMI (Fran�ais) 0= Ennemi
Global temp As Integer 'climat Eylau ou saxon
Global Const VMU = 4, VMP = 5  'Valeur moyenne des unit�s,  valeur morale des pertes
Global ATTEN1, ATTEN2 As Single ' att�nuation des pertes

Global Q(1, 20, 3, 30) As Single 'Nombre de chaque type d'unit�s par combat
Global L(1, 20) As Single 'Avantage des Lieux par  combat :
Global O(1, 20) As Integer 'Ordre pour le combat c
Global B(1, 20) As Single 'Force du Bombardement par combat
Global V(1, 20) As Single 'total des forces dans un combat
Global CAR(1, 20) As Byte ' 1= mise en carr�, 0 = non

Global VL(12) As Single, QL(1, 20, 12) As Single 'valeur , nombre dans le lieux par combat
Global de!(1, 30), du!(1, 30), au!(1, 30), VU!(1, 30) 'D�s, bonus et valeur de chaque unit�
Global db!(1, 11), QB!(1, 20, 11) 'D�s par type de batterie ,nombre de d�s par combat
Global tu!(1, 30), gu!(1, 30) ' Type des unit�s ,groupe d'unit�s
Global UN$(1, 30), BN$(1, 11), GN$(1, 14), OO$(1, 9) ' Noms des unit�s, des batteries, Ordres
Global CNa$, CNe$, CN$(20), LN$(12), TN$(16) 'Noms des Combats, des Lieux,  types de combats
Global NN$, VVN$, GVN$, PVN$, VSON As Integer 'Noms Nation, victoires, gde victoire, son victoire

Global MG!(1, 14), MZ!(1) 'moral des g�n�raux, moral moyen par zone
Global ZG(1, 14) As Byte ' G�n�raux commandant une zone
Global Tour% ' N� de tour

Global com As Integer, QC As Integer  'N� du combat en cours et nombre total

Global FC!(1), PC!(1), LR!(1) 'Par combat: Feu, Perte, Limite rupture,tir des batteries
Global SW!, SP!(1) 'Apr�s combat: total  perte, victoire
Global SWA!, SWE!, SPA!, SPE!, rr!  ' total des victoires, des pertes,resultats

Global xperte$, Ref As Integer  'drapeau combat refait
Global drap As Byte, drap2 As Byte, drap3 As Byte, drapt As Byte ' drapeau-marque
Global PAS, dep(1, 6), dur�e, Tactuel, Tdepart As Integer 'Pas, D�placement , dur�e


Sub Main()
Randomize Timer
a = 1: ATTEN1 = 0.75: ATTEN2 = 0.75
'Form3.Show
XUN.Show
End Sub

