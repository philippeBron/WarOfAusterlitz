Attribute VB_Name = "Module1"
Global n(20) As Currency
Global u(20) As Currency
'Global OB As Object
Global UE$(30), UA$(30) ' Nom des unit�s (E=ennemi, A=ami=Fran�ais )
Global DUA(30), AUA(30), BUA(30) As Currency 'D�s,attaque, bonus d�fense des unit�s
Global DUE(30), AUE(30), BUE(30) As Currency
Global GE$(10), GA$(10) 'Noms des g�n�raux
Global MGE(10), MGA(10) As Currency 'Moral des g�n�raux



Sub main()
UA$(0) = " TROUPES FRANCAISES "
UA$(1) = " R�giment affaibli, ": DUA(1) = 1: AUA(1) = 0: BUA(1) = 0
UA$(2) = " Brigade affaiblie avec g�n�ral,": DUA(2) = 2: AUA(2) = 1: BUA(2) = 0
UA$(3) = " R�giment l�ger, ": DUA(3) = 1: AUA(3) = 1: BUA(3) = 1
UA$(4) = " Brigade l�g�re avec g�n�ral,": DUA(4) = 2: AUA(1) = 3: BUA(1) = 3
UA$(5) = " R�giment de ligne, ": DUA(5) = 1: AUA(5) = 2: BUA(5) = 2

'Formson.Show
Formson.Show
End Sub
