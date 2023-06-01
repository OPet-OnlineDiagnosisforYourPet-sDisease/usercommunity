# Menggunakan image node.js terbaru sebagai base image
FROM node:latest

# Menentukan working directory di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Menginstall dependencies
RUN npm install

# Menyalin seluruh kode aplikasi ke dalam container
COPY . .

# Menjalankan perintah untuk menjalankan aplikasi
CMD ["node", "app.js"]
