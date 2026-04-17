async function downloadVideo() {
    const url = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('result');
    const contentDiv = document.getElementById('content');
    const loading = document.getElementById('loading');
    const btn = document.getElementById('btnDownload');

    if (!url) return alert("Masukkan URL!");

    // UI Feedback
    resultDiv.classList.remove('hidden');
    loading.classList.remove('hidden');
    contentDiv.classList.add('hidden');
    btn.disabled = true;
    btn.innerText = "Loading...";

    try {
        // Memanggil server kita sendiri (Proxy)
        const response = await fetch('/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const res = await response.json();

        if (res.status && res.data) {
            document.getElementById('cover').src = res.data.cover_link;
            document.getElementById('title').innerText = res.data.text || "TikTok Video";
            document.getElementById('dlLink').href = res.data.no_watermark_link;
            
            loading.classList.add('hidden');
            contentDiv.classList.remove('hidden');
        } else {
            alert("Gagal mendapatkan data. Pastikan link benar.");
        }
    } catch (err) {
        alert("Terjadi kesalahan server.");
    } finally {
        btn.disabled = false;
        btn.innerText = "Download Sekarang";
    }
}