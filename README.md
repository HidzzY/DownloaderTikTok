# 🚀 WsynapTik Downloader

<p align="center">
  <img src="https://files.catbox.moe/437dlg.jpg" alt="WsynapTik Logo" width="120" style="border-radius: 50%">
</p>

<p align="center">
  <strong>Fast, Secure, & No Watermark TikTok Video Downloader</strong><br>
  Nikmati kemudahan mengunduh konten TikTok favoritmu dalam kualitas HD tanpa gangguan watermark.
</p>

<p align="center">
  <a href="https://wsynaptik.vercel.app">🌐 Live Demo</a> •
  <a href="#-fitur-utama">✨ Fitur</a> •
  <a href="#-struktur-proyek">📁 Struktur</a> •
  <a href="#-developer">👨‍💻 Developer</a>
</p>

---

## ✨ Fitur Utama
* **No Watermark:** Unduh video bersih tanpa logo TikTok yang mengganggu.
* **High Definition (HD):** Mendukung pengambilan file dengan resolusi asli tertinggi.
* **MP3 Conversion:** Ekstrak audio berkualitas tinggi langsung dari tautan video.
* **Glassmorphism UI:** Antarmuka modern dengan efek *blur* dan *glow* yang mewah.
* **Responsive Design:** Optimal diakses dari HP (Android/iOS) maupun Desktop.
* **Fast API Integration:** Proses pengambilan data video yang cepat dan stabil.

## 🛠️ Stack Teknologi
* **Frontend:** HTML5, [Tailwind CSS](https://tailwindcss.com), JavaScript Vanilla.
* **Backend:** [Node.js](https://nodejs.org) & Express.js untuk API handling.
* **Icons:** [Font Awesome 6](https://fontawesome.com).
* **Fonts:** Inter & Poppins Google Fonts.
* **Deployment:** [Vercel](https://vercel.com).

## 📁 Struktur Proyek
Proyek ini dikelola dengan struktur yang modular dan rapi:
```text
TIKTOK DOWNLOADER
├── public/
│   ├── index.html   # Kerangka utama UI dengan Tailwind & Glassmorphism
│   ├── script.js    # Logika frontend, interaksi DOM, & Fetch API
│   └── style.css    # Kustomisasi animasi & background grid
├── .env             # File sensitif untuk API Key (Don't share this!)
├── .gitignore       # Mencegah file sampah/sensitif terupload ke Git
├── package.json     # Daftar dependensi & script runner Node.js
├── server.js        # Server backend untuk menjembatani request ke API
└── vercel.json      # Konfigurasi runtime untuk deployment di Vercel
