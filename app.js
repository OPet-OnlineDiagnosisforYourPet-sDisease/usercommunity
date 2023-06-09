const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const { Storage } = require('@google-cloud/storage');
const moment = require('moment-timezone');

const app = express();
const port = 8080;

// Konfigurasi koneksi MySQL
const connection = mysql.createConnection({
    host: '35.222.154.226', // Ganti dengan host MySQL Anda
    user: 'root', // Ganti dengan username MySQL Anda
    password: 'rahman552', // Ganti dengan password MySQL Anda
    database: 'database_usercommunity', // Ganti dengan nama database MySQL Anda
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Konfigurasi Google Cloud Storage
const storage = new Storage({
    keyFilename: 'service_account.json', // Ganti dengan nama file kunci GCP Anda
    projectId: 'opet-app', // Ganti dengan ID proyek Google Cloud Anda
});

// Middleware untuk mengurai body request dalam format x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Middleware untuk verifikasi token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(200).json({ error: true, message: 'No token provided' });
    }

    jwt.verify(token, 'secret-key', (err, decoded) => {
        if (err) {
            return res.status(200).json({ error: true, message: 'Invalid token' });
        }

        req.decoded = decoded;
        next();
    });
}

// Fungsi untuk menghasilkan token JWT
function generateToken(user) {
    const payload = {
        email: user.email,
    };
    return jwt.sign(payload, 'secret-key');
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
            const { email, name, profil } = results[0];

            // Generate token JWT
            const user = { email };
            const token = generateToken(user);

            return res.status(200).json({
                message: 'Login successful',
                error: false,
                loginResult: { email, username: name, profil, token },
            });
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

    // Melakukan penyimpanan foto ke Google Cloud Storage
    const bucketName = 'photocommunity'; // Ganti dengan nama bucket Google Cloud Storage Anda
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    photo.mv(`./photos/${fileName}`, (err) => {
        if (err) {
            console.error(err);
            return res.status(200).json({ message: 'Failed to upload photo', error: true });
        }

        // Mengunggah file foto ke Google Cloud Storage
        bucket.upload(`./photos/${fileName}`, (err, uploadedFile) => {
            if (err) {
                console.error(err);
                return res.status(200).json({ message: 'Failed to upload photo', error: true });
            }

            const fileUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

            // Menyimpan informasi foto ke tabel photo
            connection.query('INSERT INTO photo (file_name, file_url) VALUES (?, ?)', [fileName, fileUrl], (err, result) => {
                if (err) throw err;

                // Mendapatkan waktu saat ini sesuai zona waktu pengguna
                const userTime = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

                // Menyimpan informasi story ke database
                connection.query(
                    'INSERT INTO stories (description, photo, lat, lon, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?)', [description, fileUrl, lat, lon, req.decoded.email, userTime],
                    (err, result) => {
                        if (err) throw err;
                        res.status(201).json({ message: 'Story added successfully', error: false });
                    }
                );
            });
        });
    });
});

// Endpoint untuk mengunggah foto profil
app.post('/profile/photo', verifyToken, (req, res) => {
    if (!req.files || !req.files.profilePhoto) {
        return res.status(200).json({ message: 'Please provide a valid image file', error: true });
    }

    const { profilePhoto } = req.files;

    const fileName = profilePhoto.name;

    const bucketName = 'photoprofil'; // Ganti dengan nama bucket Google Cloud Storage Anda
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    profilePhoto.mv(`./photos/${fileName}`, (err) => {
        if (err) {
            console.error(err);
            return res.status(200).json({ message: 'Failed to upload profile photo', error: true });
        }

        bucket.upload(`./photos/${fileName}`, (err, uploadedFile) => {
            if (err) {
                console.error(err);
                return res.status(200).json({ message: 'Failed to upload profile photo', error: true });
            }

            const profil = `https://storage.googleapis.com/${bucketName}/${fileName}`;

            // Menyimpan informasi foto profil ke database
            connection.query(
                'UPDATE users SET profil = ? WHERE email = ?', [profil, req.decoded.email],
                (err, result) => {
                    if (err) throw err;

                    res.status(200).json({ message: 'Profile photo uploaded successfully', profil, error: false });
                }
            );
        });
    });
});


