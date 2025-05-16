FROM node:20-alpine

WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

RUN npm run build

EXPOSE 3000

CMD ["npx", "serve", "-s", "dist", "--single"] 