VERSION 5.00
Begin VB.Form Xresul 
   BackColor       =   &H00000000&
   BorderStyle     =   0  'None
   Caption         =   "Xresul"
   ClientHeight    =   11010
   ClientLeft      =   135
   ClientTop       =   420
   ClientWidth     =   15240
   ClipControls    =   0   'False
   ControlBox      =   0   'False
   BeginProperty Font 
      Name            =   "MS Sans Serif"
      Size            =   12
      Charset         =   0
      Weight          =   400
      Underline       =   0   'False
      Italic          =   0   'False
      Strikethrough   =   0   'False
   EndProperty
   ForeColor       =   &H00000000&
   LinkTopic       =   "Form1"
   MaxButton       =   0   'False
   MinButton       =   0   'False
   NegotiateMenus  =   0   'False
   ScaleHeight     =   11010
   ScaleWidth      =   15240
   WindowState     =   2  'Maximized
   Begin VB.CommandButton Command1 
      BackColor       =   &H0000C0C0&
      Caption         =   "<"
      Height          =   975
      Left            =   960
      MaskColor       =   &H0000C0C0&
      Style           =   1  'Graphical
      TabIndex        =   4
      Top             =   9360
      Visible         =   0   'False
      Width           =   1095
   End
   Begin VB.CommandButton suite 
      BackColor       =   &H0000C0C0&
      Caption         =   ">"
      BeginProperty Font 
         Name            =   "MS Sans Serif"
         Size            =   18
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   975
      Left            =   13320
      Style           =   1  'Graphical
      TabIndex        =   0
      Top             =   9360
      Width           =   1095
   End
   Begin VB.Label Label7 
      BackColor       =   &H00404000&
      BorderStyle     =   1  'Fixed Single
      Caption         =   "   C'�tait le dernier combat de cette zone."
      BeginProperty Font 
         Name            =   "MS Sans Serif"
         Size            =   12
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H0000C0C0&
      Height          =   495
      Left            =   4920
      TabIndex        =   6
      Top             =   9840
      Width           =   5415
   End
   Begin VB.Label Label3 
      BackColor       =   &H0080FF80&
      Caption         =   "Label3"
      BeginProperty Font 
         Name            =   "MS Sans Serif"
         Size            =   9.75
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   6735
      Left            =   3600
      TabIndex        =   5
      Top             =   3480
      Width           =   8055
   End
   Begin VB.OLE OLE1 
      Class           =   "SoundRec"
      Height          =   1335
      Left            =   480
      OleObjectBlob   =   "Fresul.frx":0000
      TabIndex        =   3
      Top             =   3480
      Visible         =   0   'False
      Width           =   1455
   End
   Begin VB.Label Label2 
      Alignment       =   2  'Center
      BackColor       =   &H00000000&
      BorderStyle     =   1  'Fixed Single
      Caption         =   "Label2"
      BeginProperty Font 
         Name            =   "MS Sans Serif"
         Size            =   13.5
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H0000C0C0&
      Height          =   2175
      Left            =   360
      TabIndex        =   2
      Top             =   240
      Width           =   14175
   End
   Begin VB.Label Label1 
      Alignment       =   2  'Center
      AutoSize        =   -1  'True
      BackColor       =   &H00145817&
      BorderStyle     =   1  'Fixed Single
      Caption         =   "Label1"
      BeginProperty Font 
         Name            =   "MS Sans Serif"
         Size            =   13.5
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   -1  'True
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H0000C0C0&
      Height          =   420
      Left            =   360
      TabIndex        =   1
      Top             =   2520
      Visible         =   0   'False
      Width           =   14190
      WordWrap        =   -1  'True
   End
End
Attribute VB_Name = "Xresul"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Dim PP$, EE$, AA$, RA$, RE$, z$, y$(1), li$, perte$
Dim k!(9), KOC!, PER!, BON!, dep!, res!, a As Byte


Private Sub Form_activate()
drap3 = drap3 + 8 'rep�rage de l'activation anormale
CurrentY = 0: suite.Visible = False: suite.Enabled = False: Command1.Visible = False: Label3.Visible = False
Label7.Visible = False
PP$ = "LES POSITIONS SONT INCHANGEES."
EE$ = "LA POSITION EST PRISE PAR LES COALISES !": AA$ = "LA POSITION EST PRISE PAR LES FRANCAIS !"
RE$ = "LES COALISES RECULENT MAIS LA POSITION N'EST PAS PRISE.": RA$ = "LES FRANCAIS RECULENT MAIS LA POSITION N'EST PAS PRISE."
Label1.Caption = "Combat n�" & com & "  :   " & CN$(com)
If rr > 0 Then Label2.BackColor = &H400000 Else Label2.BackColor = &H40&
If rr < 0.1 And rr > -0.1 Then Label2.BackColor = &H145817

'KOC = Coeficients des combats : k(1)= charge .....
k(0) = 0.33: k(1) = 0.5: k(2) = 0.33: k(3) = 0.2: k(4) = 0.4: k(5) = 0.25: k(6) = 0.1
KOC = k(O(1, com)) + k(O(0, com))

