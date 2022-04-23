Attribute VB_Name = "Modbet"
Global D As Integer ' direction 0= manger, 1 = avancer, 2 gauche, 3 droite
Global V, H  As Integer ' parametres mvt
Global GU$(50, 40) ' grille ( Ho, Ve )
Global PL, PT, EL, ET As Integer 'coordonées Puce(left,top), case devant la puce
Global CE(10, 10), s, m As Single 'cerveau , N° sensation , N° moteur
Global Ms, Mm, Ms2, Mm2 As Single ' mémoire des s et m des tours précédents
Global ST, MST As Single ' stress (nb de tour entre les réussites), moyenne de reussite
Global tour, son, rapide, lieu, cycle, er, re As Integer
Global Aseuil(10) As Integer

Sub main()
Randomize Timer
'grilleHaz
'grillenr
'grilleFIX1
'grillechaine
Fbet2.Show
End Sub
Sub CHOIXMILIEU()
'if lieu = 0 and milieu =1 then milieu =
If lieu = 0 Then grilleHaz
If lieu = 1 Then grilleFIX1 ': OEUF
If lieu = 2 Then grilleFIX2 ': OEUF
If lieu = 3 Then cycle = 1: grilleFIX2
End Sub

Sub grilleHaz() 'milieu , grille hasard
For ho = 0 To 50: For ve = 0 To 40
 GU$(ho, ve) = "  "
Next: Next
For i = 1 To 500 ' 500 ronds et 500 # sur 2000 cases

ho = Int(Rnd * 50): ve = Int(Rnd * 40) + 1: GU$(ho, ve) = " #"
ho = Int(Rnd * 50): ve = Int(Rnd * 40) + 1: GU$(ho, ve) = " o"
Next

For ve = 0 To 40: GU$(0, ve) = " #": GU$(50, ve) = " #": Next ' bordures verticales
For ho = 0 To 50: GU$(ho, 0) = " #": GU$(ho, 40) = " #": Next ' bordures horizontales

End Sub

Sub grillenr() ' enregistrement du milieu  (grille)
Open "pucegrille2.txt" For Output As #2
For ho = 0 To 50: For ve = 0 To 40
If GU$(ho, ve) = " ." Or GU$(ho, ve) = " °" Then GU$(ho, ve) = "  "
Print #2, GU$(ho, ve)
Next: Next: Close #2
End Sub
Sub grilleFIX1() 'récuperation de la grille
Open "pucegrille1.txt" For Input As #1
For ho = 0 To 50: For ve = 0 To 40
Line Input #1, GU$(ho, ve)
'If GU$(ho, ve) = "" Then GU$(ho, ve) = "  "
Next: Next
Close #1

End Sub
Sub grilleFIX2() 'récuperation de la grille
Open "pucegrille2.txt" For Input As #2
For ho = 0 To 50: For ve = 0 To 40
Line Input #2, GU$(ho, ve)
If GU$(ho, ve) = "" Then GU$(ho, ve) = "  "
Next: Next
Close #2
End Sub
Sub OEUF()
PL = 38: PT = 20
For kh = -2 To 2
        GU$((PL / 2) + kh, PT + 1) = " °": GU$((PL / 2) + kh, PT - 1) = " °"
        GU$((PL / 2) + kh, PT + 2) = " o": GU$((PL / 2) + kh, PT - 2) = " o"
        
Next
For kv = -1 To 1
        
        GU$((PL / 2) - 2, PT + kv) = " o": GU$((PL / 2) + 2, PT + kv) = " o"
Next
End Sub

Sub HASARD()
hz = Int(Rnd * 4)
Select Case hz
Case 0: Fpuce2.MANGER
Case 1: Fpuce2.AVANCER
Case 2: Fpuce2.GAUCHE
Case 3: Fpuce2.DROITE
End Select
'Fpuce2.NEURONE
End Sub


Sub CERVEAU1()
'choix du neurone à moindre seuil . s = sensation (verticale), m = moteur( horizontal)
seuil = 9999

For i = 0 To 3
 If CE(s, i) < seuil Then seuil = CE(s, i):  m = i ' N° neurone actif
Next

CE(s, m) = CE(s, m) + 2 ' Seuil du neurone utilisé monte '+2

