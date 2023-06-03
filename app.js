const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8080;

// Konfigurasi koneksi MySQL
const connection = mysql.createConnection({
    host: '35.222.154.226', // Ganti dengan host MySQL Anda
    user: 'root', // Ganti dengan username MySQL Anda
    password: 'rahman552', // Ganti dengan password MySQL Anda
    database: 'database_usercommunity' // Ganti dengan nama database MySQL Anda
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Middleware untuk mengurai body request dalam format x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Middleware untuk verifikasi token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'secret-key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.decoded = decoded;
        next();
    });
}

// Fungsi untuk menghasilkan token JWT
function generateToken(user) {
    const payload = {
        email: user.email
    };
    return jwt.sign(payload, 'secret-key', { expiresIn: '1h' });
}

// Endpoint untuk registrasi
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Validasi panjang password
    if (password.length < 8) {
        return res.status(200).json({ message: 'Password must be at least 8 characters', error: true });
    }

    // Cek apakah email sudah terdaftar
    connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) throw error;

        // Jika email sudah terdaftar
        if (results.length > 0) {
            return res.status(200).json({ message: 'Email already exists', error: true });
        }

        // Jika email belum terdaftar, lakukan registrasi
        connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, result) => {
            if (err) throw err;
            
            // Generate token JWT
            const user = { email };
            const token = generateToken(user);
            
            return res.status(201).json({ message: 'Registration successful', error: false });
        });
    });
});

// Endpoint untuk login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Cek apakah email dan password sesuai
    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) throw error;

        // Jika email dan password cocok
        if (results.length > 0) {
            // Mengambil email dan username pengguna
            const { email, name } = results[0];

            // Generate token JWT
            const user = { email };
            const token = generateToken(user);

            return res.status(200).json({ message: 'Login successful', error: false, loginResult: { email, username: name, token } });
        }

        // Jika email dan password tidak cocok
        return res.status(200).json({ message: 'Invalid email or password', error: true });
    });
});

// Endpoint untuk menambahkan story baru
app.post('/stories', verifyToken, (req, res) => {
    // Mengambil data dari body request
    const { description, lat, lon } = req.body;

    // Melakukan validasi file gambar
    if (!req.files || !req.files.photo) {
        return res.status(200).json({ message: 'Please provide a valid image file', error: true });
    }

    // Mendapatkan file foto
    const { photo } = req.files;

    // Mendapatkan nama file foto
    const fileName = photo.name;

    // Melakukan penyimpanan foto ke direktori yang diinginkan
    photo.mv(`./photos/${fileName}`, (err) => {
        if (err) {
            console.error(err);
            return res.status(200).json({ message: 'Failed to upload photo', error: true });
        }

        // Menyimpan informasi story ke database
        connection.query('INSERT INTO stories (description, photo, lat, lon) VALUES (?, ?, ?, ?)', [description, fileName, lat, lon], (err, result) => {
            if (err) throw err;
            return res.status(201).json({ message: 'Story added successfully', error: false });
        });
    });
});

// Endpoint untuk mendapatkan semua stories
app.get('/stories', verifyToken, (req, res) => {
    const { page, size, location } = req.query;

    // Memeriksa parameter location (1 untuk mendapatkan stories dengan lokasi, 0 untuk semua stories)
    let query = 'SELECT * FROM stories';
    if (location === '1') {
        // Jika parameter location = 1, tambahkan kondisi untuk mendapatkan stories dengan lokasi
        query += ' WHERE lat IS NOT NULL AND lon IS NOT NULL';
    }

    // Menambahkan paging
    const offset = (page - 1) * size;
    query += ` LIMIT ${size} OFFSET ${offset}`;

    // Menjalankan query untuk mendapatkan stories
    connection.query(query, (err, results) => {
        if (err) throw err;
        return res.status(200).json({ stories: results });
    });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
