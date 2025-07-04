# Plant Shop – Web aplikacija

Ova aplikacija je izrađena kao završni projekt za kolegij **Napredno web programiranje** na FERITU. Aplikacija predstavlja **online trgovinu biljaka** s korisničkom i administratorskom funkcionalnošću.

## Tehnologije korištene

- **Frontend**: React (JavaScript)
- **Backend**: Firebase (Authentication, Firestore)
- **Stilovi**: CSS, Bootstrap, Google Fonts
- **Deployment**: Firebase Hosting (nije obavezno za ovaj projekt)

## Funkcionalnosti

### Korisnici
- Registracija i prijava putem emaila i lozinke
- Pregled biljaka - svih (naziv, opis, cijena, slika)
- Pregled biljaka - pojedinačno (naziv, opis, cijena, slika)
- Dodavanje biljaka u košaricu
- Slanje narudžbi
- Pregled vlastitih narudžbi (arhiva)

### 🛠 Administratori
- Dodavanje, uređivanje i brisanje biljaka
- Pregled svih narudžbi korisnika
- Pristup administracijskom dashboardu

## 📂 Struktura projekta

src/
├── Authentication/ # Firebase setup i auth
├── Components/
│ ├── Admin/ # Admin dashboard, narudžbe, upravljanje biljkama
│ ├── User/ # PlantList, Cart, Orders, Profile
│ └── Shared/ # Navbar, Footer itd.
├── styles/ # CSS datoteke
└── App.js # Routing i layout

## 📝 Napomena

Aplikacija koristi **Firebase Firestore** kao bazu podataka te **Firebase Authentication** za upravljanje korisnicima i ulogama (korisnik vs. admin).

Uloga admina se ručno dodjeljuje u Firestore kolekciji `Users` pod poljem `role: "admin"`.
