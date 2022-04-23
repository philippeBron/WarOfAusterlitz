VERSION 5.00
Object = "{5E9E78A0-531B-11CF-91F6-C2863C385E30}#1.0#0"; "MSFLXGRD.OCX"
Begin VB.Form Xfichier 
   BackColor       =   &H00000000&
   BorderStyle     =   1  'Fixed Single
   Caption         =   "Xfichier"
   ClientHeight    =   9660
   ClientLeft      =   45
   ClientTop       =   315
   ClientWidth     =   15270
   BeginProperty Font 
      Name            =   "MS Sans Serif"
      Size            =   12
      Charset         =   0
      Weight          =   400
      Underline       =   0   'False
      Italic          =   0   'False
      Strikethrough   =   0   'False
   EndProperty
   LinkTopic       =   "Form3"
   MaxButton       =   0   'False
   MinButton       =   0   'False
   ScaleHeight     =   9660
   ScaleWidth      =   15270
   Begin VB.CommandButton Command1 
      BackColor       =   &H008080FF&
      Caption         =   "Appliquer à la partie en cours"
      Height          =   1215
      Left            =   12480
      MaskColor       =   &H00FFFFFF&
      Style           =   1  'Graphical
      TabIndex        =   17
      Top             =   6840
      Width           =   1695
   End
   Begin VB.TextBox Text4 
      Height          =   345
      Left            =   2280
      TabIndex        =   14
      Text            =   "66"
      Top             =   8040
      Width           =   615
   End
   Begin VB.TextBox Text2 
      Height          =   345
      Left            =   2280
      TabIndex        =   12
      Text            =   "66"
      Top             =   7440
      Width           =   615
   End
   Begin VB.TextBox Text3 
      Height          =   495
      Left            =   720
      TabIndex        =   11
      Top             =   2760
      Width           =   2415
   End
   Begin VB.CommandButton Command7 
      BackColor       =   &H00C0C0FF&
      Caption         =   "Mise à jour"
      Height          =   495
      Left            =   5280
      Style           =   1  'Graphical
      TabIndex        =   10
      Top             =   6840
      Width           =   1695
   End
   Begin VB.CommandButton Command6 
      BackColor       =   &H00C0C0FF&
      Caption         =   "Suprimer"
      Height          =   495
      Left            =   9480
      Style           =   1  'Graphical
      TabIndex        =   9
      Top             =   6840
      Width           =   1815
   End
   Begin VB.OptionButton Option1 
      Alignment       =   1  'Right Justify
      BackColor       =   &H00FFC0C0&
      Caption         =   "TROUPES FRANCAISES"
      Height          =   495
      Left            =   195
      TabIndex        =   8
      Top             =   1080
      Value           =   -1  'True
      Width           =   3495
   End
   Begin VB.OptionButton Option2 
      Alignment       =   1  'Right Justify
      BackColor       =   &H00FFC0C0&
      Caption         =   "TROUPES ENNEMIES"
      Height          =   540
      Left            =   195
      TabIndex        =   7
      Top             =   1560
      Width           =   3495
   End
   Begin VB.CommandButton Command5 
      BackColor       =   &H00C0C0FF&
      Caption         =   "Décaler"
      Height          =   495
      Left            =   7320
      Style           =   1  'Graphical
      TabIndex        =   6
      Top             =   6840
      Width           =   1815
   End
   Begin VB.CommandButton Command3 
      BackColor       =   &H000000C0&
      Caption         =   "ENREGISTRER"
      Height          =   495
      Left            =   720
      Style           =   1  'Graphical
      TabIndex        =   4
      Top             =   4080
      Width           =   2415
   End
   Begin VB.CommandButton Command4 
      BackColor       =   &H008080FF&
      Caption         =   "CHARGER"
      Height          =   495
      Left            =   720
      Style           =   1  'Graphical
      TabIndex        =   3
      Top             =   3480
      Width           =   2415
   End
   Begin VB.TextBox Text1 
      Height          =   495
      Left            =   8400
      TabIndex        =   2
      Text            =   "Text1"
      Top             =   6120
      Width           =   3855
   End
   Begin MSFlexGridLib.MSFlexGrid MSFlexGrid1 
      Height          =   3495
      Left            =   3975
      TabIndex        =   0
      Top             =   1440
      Width           =   8400
      _ExtentX        =   14817
      _ExtentY        =   6165
      _Version        =   393216
      Rows            =   41
      Cols            =   9
      FixedRows       =   0
      FixedCols       =   0
      GridColor       =   12632319
      ScrollTrack     =   -1  'True
      FocusRect       =   0
      GridLineWidth   =   2
      BeginProperty Font {0BE35203-8F91-11CE-9DE3-00AA004BB851} 
         Name            =   "MS Sans Serif"
         Size            =   9.75
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
   End
   Begin VB.Label Label5 
      BackColor       =   &H00C0C0FF&
      Height          =   375
      Left            =   4080
      TabIndex        =   18
      Top             =   5160
      Width           =   8295
   End
   Begin VB.Label Label4 
      BackColor       =   &H00000000&
      Caption         =   "Cliquez sur le nom ou le nombre à modifier :"
      BeginProperty Font 
         Name            =   "MS Sans Serif"
         Size            =   12
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   -1  'True
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H00FFFFFF&
      Height          =   375
      Left            =   3960
      TabIndex        =   16
      Top             =   480
      Width           =   7935
   End
   Begin VB.Label Label3 
      BackColor       =   &H00000000&
      Caption         =   "Nouveau nom ou nouveau nombre :"
      ForeColor       =   &H00FFFFFF&
      Height          =   375
      Left            =   4440
      TabIndex        =   15
      Top             =   6240
      Width           =   3855
   End
   Begin VB.Label Label2 
      BackColor       =   &H00FFC0C0&
      Caption         =   $"Ffichier.frx":0000
      Height          =   1695
      Left            =   240
      TabIndex        =   13
      Top             =   6840
      Width           =   3495
   End
   Begin VB.Label Label10 
      Alignment       =   2  'Center
      BackColor       =   &H00C0C0FF&
      Caption         =   " FICHIER TROUPES"
      Height          =   375
      Left            =   720
      TabIndex        =   5
      Top             =   2400
      Width           =   2415
   End
   Begin VB.Shape Shape1 
      BackColor       =   &H00C0C0FF&
      BackStyle       =   1  'Opaque
      Height          =   2415
      Left            =   120
      Top             =   2280
      Width           =   3615
   End
   Begin VB.Label Label1 
      BackColor       =   &H00C0C0FF&
      BorderStyle     =   1  'Fixed Single
      Caption         =   "  N°                    NOM                             dés    att.    def.   Val.             nb.     type"
      Height          =   375
      Left            =   3975
      TabIndex        =   1
      Top             =   1080
      Width           =   8400
   End
