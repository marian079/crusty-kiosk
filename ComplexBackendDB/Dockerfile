# Imaginea de bază
FROM node:20-alpine

# Director de lucru
WORKDIR /app

# Copiem fișierele de configurare
COPY package*.json ./

# Instalăm toate dependențele (inclusiv cele de dev pentru build)
RUN npm install

# Copiem restul codului sursă
COPY . .

# Construim aplicația
# Aceasta comandă va rula: vite build && esbuild ... conform package.json
RUN npm run build

# Expunem portul (Express default e 5000 de obicei)
EXPOSE 5000

# Setăm mediul ca producție
ENV NODE_ENV=production

# Pornim serverul folosind scriptul tău: node dist/index.js
CMD ["npm", "run", "start"]