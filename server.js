const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 

app.post('/api/download', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ status: false, message: "URL TikTok wajib diisi!" });
    }

    try {
        const targetUrl = process.env.API_URL || 'https://api.siputzx.my.id/api/d/tiktok/v2';
        const response = await axios.get(`${targetUrl}?url=${encodeURIComponent(url)}`);
        
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching dari API Siputzx:", error.message);
        res.status(500).json({ status: false, message: "Gagal mengambil data dari server." });
    }
});

app.post('/api/instagram', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ status: false, message: "URL Instagram wajib diisi!" });
    }

    try {
        const response = await axios.get(`https://ikyyzyyrestapi.my.id/download/instagram?apikey=kyzz&query=${encodeURIComponent(url)}`);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching dari API Instagram:", error.message);
        res.status(500).json({ status: false, message: "Gagal akses API Instagram!" });
    }
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server jalan di http://localhost:${PORT}`);
    });
}