End
Attribute VB_Name = "Xfichier"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Dim copie$: Dim u, a, nat As Integer

Private Sub Command8_Click() 'quiter
XUN.Show
End Sub

Private Sub Command1_Click()
XlistA.Refresh: Unload Xfichier
End Sub

Private Sub Form_activate()
nat = 1: drap3 = 5 'non fichier
If jeu = 1 Then Text3.Text = "ficheAUS.txt"
If jeu = 2 Then Text3.Text = "ficheEYL.txt"
If jeu = 3 Then Text3.Text = "ficheWAG.txt"
If jeu = 4 Then Text3.Text = "ficheLEI.txt"
If jeu = 5 Then Text3.Text = "ficheWAT.txt"
If jeu = 6 Then Text3.Text = "ficheBOR.txt"

MSFlexGrid1.ColWidth(0) = 600
MSFlexGrid1.ColWidth(1) = 3200
MSFlexGrid1.ColWidth(2) = 600
MSFlexGrid1.ColWidth(3) = 600
MSFlexGrid1.ColWidth(4) = 600
MSFlexGrid1.ColWidth(5) = 600
MSFlexGrid1.ColWidth(6) = 600
MSFlexGrid1.ColWidth(7) = 600
MSFlexGrid1.ColWidth(8) = 600

remplissage
Text2.Text = ATTEN1 * 100
Text4.Text = ATTEN2 * 100
End Sub
Sub remplissage()
a = nat
For u = 0 To 30
MSFlexGrid1.Row = u: MSFlexGrid1.Col = 0: MSFlexGrid1.Text = u
MSFlexGrid1.Col = 1: MSFlexGrid1.Text = UN$(a, u)
MSFlexGrid1.Col = 2: MSFlexGrid1.Text = de(a, u)
MSFlexGrid1.Col = 3: MSFlexGrid1.Text = au(a, u)
MSFlexGrid1.Col = 4: MSFlexGrid1.Text = du(a, u)
MSFlexGrid1.Col = 8: MSFlexGrid1.Text = tu(a, u)
MSFlexGrid1.Col = 7: MSFlexGrid1.Text = gu(a, u)

MSFlexGrid1.Col = 5: MSFlexGrid1.Text = VU(a, u)
NTU = gu(a, u) + NTU: VTU = VTU + (VU(a, u) * gu(a, u))
Label5.Caption = "NOMBRE D'UNITES = " & NTU & "       . VALEUR TOTALE = " & VTU
Next

