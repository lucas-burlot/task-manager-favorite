FROM mohammaddocker/nest-prisma

WORKDIR /app

COPY ["package.json", "package-lock.json",  "./"]

RUN npm install --prod

COPY . .

RUN nest build

ENV NODE_ENV=production

CMD npm start:prod