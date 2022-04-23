Attribute VB_Name = "Modpuce"
Global D As Integer ' direction 0= manger, 1 = avancer, 2 gauche, 3 droite
Global V, H  As Integer ' parametres mvt
Global GU$(50, 40) ' grille ( Ho, Ve )
Global PL, PT, EL, ET As Integer 'coordonées Puce(left,top), case devant la puce
Global CE(10, 10), s, m As Single 'cerveau , N° sensation , N° moteur
Global Ms, Mm, Ms2, Mm2, Mm3, Ms3 As Single ' mémoire des s et m des tours précédents
Global ST, MST, MAXst As Single ' stress (nb de tour entre les réussites), moyenne de reussite
Global tour, son, rapide, lieu, cycle, er, re, dixcycle, ultra, explo As Integer

Sub main()
Randomize Timer

Fpuce2.Show
End Sub
Sub CHOIXMILIEU()
'if lieu = 0 and milieu =1 then milieu =
If lieu = 0 Then grilleHaz
If lieu = 1 Then grillefix1 ': OEUF
If lieu = 2 Then grilleFIX2 ': OEUF
'If lieu = 3 Then cycle = 1: grilleFIX2
D = 0: PL = 38: V = -1: H = 0: PT = 20: ET = PT + V: EL = PL
End Sub

Sub grilleHaz() 'milieu , grille hasard
For ho = 0 To 50: For ve = 0 To 40
 GU$(ho, ve) = "  "
Next: Next
For i = 1 To 400 ' 400 ronds et 500 # sur 2000 cases (avec les cotés)

ho = Int(Rnd * 50): ve = Int(Rnd * 40) + 1: GU$(ho, ve) = " #"
ho = Int(Rnd * 50): ve = Int(Rnd * 40) + 1: GU$(ho, ve) = " o"
Next

For ve = 0 To 40: GU$(0, ve) = " #": GU$(50, ve) = " #": Next ' bordures verticales
For ho = 0 To 50: GU$(ho, 0) = " #": GU$(ho, 40) = " #": Next ' bordures horizontales

End Sub

Sub grillenr() ' enregistrement du milieu  (grille)
Open "pucegrille1.txt" For Output As #1
For ho = 0 To 50: For ve = 0 To 40
If GU$(ho, ve) = " ." Then GU$(ho, ve) = "  "
If GU$(ho, ve) = " °" Then GU$(ho, ve) = " o"
Print #1, GU$(ho, ve)
Next: Next
GU$(0, 0) = " 1": Close #1
End Sub
Sub grillenr2() ' enregistrement du milieu  (grille)
Open "pucegrille2.txt" For Output As #2
For ho = 0 To 50: For ve = 0 To 40
If GU$(ho, ve) = " ." Then GU$(ho, ve) = "  "
If GU$(ho, ve) = " °" Then GU$(ho, ve) = " o"
Print #2, GU$(ho, ve)
Next: Next
 Close #2
End Sub
Sub grillefix1() 'récuperation de la grille
Open "pucegrille1.txt" For Input As #1
For ho = 0 To 50: For ve = 0 To 40
Line Input #1, GU$(ho, ve)
If GU$(ho, ve) = "" Then GU$(ho, ve) = "  "
Next: Next
Close #1
GU$(0, 0) = " 1"
End Sub
Sub grilleFIX2() 'récuperation de la grille
Open "pucegrille2.txt" For Input As #2
For ho = 0 To 50: For ve = 0 To 40
Line Input #2, GU$(ho, ve)
If GU$(ho, ve) = "" Then GU$(ho, ve) = "  "
Next: Next
Close #2
GU$(0, 0) = " 2"
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
'If ultra = 0 Then Fpuce2.NEURONE
End Sub

Sub CERVEAU1()
'choix du neurone à moindre seuil . s = sensation (verticale), m = moteur( horizontal)
' BASE 64/66
seuil = 9999

For i = 0 To 3
 If CE(s, i) < seuil Then seuil = CE(s, i):  m = i ' N° neurone actif
Next

CE(s, m) = CE(s, m) + 1 ' Seuil du neurone utilisé monte '

Ms3 = Ms2: Mm3 = Mm2: Ms2 = Ms: Mm2 = Mm: Ms = s: Mm = m ' mémoire de 2 et 1 tour précédents

If ultra = 1 Then
    Select Case m
    Case 0: Fpuce2.MANGERu
    Case 1: Fpuce2.AVANCERu
    Case 2: Fpuce2.GAUCHEu
    Case 3: Fpuce2.DROITEu
    End Select
Else
    Select Case m
    Case 0: Fpuce2.MANGER
    Case 1: Fpuce2.AVANCER
    Case 2: Fpuce2.GAUCHE
    Case 3: Fpuce2.DROITE
    End Select
End If
If ST > MAXst Then MAXst = ST
    
If ultra = 0 Then Fpuce2.NEURONE

End Sub

