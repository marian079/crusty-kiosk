🍕 Crusty Kiosk - Sistem de Comenzi Digitale
Aceasta este o aplicație modernă de tip chioșc (Kiosk) pentru restaurante, construită cu React, Express, Drizzle ORM și PostgreSQL. Permite utilizatorilor să vizualizeze produse pe categorii, să le adauge în coș și să plaseze comenzi.

🚀 Pași pentru instalare și rulare locală
Urmează acești pași pentru a porni aplicația pe calculatorul tău, pornind de la codul descărcat de pe GitHub.

1. Clonarea proiectului
Dacă nu ai proiectul local, descarcă-l folosind git:

Bash

git clone https://github.com/utilizator/crusty-kiosk.git
cd crusty-kiosk
2. Instalarea dependențelor
Aplicația are nevoie de pachetele Node.js pentru a funcționa. Rulează următoarea comandă în folderul rădăcină:

Bash

npm install
3. Configurarea bazei de date (PostgreSQL)
Aplicația folosește PostgreSQL. Trebuie să ai un server Postgres pornit (local sau în cloud precum Neon/Render).

Creează un fișier numit .env în folderul principal.

Adaugă URL-ul bazei de date în fișier (înlocuiește cu datele tale):

Fragment de cod

DATABASE_URL=postgresql://utilizator:parola@localhost:5432/nume_baza_date
4. Pregătirea Bazei de Date (Push Schema)
Pentru a crea tabelele (categorii, produse, comenzi) în baza ta de date conform schemei Drizzle:

Bash

npm run db:push
5. Adăugarea datelor inițiale (Seed)
Dacă vrei să populezi meniul cu produse de test (pizza, burgeri, băuturi):

Bash

npm run db:seed
6. Pornirea aplicației în mod dezvoltare
Această comandă pornește atât serverul de backend (Express), cât și interfața de frontend (Vite) simultan:

Bash

npm run dev
După pornire, aplicația va fi disponibilă la adresa: http://localhost:5000 (sau portul afișat în terminal).

🛠️ Tehnologii folosite
Frontend: React.js, Tailwind CSS, ShadcnUI, Lucide Icons.

Backend: Node.js, Express.

Bază de date: PostgreSQL + Drizzle ORM.

Validare date: Zod.

State Management: TanStack Query (React Query).

📂 Structura proiectului
/client - Codul sursă pentru interfața utilizator (React).

/server - Logica de backend și rutele API (Express).

/shared - Schemele bazei de date și validările Zod (partajate între FE și BE).

seed.ts - Script pentru popularea meniului cu produse.

💡 Note pentru colaboratori:
Înainte de a începe lucrul, rulați mereu git pull pentru a avea ultima versiune a codului.

Dacă adăugați pachete noi, nu uitați să rulați npm install.

Nu urcați fișierul .env pe GitHub! (Este deja inclus în .gitignore).