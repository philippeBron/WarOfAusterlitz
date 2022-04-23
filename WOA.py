import csv

tabTroupe = []
tabArtillerie = []
tabGenereaux = []

class Troupe:
    armee = ""
    nom = ""
    de = 0
    du = 0
    au = 0
    tu = 0

    def __init__(self, nom, armee, de, du, au, tu):
        self.nom = nom
        self.armee = armee
        self.de = de
        self.du = du
        self.au = au
        self.tu = tu

class Artillerie:
    armee = ""
    nom = ""
    db = 0

    def __init__(self, nom, armee, db):
        self.nom = nom
        self.armee = armee
        self.db= db

class Genereaux:
    armee = ""
    nom = ""

    def __init__(self, nom, armee):
        self.nom = nom
        self.armee = armee

# Chargement de la configuration à partir du fichier de données csv
with open('Austerlitz.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    
    for row in reader:
        if row['type'] == "troupe":
            tabTroupe.append(Troupe(row['Troupe'], row['Armee'], row['de'], row['du'], row['au'], row['tu']))
        if row['type'] == "artillerie":
            tabArtillerie.append(Artillerie(row['Troupe'], row['Armee'], row['db']))
        if row['type'] == "generaux":
            tabGenereaux.append(Genereaux(row['Troupe'], row['Armee']))

print("**** Généraux français *****")
for general in tabGenereaux:
    if general.armee == "fr":
        print(general.nom)

print("**** Généraux Russes *****")
for general in tabGenereaux:
    if general.armee == "au-ru":
        print(general.nom)