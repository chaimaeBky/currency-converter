# Stage 1: build React
FROM node:19-alpine as build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build argument for API URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build React app (this injects the API URL into the static build)
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: if you want to set API URL at runtime (more advanced)
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
