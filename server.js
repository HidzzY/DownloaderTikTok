const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Izin akses frontend
app.use(express.json());
app.use(express.static('public')); // Melayani file statis dari folder public

// Endpoint Proxy agar API asli tidak bocor ke client
app.post('/api/download', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ status: false, message: "URL TikTok wajib diisi!" });
    }

    try {
        // Pemanggilan API asli dilakukan di sisi server (Aman)
        const response = await axios.get(`https://api.siputzx.my.id/api/d/tiktok/v2?url=${encodeURIComponent(url)}`);
        
        // Kirim data ke frontend tanpa memberitahu URL API aslinya
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ status: false, message: "Gagal mengambil data dari server." });
    }
});

app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});