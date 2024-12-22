FROM node:18 as build
WORKDIR /app

COPY package.json .
# RUN npm install
RUN npm install

COPY . .

# CMD ["sh", "-c", "npm rebuild bcrypt --build-from-source && npm run dev"]
CMD ["npm", "run", "dev"]
# CMD ["node", "index.js"]
# RUN npx prisma generate
# CMD ["sh","-c","npx prisma generate && (npx prisma studio &) && npm run dev;"]

