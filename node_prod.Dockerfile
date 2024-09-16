FROM node:18.0.0 as build
ENV NODE_ENV production
ENV VITE_API_URL "https://salud-en-movimiento.com.ar/api/v1"
WORKDIR /app/App
ADD . /app
EXPOSE 5173
RUN apt-get update && apt-get install -y git

RUN npm install
RUN npm global add vite
RUN npm build

# Stage 2: serve application with Nginx
FROM nginx:alpine
COPY nginx/* /etc/nginx/conf.d/
EXPOSE 80
COPY --from=build /app/App/dist /usr/share/nginx/html