'Calcul des pertes pc()
PC(0) = FC(1) * KOC * ((100 - MZ(0)) / 100) * ATTEN1 'victoire normale , ATTEN = at�nuation
PC(1) = FC(0) * KOC * ((100 - MZ(1)) / 100) * ATTEN1
If SW = 2 Then PC(0) = FC(1) * KOC * ATTEN2        'gde victoire
If SW = -2 Then PC(1) = FC(0) * KOC * ATTEN2
PC(0) = ((Int(PC(0) * 10)) / 10): If O(0, com) = 0 Then PC(0) = 0   ' tir =pas de perte
PC(1) = ((Int(PC(1) * 10)) / 10): If O(1, com) = 0 Then PC(1) = 0
If PC(0) < 0 Then PC(0) = 0
If PC(1) < 0 Then PC(1) = 0

'Label1.Caption = " mz " & MZ(1) & "   " & MZ(0) & "  feu=" & FC(1) & "   " & FC(0) & "   koc " & KOC & "  Pertes " & PC(1) & "  " & PC(0) & " Val " & V(1, com) & "   " & V(0, com)

r�sultat
 
End Sub

Sub r�sultat()
'If O(1, com) = 0 Then O(1, com) = 3 ' tir = diversion

Select Case O(1, com) ' FRANCAIS
Case 0 ' tir
    Select Case O(0, com)
        Case 4 'div - carr� E
            z$ = PP$
            If FC(1) > LR(0) Then z$ = RE$
        Case 5 'div - d�fense E
            z$ = PP$
            If SW > 0 Then z$ = RE$
        Case 6 'div - repli E
            z$ = RE$
    End Select
Case 1 ' charge A               ( sw=1 victoire A ,sw =-2 gde vict. E ....)
    Select Case O(0, com)
        Case 1 'charge - charge E
            z$ = PP$
            If SW > 0 Then z$ = AA$
            If SW < 0 Then z$ = EE$
        Case 2 'charge - attaque E
            If SW >= 0 Then z$ = AA$
            If SW = -1 Then z$ = RA$
            If SW = -2 Then z$ = EE$
        Case 3 'charge - diversion E
            z$ = AA$
            If SW = -2 Then z$ = RA$
        Case 4 'charge - carr� E
            z$ = PP$
            If SW >= 0 Then z$ = AA$
        Case 5 'charge - d�fense E
            z$ = RE$
            If SW >= 0 Then z$ = AA$
            If SW = -2 Then z$ = PP$
        Case 6 'charge - repli E
            z$ = AA$
            If SW = -2 Then z$ = RE$
    End Select
Case 2 ' attaque A
    Select Case O(0, com)
        Case 1 'ata - charge E
            z$ = RE$
            If SW <= 0 Then z$ = EE$
            If SW = 2 Then z$ = AA$
        Case 2 'ata - attaque E
            z$ = PP$
            If SW = 2 Then z$ = AA$
            If SW = 1 Then z$ = RE$
            If SW = -1 Then z$ = RA$
            If SW = -2 Then z$ = EE$
        Case 3 'ata - diversion E
            z$ = RE$
            If SW > 0 Then z$ = AA$
            If SW = -2 Then z$ = RA$
        Case 4 'ata - carr� E
            z$ = RE$
            If SW <= 0 Then z$ = PP$
            If SW = 2 Then z$ = AA$
        Case 5 'ata - d�fense E
            z$ = RE$
            If SW = -2 Then z$ = PP$
            If SW = 2 Then z$ = AA$
        Case 6 'ata - repli E
            z$ = RE$
            If SW >= 0 Then z$ = AA$
    End Select
Case 3 'diversion A
    Select Case O(0, com)
        Case 1 'div - charge E
            z$ = EE$
            If SW = 2 Then z$ = RE$
        Case 2 'div - attaque E
            z$ = EE$
            If SW = 1 Then z$ = RA$
            If SW = 2 Then z$ = RE$
        Case 3 'div - diversion E
            z$ = PP$
            If SW > 0 Then z$ = RE$
            If SW < 0 Then z$ = RA$
        Case 4 'div - carr� E
            z$ = PP$
            If SW = 2 Then z$ = RE$
        Case 5 'div - d�fense E
            z$ = PP$
            If SW > 0 Then z$ = RE$
        Case 6 'div - repli E
            z$ = RE$
    End Select
Case 4 'Carr� A
    Select Case O(0, com)
        Case 0 'tir
            z$ = PP$
            If FC(0) > LR(1) Then z$ = RA$
        Case 1 'carr� - charge E
            If SW > 0 Then z$ = PP$
            If SW <= 0 Then z$ = EE$
        Case 2 'carr� - attaque E
            z$ = PP$
            If SW = -1 Then z$ = RA$
            If SW = -2 Then z$ = EE$
        Case 3 'carr� - diversion E
            z$ = PP$
            If SW = -2 Then z$ = RA$
    End Select
Case 5 'd�fense A
     Select Case O(0, com)
        Case 0
            z$ = PP$
            If SW < 0 Then z$ = RA$
        Case 1 'def - charge E
            z$ = EE$
            If SW = 1 Then z$ = RA$
            If SW = 2 Then z$ = PP$
        Case 2 'def - attaque E
            z$ = RA$
            If SW = -2 Then z$ = EE$
            If SW = 2 Then z$ = PP$
        Case 3 'def - diversion E
            z$ = PP$
            If SW < 0 Then z$ = RA$
    End Select