// Endpoint untuk mendapatkan semua stories dengan pagination
app.get('/stories', (req, res) => {
    const { page, size, email } = req.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(size) || 50;
    const offset = (pageNumber - 1) * pageSize;

    const { location } = req.query;
    let query =
        'SELECT stories.*, users.name AS sender_name, users.profil AS sender_profil, COUNT(likes.id) AS like_count FROM stories JOIN users ON stories.user_id = users.email LEFT JOIN likes ON stories.id = likes.story_id';

    if (location && location === '1') {
        query += ' WHERE stories.lat IS NOT NULL AND stories.lon IS NOT NULL';
    }

    if (email) {
        query += ` WHERE users.email = '${email}'`;
    }

    // Menambahkan pengurutan berdasarkan ID secara descending
    query += ' GROUP BY stories.id ORDER BY stories.id DESC';

    connection.query(query, (error, results) => {
        if (error) throw error;

        const totalCount = results.length;
        const totalPages = Math.ceil(totalCount / pageSize);

        // Mengambil data stories dengan paging
        query += ` LIMIT ${pageSize} OFFSET ${offset}`;

        connection.query(query, (error, results) => {
            if (error) throw error;

            // Ubah format waktu menjadi waktu Indonesia
            const formattedResults = results.map(result => ({
                ...result,
                created_at: moment.utc(result.created_at).tz('Asia/Jakarta').format('MMM D, YYYY, h:mm:ss A')
            }));

            const promises = formattedResults.map(formattedResult => {
                return new Promise((resolve, reject) => {
                    const storyId = formattedResult.id;

                    // Mengambil jumlah komentar dari database berdasarkan story_id
                    connection.query(
                        'SELECT COUNT(*) AS comment_count FROM comments WHERE story_id = ?', [storyId],
                        (error, commentCountResult) => {
                            if (error) reject(error);

                            const commentCount = commentCountResult[0].comment_count;
                            formattedResult.comment_count = commentCount;

                            resolve();
                        }
                    );
                });
            });

            Promise.all(promises)
                .then(() => {
                    return res.status(200).json({
                        error: false,
                        message: 'Stories berhasil didapatkan',
                        stories: formattedResults,
                    });
                })
                .catch((error) => {
                    throw error;
                });
        });
    });
});

// Endpoint untuk menampilkan stories berdasarkan id stories
app.get('/stories/:id', (req, res) => {
    const storyId = req.params.id;
    // Mengambil data story dari database berdasarkan ID
    connection.query(
        'SELECT stories.*, users.name AS sender_name, users.profil AS sender_profil  FROM stories JOIN users ON stories.user_id = users.email WHERE stories.id = ? GROUP BY stories.id', [storyId],
        (error, results) => {
            if (error) throw error;

            if (results.length > 0) {
                const story = results[0];
                const formattedResults = results.map(result => ({
                    ...result,
                    created_at: moment(result.created_at).tz('Asia/Jakarta').format('MMM D, YYYY, h:mm:ss A')
                }));


                // Mengambil jumlah komentar dari database berdasarkan story_id
                connection.query(
                    'SELECT COUNT(*) AS comment_count FROM comments WHERE story_id = ?', [storyId],
                    (error, commentCountResult) => {
                        if (error) throw error;

                        const commentCount = commentCountResult[0].comment_count;

                        // Mengambil data komentar dari database berdasarkan story_id
                        connection.query(
                            'SELECT comments.*, users.name AS commenter_name, users.profil AS commenter_profil, comments.created_at AS comment_time FROM comments JOIN users ON comments.user_email = users.email WHERE comments.story_id = ? ORDER BY comments.created_at', [storyId],
                            (error, commentResults) => {
                                if (error) throw error;

                                const comments = commentResults.map((comment) => ({
                                    id: comment.id,
                                    story_id: comment.story_id,
                                    user_email: comment.user_email,
                                    comment: comment.comment,
                                    commenter_name: comment.commenter_name,
                                    commenter_profil: comment.commenter_profil,
                                    comment_time: moment.utc(comment.comment_time).tz('Asia/Jakarta').format('MMM D, YYYY, h:mm:ss A'),
                                }));

                                formattedResults[0].comments = comments;
                                formattedResults[0].comment_count = commentCount;
                                formattedResults[0].user_profile = story.sender_profil;

                                return res.status(200).json({
                                    error: false,
                                    message: 'Story berhasil didapatkan',
                                    story: formattedResults[0],
                                    user_profile: story.sender_profil, // Tambahkan foto profil pengguna
                                });
                            }
                        );
                    }
                );
            } else {
                return res.status(200).json({
                    error: true,
                    message: 'Story tidak ditemukan',
                    story: null,
                });
            }
        }
    );
});




// Endpoint untuk memberikan komentar pada story
app.post('/stories/:id/comment', verifyToken, (req, res) => {
    const storyId = req.params.id;
    const { comment } = req.body;
    const userEmail = req.decoded.email;
    const userTime = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'); // Mengambil waktu saat ini sesuai zona waktu pengguna

    // Menyimpan komentar ke database
    connection.query(
        'INSERT INTO comments (story_id, user_email, comment, created_at) VALUES (?, ?, ?, ?)', [storyId, userEmail, comment, userTime],
        (err, result) => {
            if (err) throw err;

            return res.status(200).json({ message: 'Comment added successfully', error: false });
        }
    );
});


// Endpoint untuk menghapus komentar pada story
app.delete('/stories/:id/comment/:commentId', verifyToken, (req, res) => {
    const storyId = req.params.id;
    const commentId = req.params.commentId;
    const userEmail = req.decoded.email;

    // Menghapus komentar dari database
    connection.query(
        'DELETE FROM comments WHERE id = ? AND story_id = ? AND user_email = ?', [commentId, storyId, userEmail],
        (err, result) => {
            if (err) throw err;

            return res.status(200).json({ message: 'Comment removed successfully', error: false });
        }
    );
});

// Endpoint untuk membagikan story
app.post('/stories/:id/share', verifyToken, (req, res) => {
    const storyId = req.params.id;
    const userEmail = req.decoded.email;

    // Menyimpan data share ke database
    connection.query(
        'INSERT INTO shares (story_id, user_email) VALUES (?, ?)', [storyId, userEmail],
        (err, result) => {
            if (err) throw err;

            return res.status(200).json({ message: 'Story shared successfully', error: false });
        }
    );
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
