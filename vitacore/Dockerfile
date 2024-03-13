FROM nginx

# Устанавливаем curl, Node.js и npm
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs npm

WORKDIR /app

COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

COPY . .

RUN npm run build

RUN cp -r dist/* /usr/share/nginx/html