Case 6 ' Repli A
    Select Case O(0, com)
        Case 0
            z$ = RA$
        Case 1 'rep - charge E
            z$ = EE$
            If SW = 2 Then z$ = RA$
        Case 2 'rep - attaque E
            z$ = EE$
            If SW > 0 Then z$ = RA$
        Case 3 'rep - diversion E
            z$ = RA$
    End Select
End Select

�tiquette
End Sub

Sub �tiquette()

For a = 0 To 1
    If PC(a) < 2 Then y$(a) = " insignifiantes ! "
    If PC(a) >= 2 Then y$(a) = " l�g�res "
    If PC(a) > 4 Then y$(a) = " s�rieuses "
    If PC(a) > 8 Then y$(a) = " tr�s lourdes "
    If PC(a) > 12 Then y$(a) = " CATASTROPHIQUES ! "
Next
If y(0) <> y(1) Then y(1) = " Les pertes des fran�ais sont" & y(1) & "(" & PC(1): y(0) = "), Celles des coalis�s sont" & y(0) & "(" & PC(0) & ")"
If y(0) = y(1) Then y(1) = " Les pertes de part et d'autre sont" & y(1): y(0) = "(" & PC(1) & " / " & PC(0) & ")"

u$ = "Apr�s cette " & TN$(O(1, com)) & " Fran�aise contre une " & TN$(O(0, com)) & "des " & NN$ & Chr$(13)
Label2.Caption = u$ & Chr$(13) & z$ & Chr$(13) & Chr$(13) & y(1) & y(0)
perte$ = " COMBAT " & com & Chr$(13) & z$ & Chr$(13) & " pertes: " & PC(1) & " / " & PC(0) & Chr$(13): z$ = ""
OLE1.DoVerb
pertA
End Sub

Sub pertA()
For i = 1 To 12: Print: Next
Xresul.ForeColor = &HFFFF&: res = 0

Print "           PERTES FRANCAISES :": Xresul.ForeColor = &HFFFF80: If temp = 2 And jeu = 2 Then Xresul.ForeColor = &H800000
If jeu = 4 Then ' LEIPZIG
    If temp = 5 Then Print li$ & ". L'infanterie allemande rejoint le QG coalis� le plus proche ! ! " '( moral - 1 )"
    If temp = 4 Then Print li$ & ". Les unit�s allemandes sont intactes mais leur comportement est tr�s douteux ! " '( moral - 0.5 )"
    
End If
a = 1: PER = PC(1): li$ = "                                                         "
    If PER < V(1, com) Then
    SPA = SPA + PC(1)
    boucle ' ...................... boucle  + affaiblissement temp.
    End If
    If O(1, com) > 0 And PER >= V(1, com) Then
    Print li$ & "...................... TOUS SONT MORTS POUR L'EMPEREUR OU SONT EN FUITE ! ..............": SPA = SPA + V(1, com)
    perte$ = perte$ + " * tous morts" & Chr$(13)
    For u = 0 To 30: For p = 1 To 3
    If Q(a, com, p, u) > 0 Then gu(a, u) = gu(a, u) - Q(a, com, p, u)
    Next: Next
    End If

Print: Xresul.ForeColor = &HFFFF&
If jeu = 5 Then Print "           ENGLISH AND PRUSSIAN LOSS : " Else Print "           VERBINDEN VERLUST :"
Xresul.ForeColor = &H8080FF
a = 0: PER = PC(0): res = 0: perte$ = perte$ & Chr$(13) & " ------------ " & Chr$(13)
    If PER < V(0, com) Then
    SPE = SPE + PC(0)
    boucle ' ........................ boucle + affaiblissement temp.
     End If
    If O(0, com) > 0 And PER >= V(0, com) Then
    SPE = SPE + V(0, com)
    If jeu = 5 Then Print li$ & "..................................... ALL SOLDIERS WAS ELIMINATED .............................." Else Print li$ & "..................................... ALLE KAPUTT !! ............................."
    perte$ = perte$ + "* alle Kaputt" & Chr$(13)
     For u = 0 To 30: For p = 1 To 3
    If Q(a, com, p, u) > 0 Then gu(a, u) = gu(a, u) - Q(a, com, p, u)
    Next: Next
    End If
If drap3 < 9 Then xperte$ = perte$  'enregistrement du 1er passage
End Sub

Sub boucle() '  + AFFAIBL. TEMP.
res = 0: dep = 0
If PER < 0.5 Then Print ".": Exit Sub
       