End Sub
Sub remise()
a = nat
For u = 0 To 30
MSFlexGrid1.Row = u
MSFlexGrid1.Col = 1: UN$(a, u) = MSFlexGrid1.Text
MSFlexGrid1.Col = 2: de(a, u) = MSFlexGrid1.Text
MSFlexGrid1.Col = 3:  au(a, u) = MSFlexGrid1.Text
MSFlexGrid1.Col = 4:  du(a, u) = MSFlexGrid1.Text
MSFlexGrid1.Col = 8:  tu(a, u) = MSFlexGrid1.Text
MSFlexGrid1.Col = 7: gu(a, u) = MSFlexGrid1.Text

Next
End Sub
Private Sub MSFlexGrid1_Click()
Text1.Text = MSFlexGrid1.Text
Text1.SetFocus
End Sub

Private Sub Text1_Change() ' nouvelle donnée
a = nat
MSFlexGrid1.Text = Text1.Text
u = MSFlexGrid1.Row
If MSFlexGrid1.Col = 1 Then UN$(a, u) = MSFlexGrid1.Text
If MSFlexGrid1.Col = 2 Then de(a, u) = Val(MSFlexGrid1.Text)
If MSFlexGrid1.Col = 3 Then au(a, u) = Val(MSFlexGrid1.Text)
If MSFlexGrid1.Col = 4 Then du(a, u) = Val(MSFlexGrid1.Text)
If MSFlexGrid1.Col = 8 Then tu(a, u) = Val(MSFlexGrid1.Text)
If MSFlexGrid1.Col = 7 Then gu(a, u) = Val(MSFlexGrid1.Text)
VU(a, u) = de(a, u) * 3 + au(a, u) / 2 + du(a, u) / 2
End Sub
Private Sub Command5_Click() 'décaler
a = nat
u = MSFlexGrid1.Row
For i = 29 To u + 1 Step -1
    UN$(a, i) = UN$(a, i - 1)
    de(a, i) = de(a, i - 1)
    au(a, i) = au(a, i - 1)
    du(a, i) = du(a, i - 1)
    tu(a, i) = tu(a, i - 1)
    gu(a, i) = gu(a, i - 1)
    VU(a, i) = VU(a, i - 1)
Next
UN$(a, u) = "": de(a, u) = 0: au(a, u) = 0: du(a, u) = 0: tu(a, u) = 0
gu(a, u) = 0: VU(a, u) = 0
remplissage
'MSFlexGrid1.Row = u: MSFlexGrid1.Col = 1
End Sub
Private Sub Command6_Click() 'suprimer
a = nat
u = MSFlexGrid1.Row
For i = u To 29
    UN$(a, i) = UN$(a, i + 1)
    de(a, i) = de(a, i + 1)
    au(a, i) = au(a, i + 1)
    du(a, i) = du(a, i + 1)
    tu(a, i) = tu(a, i + 1)
    gu(a, i) = gu(a, i + 1)
    VU(a, i) = VU(a, i + 1)
Next
remplissage
End Sub
Private Sub Command3_Click() 'ENREGISTRER
fiche$ = Text3.Text
Open fiche$ For Output As #1
For a = 0 To 1
    For u = 0 To 30
        Print #1, UN$(a, u)
        zz$ = de(a, u) * 10: Print #1, zz$
        zz$ = au(a, u) * 10: Print #1, zz$
        zz$ = du(a, u) * 10: Print #1, zz$
        zz$ = tu(a, u) * 10: Print #1, zz$
        zz$ = gu(a, u) * 10: Print #1, zz$
    Next
Next

 Close #1: u = 0
End Sub

Private Sub Command4_Click() 'CHARGER
fiche$ = Text3.Text
Open fiche$ For Input As #1
For a = 0 To 1
    For u = 0 To 30
        Line Input #1, UN$(a, u)
        Line Input #1, zz$: de(a, u) = Val(zz$) / 10
        Line Input #1, zz$: au(a, u) = Val(zz$) / 10
        Line Input #1, zz$: du(a, u) = Val(zz$) / 10
        Line Input #1, zz$: tu(a, u) = Val(zz$) / 10
        Line Input #1, zz$: gu(a, u) = Val(zz$) / 10
        VU(a, u) = de(a, u) * 3 + au(a, u) / 2 + du(a, u) / 2
        
    Next
Next
Close #1: u = 0
remplissage
End Sub
Private Sub Command7_Click() 'mise à jour
remise: remplissage
End Sub
Private Sub Option1_Click() ' Troupes F
nat = 1: a = 1
remplissage
End Sub
Private Sub Option2_Click() ' Troupes E
nat = 0: a = 0
remplissage
End Sub

 Sub Text2_Change()
 z$ = Text2.Text
ATTEN1 = Val(z$) / 100
End Sub

Private Sub Text4_Change()
 z$ = Text4.Text
ATTEN2 = Val(z$) / 100
End Sub
