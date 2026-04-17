const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Tambahan agar bisa baca file .env

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());

// Menggunakan path.join agar Vercel tidak bingung mencari folder public
app.use(express.static(path.join(__dirname, 'public'))); 

// Endpoint Proxy agar API asli tidak bocor ke client
app.post('/api/download', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ status: false, message: "URL TikTok wajib diisi!" });
    }

    try {
        // Menggunakan variabel env atau fallback ke URL asli jika env tidak ada
        const targetUrl = process.env.API_URL || 'https://api.siputzx.my.id/api/d/tiktok/v2';
        
        // Pemanggilan API asli dilakukan di sisi server (Aman)
        const response = await axios.get(`${targetUrl}?url=${encodeURIComponent(url)}`);
        
        // Kirim data ke frontend tanpa memberitahu URL API aslinya
        res.json(response.data);
    } catch (error) {
        // Memberikan detail error yang lebih baik untuk debugging
        console.error("Error fetching dari API Siputzx:", error.message);
        res.status(500).json({ status: false, message: "Gagal mengambil data dari server." });
    }
});

// Export untuk Vercel (Penting agar serverless function jalan)
module.exports = app;

app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});
