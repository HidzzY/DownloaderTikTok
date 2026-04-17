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
        const response = await fetch('/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const res = await response.json();

        if (res.status && res.data) {
            // Format Nama File: ssstik.io_@username_ID.mp4
            const cleanNick = (res.data.author_nickname || 'user').replace(/\s+/g, '');
            const fileName = `ssstik.io_@${cleanNick}_${res.data.itemId}.mp4`;

            // Render Tampilan ala SSSTik
            contentDiv.innerHTML = `
                <div class="flex flex-col items-center animate-fade-in">
                    <div class="flex items-center gap-3 mb-6 w-full p-4 bg-[#191919] rounded-2xl border border-gray-800">
                        <img src="${res.data.author_cover_link}" class="w-12 h-12 rounded-full border border-gray-700 shadow-md">
                        <div class="text-left overflow-hidden">
                            <p class="font-bold text-white leading-tight truncate">@${res.data.author_nickname || 'TikTok User'}</p>
                            <p class="text-xs text-gray-400 mt-1 line-clamp-1">${res.data.text || ''}</p>
                        </div>
                    </div>

                    <div class="relative w-full mb-6 group">
                        <img src="${res.data.cover_link}" class="w-full max-h-60 object-cover rounded-2xl shadow-2xl border border-gray-800">
                        <div class="absolute inset-0 bg-black/20 rounded-2xl"></div>
                    </div>

                    <div class="w-full space-y-3">
                        <a href="${res.data.no_watermark_link}" 
                           download="${fileName}"
                           class="flex items-center justify-center gap-2 w-full bg-[#2ecc71] hover:bg-[#27ae60] text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95">
                           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                           Tanpa Watermark
                        </a>
                        
                        <a href="${res.data.no_watermark_link_hd || res.data.no_watermark_link}" 
                           download="${fileName}"
                           class="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all active:scale-95">
                           Tanpa Watermark [HD]
                        </a>

                        <a href="${res.data.music_link}" 
                           download="music_${res.data.itemId}.mp3"
                           class="flex items-center justify-center w-full bg-[#191919] border border-gray-700 hover:bg-gray-800 text-white py-3 rounded-xl transition-all">
                           Download MP3
                        </a>
                    </div>
                    
                    <button onclick="window.location.reload()" class="mt-6 text-sm text-gray-500 hover:text-white transition-colors underline">
                        Download Video Lainnya
                    </button>
                </div>
            `;
            
            loading.classList.add('hidden');
            contentDiv.classList.remove('hidden');
        } else {
            alert("Gagal mendapatkan data. Pastikan link benar.");
            resultDiv.classList.add('hidden');
        }
    } catch (err) {
        alert("Terjadi kesalahan server.");
        resultDiv.classList.add('hidden');
    } finally {
        btn.disabled = false;
        btn.innerText = "Download Sekarang";
    }
}