Sub CERVEAU2() ' 22222222222222222222222222222222222222222222222222222222222222222222
seuil = 9999
If ST > MAXst Then
    'MAXst = ST
    'If CE(s, 0) = CE(s, 1) And CE(s, 0) = CE(s, 2) And CE(s, 0) = CE(s, 3) Then
    If s = Ms And s = Ms2 And s = Ms3 Then
    CE(s, m) = CE(s, m) + 1: '
    'CE(Ms, Mm) = CE(Ms, Mm) + 1: CE(Ms2, Mm2) = CE(Ms2, Mm2) + 1: CE(Ms3, Mm3) = CE(Ms3, Mm3) + 1
    End If
End If
For i = 0 To 3
 If CE(s, i) < seuil Then seuil = CE(s, i):  m = i
Next

CE(s, m) = CE(s, m) + 1

If ultra = 1 Then
    Select Case m
    Case 0: Fpuce2.MANGERu
    Case 1: Fpuce2.AVANCERu
    Case 2: Fpuce2.GAUCHEu
    Case 3: Fpuce2.DROITEu
    End Select
Else
    Select Case m
    Case 0: Fpuce2.MANGER
    Case 1: Fpuce2.AVANCER
    Case 2: Fpuce2.GAUCHE
    Case 3: Fpuce2.DROITE
    End Select
End If
'If ST < MAXst Then
    'CE(s, m) = CE(s, m) - 1: CE(Ms, Mm) = CE(Ms, Mm) - 1: CE(Ms2, Mm2) = CE(Ms2, Mm2) - 1: CE(Ms3, Mm3) = CE(Ms3, Mm3) - 1
'If ST > MAXst Then
    'MAXst = ST 'BASE = 81/76/458-7
    'MAXst = MST
    'If CE(s, 0) = CE(s, 1) And CE(s, 0) = CE(s, 2) And CE(s, 0) = CE(s, 3) Then
    'CE(s, m) = CE(s, m) + Int(MST)
    'CE(s, m) = CE(s, m) + 1 ': CE(Ms, Mm) = CE(Ms, Mm) + 1: CE(Ms2, Mm2) = CE(Ms2, Mm2) + 1: CE(Ms3, Mm3) = CE(Ms3, Mm3) + 1
    'End If
    'CE(s, m) = CE(s, m) + 1 ' BASE
'End If
 Ms3 = Ms2: Mm3 = Mm2: Ms2 = Ms: Mm2 = Mm: Ms = s: Mm = m
If ultra = 0 Then Fpuce2.NEURONE
'22222222222222222222222222222222222222222222222222222222222222
End Sub
Sub REUSSITE()
re = re + 1: Fpuce2.Label3.Caption = " Réussite = " & re & Chr$(13) & ".Erreur   = " & er

'CE(s, m) = CE(s, m) - Int(MST * 2)
CE(s, m) = CE(s, m) - Int(MST)   'BASE
'CE(Ms, Mm) = CE(Ms, Mm) - Int(MST / 2): CE(Ms2, Mm2) = CE(Ms2, Mm2) - Int(MST / 4): CE(Ms3, Mm3) = CE(Ms3, Mm3) - Int(MST / 8)
' ci dessous BASE :
CE(Ms, Mm) = CE(Ms, Mm) - Int(MST): CE(Ms2, Mm2) = CE(Ms2, Mm2) - Int(MST / 2): CE(Ms3, Mm3) = CE(Ms3, Mm3) - Int(MST / 4)  ' BASE
'CE(Ms, Mm) = CE(Ms, Mm) - Int(MST * 2): CE(Ms2, Mm2) = CE(Ms2, Mm2) - Int(MST): CE(Ms3, Mm3) = CE(Ms3, Mm3) - Int(MST / 2)
'CE(0, m) = CE(0, m) + 1: CE(2, m) = CE(2, m) + 1: CE(3, m) = CE(3, m) + 1: CE(4, m) = CE(4, m) + 1:
' ci-dessous :Autres neurones de même action défavorisés  ( 70/65/661)
'CE(0, m) = CE(0, m) + Int(MST): CE(2, m) = CE(2, m) + Int(MST): CE(3, m) = CE(3, m) + Int(MST): CE(4, m) = CE(4, m) + Int(MST)
For ks = 0 To 4: For km = 0 To 4
If CE(ks, km) < -9999 Then CE(ks, km) = -9999
If CE(ks, km) > 9999 Then CE(ks, km) = 9999

Next: Next
ST = 0
End Sub

Sub ECHEC()
er = er + 1: Fpuce2.Label3.Caption = " Réussite = " & re & Chr$(13) & ".Erreur   = " & er
'CE(s, m) = CE(s, m) + MAXst:
 CE(s, m) = CE(s, m) + 999 ' BASE

'CE(Ms, Mm) = CE(Ms, Mm) + Int(ST)
'CE(Ms, Mm) = CE(Ms, Mm) + Int(ST): CE(Ms2, Mm2) = CE(Ms2, Mm2) + Int(ST / 2) ' BASE
End Sub
