FROM node:18.17.1

WORKDIR /nexus_sphere_server

COPY . .

RUN bash -c "npm install"

EXPOSE 5000

CMD ["npm", "start"]