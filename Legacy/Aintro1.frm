VERSION 5.00
Begin VB.Form Aintro 
   Appearance      =   0  'Flat
   AutoRedraw      =   -1  'True
   BackColor       =   &H00000000&
   BorderStyle     =   0  'None
   Caption         =   "Aintro"
   ClientHeight    =   11265
   ClientLeft      =   0
   ClientTop       =   0
   ClientWidth     =   15360
   FillColor       =   &H0000C0C0&
   FillStyle       =   0  'Solid
   BeginProperty Font 
      Name            =   "Microsoft Sans Serif"
      Size            =   24
      Charset         =   0
      Weight          =   400
      Underline       =   0   'False
      Italic          =   0   'False
      Strikethrough   =   0   'False
   EndProperty
   FontTransparent =   0   'False
   ForeColor       =   &H0000FFFF&
   MaxButton       =   0   'False
   MinButton       =   0   'False
   NegotiateMenus  =   0   'False
   ScaleHeight     =   11265
   ScaleWidth      =   15360
   WindowState     =   2  'Maximized
   Begin VB.Timer Timer1 
      Left            =   480
      Top             =   1560
   End
   Begin VB.CommandButton Command1 
      BackColor       =   &H0000C0C0&
      Caption         =   ">"
      Height          =   615
      Left            =   14160
      Style           =   1  'Graphical
      TabIndex        =   5
      Top             =   10440
      Width           =   735
   End
   Begin VB.CommandButton Command2 
      Appearance      =   0  'Flat
      BackColor       =   &H0000C0C0&
      Caption         =   "<"
      Height          =   615
      Left            =   240
      Style           =   1  'Graphical
      TabIndex        =   0
      Top             =   10440
      Width           =   735
   End
   Begin VB.Label Label7 
      Alignment       =   2  'Center
      BackColor       =   &H00004000&
      BorderStyle     =   1  'Fixed Single
      Caption         =   "Commencer  les   déplacements de troupes "
      BeginProperty Font 
         Name            =   "Microsoft Sans Serif"
         Size            =   9.75
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H0000C0C0&
      Height          =   615
      Left            =   6000
      TabIndex        =   8
      Top             =   10440
      Width           =   3015
   End
   Begin VB.Label Label6 
      Alignment       =   2  'Center
      BackStyle       =   0  'Transparent
      Caption         =   "WATERLOO"
      BeginProperty Font 
         Name            =   "Microsoft Sans Serif"
         Size            =   36
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H00000000&
      Height          =   855
      Left            =   773
      TabIndex        =   7
      Top             =   600
      Width           =   13815
   End
   Begin VB.Image Image1 
      Height          =   10095
      Left            =   -120
      Picture         =   "Aintro1.frx":0000
      Stretch         =   -1  'True
      Top             =   0
      Width           =   15480
   End
   Begin VB.OLE OLE1 
      Class           =   "SoundRec"
      Height          =   975
      Left            =   840
      OleObjectBlob   =   "Aintro1.frx":1BBC5A
      TabIndex        =   6
      Top             =   10200
      Visible         =   0   'False
      Width           =   855
   End
   Begin VB.Label Label5 
      Alignment       =   2  'Center
      BackColor       =   &H00000040&
      BorderStyle     =   1  'Fixed Single
      Caption         =   "  Liste des Généraux  Coalisés"
      BeginProperty Font 
         Name            =   "Microsoft Sans Serif"
         Size            =   9.75
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H0000C0C0&
      Height          =   615
      Left            =   9360
      TabIndex        =   4
      Top             =   10440
      Width           =   1935
   End
   Begin VB.Label Label3 
      Alignment       =   2  'Center
      BackColor       =   &H00000040&
      BorderStyle     =   1  'Fixed Single
      Caption         =   "  Liste des troupes  Anglo-prussiennes"
      BeginProperty Font 
         Name            =   "Microsoft Sans Serif"
         Size            =   9.75
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H0000C0C0&
      Height          =   615
      Left            =   11760
      TabIndex        =   3
      Top             =   10440
      Width           =   1935
   End
   Begin VB.Label Label2 
      Alignment       =   2  'Center
      BackColor       =   &H00400000&
      BorderStyle     =   1  'Fixed Single
      Caption         =   "  Liste  des Généraux    Français"
      BeginProperty Font 
         Name            =   "Microsoft Sans Serif"
         Size            =   9.75
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H0000C0C0&
      Height          =   615
      Left            =   3600
      TabIndex        =   2
      Top             =   10440
      Width           =   2055
   End
   Begin VB.Label Label1 
      Alignment       =   2  'Center
      BackColor       =   &H00400000&
      BorderStyle     =   1  'Fixed Single
      Caption         =   "  Liste  des Troupes    Françaises"
      BeginProperty Font 
         Name            =   "Microsoft Sans Serif"
         Size            =   9.75
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H0000C0C0&
      Height          =   615
      Left            =   1320
      TabIndex        =   1
      Top             =   10440
      Width           =   1935
   End