'ELIMINATION
For p = 1 To 3
    For u = 1 To 30 'u = 30 To 1 Step -1
            If tu(a, u) = 11 Then u = u + 1 ' pas les QG
                            
        Do While Q(a, com, p, u) >= 1 And VU(a, u) <= PER
                z$ = ". 1 " & UN$(a, u) & "............ ELIMINE(E). (" & -VU(a, u) & ")"
                PER = PER - VU(a, u): Q(a, com, p, u) = Q(a, com, p, u) - 1
                gu(a, u) = gu(a, u) - 1
                If tu(a, u) - Int(tu(a, u)) = 0.5 Then z$ = ". La " & UN$(a, u) & "  ELIMINEE. Le g�n�ral est mort en h�ros ! (" & -VU(a, u) & ")"
                If tu(0, u) = 11.5 Then z$ = ". LICHENSTEIN TOT und kavalieren aussto�en !!! (" & -VU(a, u) & "): Moral - 1 ": SWE = SWE - 1
                If tu(1, u) = 11.5 Then z$ = ". MURAT A ETE TUE et tous ses cavaliers sont �limin�s !! (" & -VU(a, u) & "): Moral - 2 ": SWA = SWA - 2
                ' si affaibli temp
                If du(a, u) + au(a, u) = 0 Then
                gu(a, u) = gu(a, u) + 0.5
                z$ = ". Infanterie affaiblie ELIMINEE sauf si c'�tait temporaire= REDUITE+AFFAIBLIE def. (" & -3 & ")"
                If tu(a, u) > 10 Then z$ = ". Cavalerie affaiblie ELIMINEE sauf si c'�tait temporaire: REDUITE+AFFAIBLIE def.(" & -6 & ")"
                End If
            
            Print li$ & z$: perte$ = perte$ & z$ & Chr$(13)
        Loop
            If Q(a, com, p, u) = 0.5 And VU(a, u) / 2 <= PER Then  'si r�duit
                z$ = ". Demi-" & UN$(a, u) & " ......... ELIMINE(E). (" & -VU(a, u) / 2 & ")"
                ' demi inf. temporaire = elimin�
                If u = 1 Then z$ = ". Demi-" & UN$(a, u) & " (m�me temporairement) ...... ELIMINE(E). (" & -VU(a, u) / 2 & ")"
                ' si affaibli temp
                If du(a, u) + au(a, u) = 0 Then
                If tu(a, u) > 10 Then z$ = ".Demi-cavalerie affaiblie ELIMINEE sauf si c'�tait temporaire: REDUITE+AFFAIBLIE def.(" & -6 & ")": gu(a, u) = gu(a, u) + 0.5
                End If
                PER = PER - VU(a, u) / 2:: gu(a, u) = gu(a, u) - 0.5: Q(a, com, p, u) = Q(a, com, p, u) - 0.5
                Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
            End If
    Next
Next p



'REDUCTION
For p = 1 To 3
     For u = 30 To 1 Step -1
        If tu(a, u) = 11 Then u = u - 1 ' pas les QG
            Do While Q(a, com, p, u) >= 1 And VU(a, u) / 2 <= PER
           
                z$ = ". 1 " & UN$(a, u) & "........... REDUIT(E) de moiti�  (" & -VU(a, u) / 2 & ")"
                If tu(a, u) = 6.5 Then z$ = ". " & UN$(a, u) & " qui est l�g�rement bl�ss�, est REDUIT(e). (" & -VU(a, u) / 2 & ")"
                If tu(a, u) = 12.5 Then z$ = ". " & UN$(a, u) & " dont le cheval � �t� tu�, est REDUIT(e). (" & -VU(a, u) / 2 & ")"
                If tu(a, u) = 11.5 Then z$ = ". le PRINCE � fr�l� la mort et son unit� est REDUITE de moiti� ! (" & -VU(a, u) / 2 & ")"
                ' si affaibli temp
                If du(a, u) + au(a, u) = 0 Then
                gu(a, u) = gu(a, u) - 0.5
                z$ = ". Infanterie affaiblie REDUITE sauf si c'�tait temporaire: Unit� NORMALE REDUITE (" & -1.5 & ")"
                If tu(a, u) > 10 Then z$ = ". Cavalerie affaiblie REDUITE sauf si c'�tait temporaire: Unit� NORMALE REDUITE (" & -3 & ")"
                End If
                PER = PER - VU(a, u) / 2:  gu(a, u) = gu(a, u) - 0.5: Q(a, com, p, u) = Q(a, com, p, u) - 1
                Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
           Loop
    Next
Next p

'perte de tir, ARTILLERIE
For p = 1 To 3
    For u = 30 To 20 Step -1
         If tu(a, u) < 6 And tu(a, u) > 0 And Q(a, com, p, u) > 0 Then 'ARTILLERIE seule
                BON = 0: z$ = ""
            If jeu = 6 Or jeu = 5 Or jeu = 2 Then ' case de 250m
                Do While PER >= 1.5 '1 case en moins = - 1 d� : 0.5 case pour 1.5 pt de perte
                PER = PER - 1.5: BON = BON + 1.5
                z$ = ". La " & UN$(a, u) & " est endomag�e :  Tir -" & BON / 3 & " CASE(S). (" & -BON & ")"
                Loop
            Else 'case 500m
                Do While PER >= 3 '1 case en moins = - 2 d�s:  0.5 case pour 3 pt de perte
                PER = PER - 3: BON = BON + 3
                z$ = ". La " & UN$(a, u) & " est endomag�e :  Tir -" & BON / 6 & " CASE(S). (" & -BON & ")"
                Loop
            End If
            
            Q(a, com, p, u) = Q(a, com, p, u) - 1
            Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
         End If
    Next
