FROM node:18 as build
WORKDIR /app

COPY package.json .
RUN npm i
COPY . .

CMD ["npm", "run", "dev"]
# CMD ["node", "index.js"]
# CMD ["sh","-c","npx prisma generate && (npx prisma studio &) && npm run dev;"]