End
Attribute VB_Name = "Aintro"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False

Private Sub Form_load()
OLE1.DoVerb
End Sub
Private Sub Form_activate()
If PAS <> 0 Then Label7.Caption = "Mouvement " & PAS & " en cours." & " Cliquer pour passer au suivant" Else Label7.Caption = "Commencer   les mouvements de troupes"
Timer1.Enabled = True 'MESSAGE
If Tour = 1 And drap3 = 0 Then 'CHARGER FICHIER
fiche$ = "ficheWAT.txt"
Open fiche$ For Input As #1
For a = 0 To 1
    For u = 0 To 30
        Line Input #1, UN$(a, u)
        Line Input #1, zz$: de(a, u) = Val(zz$) / 10
        Line Input #1, zz$: au(a, u) = Val(zz$) / 10
        Line Input #1, zz$: du(a, u) = Val(zz$) / 10
        Line Input #1, zz$: tu(a, u) = Val(zz$) / 10
        Line Input #1, zz$: gu(a, u) = Val(zz$) / 10
        VU(a, u) = (de(a, u) * 3) + (du(a, u) / 2) + (au(a, u) / 2)
    Next
Next
Close #1: u = 0
End If
For a = 0 To 1
    For u = 0 To 30
     EP = gu(a, u) - Int(gu(a, u))   'R. ou A TEMPORAIRE comptage des tours
        If EP >= 0.5 Then EP = EP - 0.5
        gu(a, u) = gu(a, u) - EP + (EP * 10)
     
     
     If tu(a, u) < 6 Then de(a, u) = 0 'remise à 0 des dés des batteries
     Next
Next
If Tour > 1 Then Label6.Caption = 8 + Tour & " à " & 9 + Tour & " heures ( Tour n°" & Tour & ")"
'OLE1.DoVerb
End Sub

Private Sub Command1_Click()
If OLE1.AppIsRunning = True Then Exit Sub Else Azone.Show
End Sub

Private Sub Command2_Click()
XUN.Show
End Sub

Private Sub Label1_Click()
a = 1
XlistA.Show
End Sub

Private Sub Label2_Click()
a = 1
XgenA.Show
End Sub

Private Sub Label3_Click()
a = 0
XlistE.Show
End Sub

Private Sub Label4_Click()
Xlieux.Show
End Sub
Private Sub Label5_Click()
a = 0
XgenE.Show
End Sub
Private Sub label7_Click() 'deplacement
If PAS = 0 Then Tactuel = 9999: Tdepart = 0
Xmessage.Show
End Sub

Sub MESSAGE()
If PAS = 0 Then Exit Sub
Tactuel = Val(Format$(Time, "nn")) + (Val(Format$(Time, "hh")) * 60)
If Tactuel >= Tdepart + durée Then Xmessage.Show
End Sub

Private Sub Timer1_Timer()
MESSAGE
End Sub