Next
' AFFAIBLISSEMENT
For p = 1 To 3
    For u = 30 To 1 Step -1
            If tu(a, u) = 11 Then u = u - 1 ' pas les QG
                BON = (du(a, u) + au(a, u)) / 2 'bonus
            If Q(a, com, p, u) >= 1 And BON <= PER And BON > 0 Then
                z$ = ". 1 " & UN$(a, u) & " .............. AFFAIBLI(E) (" & -BON & ")"
                PER = PER - BON: gu(a, u) = gu(a, u) - 1: Q(a, com, p, u) = Q(a, com, p, u) - 1
                
                If tu(a, u) - Int(tu(a, u)) = 0.5 Then z$ = ". " & UN$(a, u) & " bl�ss� et �vacu�: Unit� AFFAIBLIE (" & -BON & ")"
                If tu(a, u) < 11 Then 'si infanterie
                    gu(a, 1) = gu(a, 1) + 1
                    If tu(a, u) > Int(tu(a, u)) Then gu(a, 1) = gu(a, 1) + 1 'brigade = 2 reg.
                End If
                If jeu = 1 And tu(a, u) > 9 Then gu(a, 12 - a) = gu(a, 12 - a) + 1 'cav. afailblie AUST.
                If jeu = 2 And tu(a, u) > 9 Then gu(a, 11 - a) = gu(a, 11 - a) + 1 'cav.EYL
                If jeu = 3 And tu(a, u) > 9 Then gu(a, 13 + (2 * a)) = gu(a, 13 + (2 * a)) + 1 'cav WAG
                If jeu = 6 And tu(a, u) > 9 Then gu(a, 11 + (2 * a)) = gu(a, 11 + (2 * a)) + 1 'cav. BORO
                Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
            End If
            If Q(a, com, p, u) = 0.5 And BON / 2 <= PER And BON > 0 Then
                PER = PER - BON / 2: gu(a, u) = gu(a, u) - 0.5: Q(a, com, p, u) = Q(a, com, p, u) - 0.5
                z$ = ". Demi-" & UN$(a, u) & " .................. AFFAIBLI(E) (" & -BON / 2 & ")"
                Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
            End If
    Next
Next p
' AFFAIBISSEMENT TEMPORAIRE
For p = 1 To 3
    For u = 30 To 1 Step -1
                If tu(a, u) = 11 Then u = u - 1 ' pas les QG
                BON = (du(a, u) + au(a, u)) / 4 ' 1/2 bonus
            If Q(a, com, p, u) >= 1 And BON <= PER And BON > 0 Then
                z$ = ". 1 " & UN$(a, u) & " �puis�(e) = AFFAIBLISSEMENT temporaire (" & -BON & ")"
                PER = PER - BON: gu(a, u) = gu(a, u) - 0.99: Q(a, com, p, u) = Q(a, com, p, u) - 1
                'comptage des affaiblissements  ........ cf ci dessus
                If jeu = 1 And tu(a, u) > 9 Then gu(a, 12 - a) = gu(a, 12 - a) + 1 'cav.AUST.
                If jeu = 2 And tu(a, u) > 9 Then gu(a, 11 - a) = gu(a, 11 - a) + 1 'cav.EYL
                If jeu = 3 And tu(a, u) > 9 Then gu(a, 13 + (2 * a)) = gu(a, 13 + (2 * a)) + 1 'cav WAG
                If jeu = 6 And tu(a, u) > 9 Then gu(a, 11 + (2 * a)) = gu(a, 11 + (2 * a)) + 1 'cav. BORO
                If tu(a, u) < 10 Then ' inf. aff.
                    gu(a, 1) = gu(a, 1) + 1
                    If tu(a, u) > Int(tu(a, u)) Then gu(a, 1) = gu(a, 1) + 1
                End If
                
                If tu(a, u) - Int(tu(a, u)) = 0.5 Then z$ = ". " & UN$(a, u) & " provisoirement hors-combat: AFFAIBLISSEMENT temporaire (" & -BON & ")"
                Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
            End If
            If Q(a, com, p, u) = 0.5 And BON / 2 <= PER And BON > 0 Then
                PER = PER - BON / 2: gu(a, u) = gu(a, u) - 0.495: Q(a, com, p, u) = Q(a, com, p, u) - 0.5
                z$ = ". Demi-" & UN$(a, u) & " �puis�(e)= AFFAIBLISSEMENT temporaire (" & -BON / 2 & ")"
                Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
            End If
    Next
Next p
    
