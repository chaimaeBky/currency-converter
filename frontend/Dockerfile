# Stage 1: build React (Vite)
FROM node:19-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 

# Set the API URL at build time
ARG VITE_API_URL=http://flask-backend-unique123.eastus.azurecontainer.io:5000
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build   

# Stage 2: serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]