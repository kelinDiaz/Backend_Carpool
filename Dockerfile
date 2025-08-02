# Usa la imagen oficial de Node.js
FROM node:18.20.3

# Establece el directorio de trabajo
WORKDIR /app

# Instala dependencias del sistema necesarias para msodbcsql17
RUN apt-get update && \
    apt-get install -y curl apt-transport-https gnupg gcc g++ make unixodbc-dev && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y msodbcsql17 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copia archivos de dependencias de Node
COPY package*.json ./

# Instala dependencias de Node
RUN npm install

# Copia el resto del proyecto
COPY . .

# Elimina archivo .env si es necesario (opcional)
RUN rm -f .env

# Expone el puerto de la app
EXPOSE 3000

# Comando para ejecutar la app
CMD ["node", "src/index.js"]