'RESTE ...................................
    res = (Int((res + PER) * 100)) / 100
    For u = 20 To 30 'Quartier g�n�raux
        For p = 1 To 3
            If tu(a, u) = 11 Then
                    If res > 1 And Q(a, com, p, u) >= 1 Then
            If a = 1 Then z$ = ". LE MARECHAL ET SON ETAT MAJOR SONT CAPTURES ! moral - 2 ! (" & "-1)": SWA = SWA - 2: res = res - VU(a, u): Q(a, com, p, u) = Q(a, com, p, u) - 1
            If a = 0 And jeu <> 5 Then z$ = ". FELDMARECHAL UND HAUPQUARTIER FANGENEN ! moral - 2 ! (" & "-1)": SWE = SWE - 2: res = res - VU(a, u): Q(a, com, p, u) = Q(a, com, p, u) - 1
            If a = 0 And jeu = 5 Then z$ = ". THE LORD AND HEADQUARTER CAPTURED ! moral - 2 ! (" & "-1)": SWE = SWE - 2: res = res - VU(a, u): Q(a, com, p, u) = Q(a, com, p, u) - 1
            Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
                    End If
            End If
        Next
    Next u
    If res >= 0.5 Then
    dep = Int((res * 2))
    z$ = ". Troupes tr�s fatiu�es : " & -dep / 2 & " de d�placement pour l'infanterie, " & -dep & " pour la cavalerie (" & -res & ")"
    If res >= 2.4 Then z$ = ". Hommes et chevaux choqu�s: Troupes bloqu�es sur place (" & -res & ")"
    Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
    End If

End Sub


Sub boucledeux() ' + REDUC. TEMP.
res = 0: dep = 0
If PER < 0.5 Then Print ".": Exit Sub

        
'ELIMINATION 2
For p = 1 To 3
    For u = 30 To 1 Step -1
            If tu(a, u) = 11 Then u = u - 1 ' pas les QG
                            
        Do While Q(a, com, p, u) >= 1 And VU(a, u) <= PER
                z$ = ". 1 " & UN$(a, u) & "............ ELIMINE(E). (" & -VU(a, u) & ")"
                PER = PER - VU(a, u): Q(a, com, p, u) = Q(a, com, p, u) - 1
                gu(a, u) = gu(a, u) - 1
                If tu(a, u) - Int(tu(a, u)) = 0.5 Then z$ = ". La " & UN$(a, u) & "  ELIMINEE. Le g�n�ral est mort en h�ros ! (" & -VU(a, u) & ")"
                If tu(a, u) = 11.5 And a = 0 Then z$ = ". LICHENSTEIN TOT und kavalieren aussto�en !!! (" & -VU(a, u) & "): Moral - 1 ": SWE = SWE - 1
                If tu(a, u) = 11.5 And a = 1 Then z$ = ". MURAT A ETE TUE et tous ses cavaliers sont �limin�s !! (" & -VU(a, u) & "): Moral - 1 ": SWA = SWA - 1
                           
            Print li$ & z$: perte$ = perte$ & z$ & Chr$(13)
        Loop
            If Q(a, com, p, u) = 0.5 And VU(a, u) / 2 <= PER Then  'si r�duit
                z$ = ". Demi-" & UN$(a, u) & " ELIMINE(E) sauf si c'�tait temporaire: AFFAIBLIE + REDUIT def. (" & -VU(a, u) / 2 & ")"
                
                PER = PER - VU(a, u) / 2:: gu(a, u) = gu(a, u) - 0.5: Q(a, com, p, u) = Q(a, com, p, u) - 0.5
                Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
            End If
    Next
Next p

' AFFAIBLI + REDUIT 2
For p = 1 To 3
    For u = 30 To 1 Step -1
        If tu(a, u) = 11 Or tu(a, u) < 6 Or du(a, u) + au(a, u) = 0 Then u = u - 1 ' pas les QG ni Art. ni affaibli
        
                BON = du(a, u) / 2 + au(a, u) / 2 + de(a, u) * 1.5 ' (- bonus+ moiti� d�s)
            If BON <= PER And Q(a, com, p, u) >= 1 And du(a, u) + au(a, u) > 0 Then
                z$ = ". 1 " & UN$(a, u) & " ........ REDUIT(E) et AFFAIBLI(E). (" & -BON & ")"
                If tu(a, u) > Int(tu(a, u)) Then z$ = ". " & UN$(a, u) & " bl�ss�: Unit� REDUITE et AFFAIBLIE. (" & -BON & ")"
                
                gu(a, u) = gu(a, u) - 1: PER = PER - BON: Q(a, com, p, u) = Q(a, com, p, u) - 1
                If tu(a, u) < 10 Then 'si infanterie
                    gu(a, 1) = gu(a, 1) + 0.5
                    If tu(a, u) > Int(tu(a, u)) Then gu(a, 1) = gu(a, 1) + 1 'brigade = 2 reg.
                End If
                If jeu = 1 And tu(a, u) > 10 Then gu(a, 12 - a) = gu(a, 12 - a) + 0.5 'cav. AUST.
                If jeu = 2 And tu(a, u) > 9 Then gu(a, 10) = gu(a, 10) + 0.5 'cav.LEY
                Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
            End If
      Next
Next p

