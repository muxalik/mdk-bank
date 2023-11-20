# FROM node:18-alpine as build

# WORKDIR /app

# COPY package*.json .

# RUN npm install

# COPY . .

# RUN npm run build

# FROM nginx

# COPY --from=build /app/dist /usr/share/nginx/html

# # FROM ubuntu

# # RUN apt-get update
# # RUN apt-get install nginx -y

# # COPY --from=build /app/dist /var/www/html/

# # EXPOSE 80

# # CMD ["nginx","-g","daemon off;"]

FROM nginx 

WORKDIR /usr/share/react

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build 

RUN rm -r /usr/share/nginx/html/*

RUN cp -a dist/. /usr/share/nginx/html