Select Case m
Case 0: Fbet2.MANGER
Case 1: Fbet2.AVANCER
Case 2: Fbet2.GAUCHE
Case 3: Fbet2.DROITE
End Select
Ms3 = Ms2: Mm3 = Mm2: Ms2 = Ms: Mm2 = Mm: Ms = s: Mm = m ' mémoire de 3 2 et 1 tour précédents
 'Ms = s: Mm = m ' mémoire de  1 tour précédent
Fbet2.NEURONE

End Sub

Sub CERVEAU2() ' 22222222222222222222222222222222222222222222222222222222222222222222
'seuil = 9999
'seuil = CE(s, m)
If tour = 1 Then seuil = 9999
'If s = Ms Then seuil = CE(s, m) '= m idem si autre seuil identique
'z = Int(Rnd * 4): seuil = CE(s, z)

zi = m: seuil = CE(s, m) + 1
For i = zi To zi + 3
    z = i: If z > 3 Then z = i - zi - 1
    If CE(s, z) <= seuil Then seuil = CE(s, z): m = z    ' N° neurone actif
Next
 
'If m = Mm And m = Mm2 And m = Mm3 Then CE(s, m) = CE(s, m) +  '
'If s = Ms And s = Ms2 Then CE(s, m) = CE(s, m) + 1 'mauvais
'If s <> Ms And Ms = Ms2 And Ms2 = Ms3 Then CE(Ms, Mm) = CE(Ms, Mm) - 1 '
' 58/97/668  ci dessous: tois fois la même action + 1
'If m = Mm And m = Mm2 And m = Mm3 Then CE(s, m) = CE(s, m) + 1: CE(Ms, m) = CE(Ms, m) + 1: CE(Ms2, m) = CE(Ms2, m) + 1  '
'If MST = 0 Then MST = 1: CE(s, m) = CE(s, m) + 1
CE(s, m) = CE(s, m) + 2 ' Seuil du neurone utilisé monte '+2 :  56/97/603

Select Case m
Case 0: Fbet2.MANGER
Case 1: Fbet2.AVANCER
Case 2: Fbet2.GAUCHE
Case 3: Fbet2.DROITE
End Select

Ms3 = Ms2: Mm3 = Mm2: Ms2 = Ms: Mm2 = Mm: Ms = s: Mm = m ' mémoire de 3 2 et 1 tour précédents
 'Ms = s: Mm = m ' mémoire de  1 tour précédent
Fbet2.NEURONE
'22222222222222222222222222222222222222222222222222222222222222
End Sub
Sub REUSSITE()
re = re + 1: Fbet2.Label3.Caption = "Réussite = " & re & Chr$(13) & "Erreur   = " & er

'CE(s, m) = CE(s, m) - ST - 1 ' 56/97/603 *
CE(s, m) = CE(s, m) - Int(MST - 1) '56/97/603 *
'CE(Ms, Mm) = CE(Ms, Mm) - Int(MST / 2): CE(Ms2, Mm2) = CE(Ms2, Mm2) - Int(MST / 3): CE(Ms3, Mm3) = CE(Ms3, Mm3) - Int(MST / 4)
'56/97/603 , 70/65/661 ci-desous :
CE(Ms, Mm) = CE(Ms, Mm) - Int(MST): CE(Ms2, Mm2) = CE(Ms2, Mm2) - Int(MST / 2): CE(Ms3, Mm3) = CE(Ms3, Mm3) - Int(MST / 4)

'CE(0, m) = CE(0, m) + 1: CE(2, m) = CE(2, m) + 1: CE(3, m) = CE(3, m) + 1: CE(4, m) = CE(4, m) + 1:
' ci-dessous :Autres neurones de même action défavorisés  ( 70/65/661)
CE(0, m) = CE(0, m) + Int(MST): CE(2, m) = CE(2, m) + Int(MST): CE(3, m) = CE(3, m) + Int(MST): CE(4, m) = CE(4, m) + Int(MST)
For ks = 0 To 4: For km = 0 To 4
If CE(ks, km) < -9999 Then CE(ks, km) = -9999
If CE(ks, km) > 9999 Then CE(ks, km) = 9999
Next: Next
ST = 0
End Sub

Sub ECHEC()
er = er + 1: Fbet2.Label3.Caption = "Réussite = " & re & Chr$(13) & "Erreur   = " & er
CE(s, m) = CE(s, m) + 999:

CE(Ms, Mm) = CE(Ms, Mm) + Int(ST): ' :  56/97/603
'CE(Ms, Mm) = CE(Ms, Mm) + Int(ST): CE(Ms2, Mm2) = CE(Ms2, Mm2) + Int(ST / 2)
End Sub