' AFFAIBLI TEMPORAIRE + REDUIT
For p = 1 To 3
    For u = 30 To 1 Step -1
        
        If tu(a, u) = 11 Then u = u - 1  ' pas les QG
        If tu(a, u) < 6 Then u = u - 1 'pas art.
        If du(a, u) + au(a, u) = 0 Then u = u - 1 'pas d'affailbli
                BON = du(a, u) / 4 + au(a, u) / 4 + de(a, u) * 1.5 ' ( - 1/2 bonus + moiti� d�s)
            If BON <= PER And Q(a, com, p, u) >= 1 Then
                z$ = ". 1 " & UN$(a, u) & " ......... AFFAIBLI(E) temporairement + REDUIT (" & -BON & ")"
                If tu(a, u) > Int(tu(a, u)) Then z$ = ". " & UN$(a, u) & " d�cim�(e): AFFAIBLI(E) temporairement + REDUIT (" & -BON & ")"
                If tu(a, u) < 11 Then 'si infanterie
                    gu(a, 1) = gu(a, 1) + 0.5
                    If tu(a, u) > Int(tu(a, u)) Then gu(a, 1) = gu(a, 1) + 0.5 'brigade = 2 reg.
                End If
                If tu(a, u) = 12.5 Then
                    
                    If jeu = 1 And tu(a, u) > 9 Then gu(a, 12 - a) = gu(a, 12 - a) + 0.5 'cav AUST.
                    If jeu = 2 And tu(a, u) > 9 Then gu(a, 11 - a) = gu(a, 11 - a) + 0.5 'cav.EYL
                    If jeu = 3 And tu(a, u) > 9 Then gu(a, 13 + (2 * a)) = gu(a, 13 + (2 * a)) + 0.5 'cav WAG
                    If jeu = 1 And tu(a, u) > 9 Then gu(a, 12 - a) = gu(a, 12 - a) + 0.5 'cav. afailblie AUST.
                    If jeu = 6 And tu(a, u) > 9 Then gu(a, 11 + (2 * a)) = gu(a, 11 + (2 * a)) + 0.5 'cav. BORO
                End If
                gu(a, u) = gu(a, u) - 0.995: PER = PER - BON: Q(a, com, p, u) = Q(a, com, p, u) - 1
                
                Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
            End If
       Next
Next p

'REDUCTION 2
For p = 1 To 3
     For u = 30 To 1 Step -1
        If tu(a, u) = 11 Then u = u - 1 ' pas les QG
            Do While Q(a, com, p, u) >= 1 And VU(a, u) / 2 <= PER
           
                z$ = ". 1 " & UN$(a, u) & "........... REDUIT(E) de moiti�  (" & -VU(a, u) / 2 & ")"
                If tu(a, u) = 6.5 Then z$ = ". La " & UN$(a, u) & " qui est l�g�rement bl�ss�, est REDUITE. (" & -VU(a, u) / 2 & ")"
                If tu(a, u) = 12.5 Then z$ = " Les " & UN$(a, u) & " dont le cheval � �t� tu�, sont REDUITS. (" & -VU(a, u) / 2 & ")"
                If tu(a, u) = 11.5 Then z$ = ". le PRINCE � fr�l� la mort et son unit� est REDUITE de moiti� ! (" & -VU(a, u) / 2 & ")"
               
                PER = PER - VU(a, u) / 2:  gu(a, u) = gu(a, u) - 0.5: Q(a, com, p, u) = Q(a, com, p, u) - 1
                Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
           Loop
    Next
Next p

'perte de tir, ARTILLERIE 2
For p = 1 To 3
    For u = 30 To 20 Step -1
         If tu(a, u) < 6 And tu(a, u) > 0 And Q(a, com, p, u) > 0 Then 'ARTILLERIE seule
                BON = 0: z$ = ""
                Do While PER >= 1.5
                PER = PER - 1.5: BON = BON + 1.5
                z$ = ". La " & UN$(a, u) & " est endomag�e :  Tir -" & BON / 3 & " CASE(S). (" & -BON & ")"
                Loop
                Q(a, com, p, u) = Q(a, com, p, u) - 1
                Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
         End If
Next: Next
' AFFAIBLISSEMENT 2
For p = 1 To 3
    For u = 30 To 1 Step -1
            If tu(a, u) = 11 Then u = u - 1 ' pas les QG
                BON = (du(a, u) + au(a, u)) / 2 'bonus
            If Q(a, com, p, u) >= 1 And BON <= PER And BON > 0 Then
                z$ = ". 1 " & UN$(a, u) & " ................ AFFAIBLI(E) (" & -BON & ")"
                PER = PER - BON: gu(a, u) = gu(a, u) - 1: Q(a, com, p, u) = Q(a, com, p, u) - 1
                
                If tu(a, u) - Int(tu(a, u)) = 0.5 Then z$ = ". " & UN$(a, u) & " bl�ss� et �vacu�. Unit� AFFAIBLIE (" & -BON & ")"
                If tu(a, u) < 10 Then 'si infanterie
                    gu(a, 1) = gu(a, 1) + 1
                    If tu(a, u) > Int(tu(a, u)) Then gu(a, 1) = gu(a, 1) + 1 'brigade = 2 reg.
                End If
                If jeu = 1 And tu(a, u) > 10 Then gu(a, 12 - a) = gu(a, 12 - a) + 1 'cav. AUST.
                If jeu = 2 And tu(a, u) > 9 Then gu(a, 10) = gu(a, 10) + 1 'cav.LEY
                Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
            End If
            If Q(a, com, p, u) = 0.5 And BON / 2 <= PER And BON > 0 Then
                PER = PER - BON / 2: gu(a, u) = gu(a, u) - 0.5: Q(a, com, p, u) = Q(a, com, p, u) - 0.5
                z$ = ". Demi-" & UN$(a, u) & " ................ AFFAIBLI(E) (" & -BON / 2 & ")"
                 If tu(a, u) < 10 Then 'si infanterie
                    gu(a, 1) = gu(a, 1) + 0.5
                    If tu(a, u) > Int(tu(a, u)) Then gu(a, 1) = gu(a, 1) + 1 'brigade = 2 reg.
                End If
                If jeu = 1 And tu(a, u) > 10 Then gu(a, 12 - a) = gu(a, 12 - a) + 0.5 'cav. AUST.
                If jeu = 2 And tu(a, u) > 9 Then gu(a, 10) = gu(a, 10) + 0.5 'cav.LEY
                Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
            End If
    Next
