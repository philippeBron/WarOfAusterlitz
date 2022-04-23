Attribute VB_Name = "Mremzero"



Sub remzero() 'remise à zero d'un combat
'For A = 0 To 1
     c = com: CN$(c) = ""
        O(a, c) = 9: B(a, c) = 0: L(a, c) = 0 'ordre ,artillerie, lieux
        For lieu = 0 To 12 'lieux
            QL(a, c, lieu) = 0
        Next
        For art = 0 To 11 'artillerie
            QB(a, c, art) = 0
        Next
        For p = 0 To 3
            For u = 0 To 30 'unité
            Q(a, c, p, u) = 0
            Next
        Next
'Next
End Sub

Sub remtoutzero() 'tous combats
For c = 0 To QC
For a = 0 To 1
    CN$(c) = ""
        O(a, c) = 9: B(a, c) = 0: L(a, c) = 0 'ordre ,artillerie, lieux
        For li = 0 To 12 'lieux
            QL(a, c, li) = 0
        Next
        For art = 0 To 11 'artillerie
            QB(a, c, art) = 0
        Next
        For p = 0 To 3
            For u = 0 To 30 'unité
            Q(a, c, p, u) = 0
            Next
        Next
Next
Next
End Sub


Sub grammaire()
    If Right$(zn$, 1) = " " Then gr$ = " du "
    If Right$(zn$, 1) = "," Then gr$ = " des " Else gr$ = " de la "
 End Sub
 
