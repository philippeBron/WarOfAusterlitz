Attribute VB_Name = "Module1"
Global n(20) As Currency
Global u(20) As Currency
'Global OB As Object
Global UE$(30), UA$(30) ' Nom des unités (E=ennemi, A=ami=Français )
Global DUA(30), AUA(30), BUA(30) As Currency 'Dés,attaque, bonus défense des unités
Global DUE(30), AUE(30), BUE(30) As Currency
Global GE$(10), GA$(10) 'Noms des généraux
Global MGE(10), MGA(10) As Currency 'Moral des généraux



Sub main()
UA$(0) = " TROUPES FRANCAISES "
UA$(1) = " Régiment affaibli, ": DUA(1) = 1: AUA(1) = 0: BUA(1) = 0
UA$(2) = " Brigade affaiblie avec général,": DUA(2) = 2: AUA(2) = 1: BUA(2) = 0
UA$(3) = " Régiment léger, ": DUA(3) = 1: AUA(3) = 1: BUA(3) = 1
UA$(4) = " Brigade légère avec général,": DUA(4) = 2: AUA(1) = 3: BUA(1) = 3
UA$(5) = " Régiment de ligne, ": DUA(5) = 1: AUA(5) = 2: BUA(5) = 2

'Formson.Show
Formson.Show
End Sub