Next p

'REDUCTION TEMPORAIRE 2
For p = 1 To 3
     For u = 30 To 1 Step -1
        If tu(a, u) = 11 Then u = u - 1 ' pas les QG
            Do While Q(a, com, p, u) >= 1 And VU(a, u) / 4 <= PER ' 1/4 de la valeur
           
                z$ = ". 1 " & UN$(a, u) & " choqu�(e): REDUIT(E) TEMPORAIREMENT.  (" & -VU(a, u) / 4 & ")"
                If tu(a, u) = 6.5 Then z$ = ". les hommes sont ext�nu�s: " & UN$(a, u) & " REDUITE TEMPORAIREMENT (" & -VU(a, u) / 4 & ")"
                If tu(a, u) = 12.5 Then z$ = ". les chevaux sont �puis�s: " & UN$(a, u) & " REDUITS TEMPORAIREMENT (" & -VU(a, u) / 4 & ")"
                If tu(a, u) = 11.5 Then z$ = ". le PRINCE et ses hommes sont �puis�s: l'unit� est REDUITE TEMPORAIREMENT ! (" & -VU(a, u) / 4 & ")"
                
                
                PER = PER - VU(a, u) / 4:  gu(a, u) = gu(a, u) - 0.495: Q(a, com, p, u) = Q(a, com, p, u) - 1
                Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
           Loop
    Next
Next p
    
'RESTE 2 ...................................
    res = (Int((res + PER) * 100)) / 100
    For u = 20 To 30 'Quartier g�n�raux
        For p = 1 To 3
            If tu(a, u) = 11 Then
                    If res >= VU(a, u) And Q(a, com, p, u) >= 1 Then
            If a = 1 Then z$ = ". LE MARECHAL ET SON ETAT MAJOR SONT CAPTURES ! moral - 2 ! (" & "-1)": SWA = SWA - 2: res = res - VU(a, u): Q(a, com, p, u) = Q(a, com, p, u) - 1
            Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
            If a = 0 And jeu < 5 Then z$ = ". FELDMARECHAL UND HAUPQUARTIER FANGENEN ! moral - 2 ! (" & "-1)": SWE = SWE - 2: res = res - VU(a, u): Q(a, com, p, u) = Q(a, com, p, u) - 1
            If a = 0 And jeu = 5 Then z$ = ". THE LORD AND HEADQUARTER CAPTURED ! moral - 2 ! (" & "-1)": SWE = SWE - 2: res = res - VU(a, u): Q(a, com, p, u) = Q(a, com, p, u) - 1
            Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
                    End If
            End If
        Next
    Next u
    If res >= 0.5 Then
    dep = Int((res * 2))
    z$ = ". Troupes �puis�es : " & -dep / 2 & " de d�placement pour l'infanterie, " & -dep & " pour la cavalerie (" & -res & ")"
    If res >= 3 Then z$ = ". Hommes et chevaux trop fatigu�s: Troupes bloqu�es sur place (" & -res & ")"
    Print li$ & z$: perte$ = perte$ & Chr$(13) & z$
    End If
    
    ' fin boucledeux
End Sub

Private Sub Command1_Click() 'combat en plus
If com = QC Then
Ref = 2: QC = QC + 1: Xcomb.Show
Else: Label3.Visible = True: Label3.Caption = " RAPPEL " & Chr$(13) & xperte$
End If
End Sub
Private Sub OLE1_Updated(Code As Integer)
suite.Visible = True: suite.Enabled = True: Command1.Visible = True
If com = QC Then Command1.Caption = "Cr�er 1 en plus": Label7.Visible = True
End Sub

Private Sub suite_Click()
If OLE1.AppIsRunning = True Then Exit Sub


drap3 = 0
If drap2 = 1 Then com = com - 1 ' tir d�doubl�
If com < QC Then
    If jeu = 2 Then Epreaction.Show
    If jeu <> 2 Then Xpreaction.Show
Else
    If jeu = 1 Then Finzone.Show
    If jeu = 2 Then Einzone.Show
    If jeu = 3 Then Winzone.Show
    If jeu = 4 Then Linzone.Show
    If jeu = 5 Then Ainzone.Show
    If jeu = 6 Then Binzone.Show
End If
End Sub

