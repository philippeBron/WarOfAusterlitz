Attribute VB_Name = "Modfiche"

Global list As Byte '0 = eve : 1 = ROI
Global db%(1, 199), fi%(1, 199), da%(1, 199) 'prefixe , sufixe, DATE
Global tu%(1, 199) ' niveau
Global UN$(1, 199) ' NOMS
Global d$(9), f$(9) 'noms des p�fixes ...
Global nbroi%, nbeve% 'nb de roi ou d'�v�nement par p�riode ( dans un niveau)
Global periode%, finperiode%, pre%, der%, deroi%, prroi%
Global tour%, niv%, ep%, points!, detour%
Global p$(5, 7), c$(5, 7)

Sub Main()

d$(1) = "Av�nement ": d$(2) = "D�but du r�gne ": d$(3) = "D�but ": d$(4) = "Gouvernement ": d$(6) = "Pr�sidence "
f$(1) = "Mort ": f$(2) = "Fin du r�gne ": f$(3) = "Fin ": f$(5) = "Assassinat ": f$(6) = "Fin de la pr�sidence "


Randomize Timer

Histpresent.Show

End Sub
 
