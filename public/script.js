async function downloadVideo() {
    const url = document.getElementById('urlInput').value;
    const inputSection = document.getElementById('inputSection');
    const resultSection = document.getElementById('resultSection');
    const contentDiv = document.getElementById('content');
    const loading = document.getElementById('loading');
    const btn = document.getElementById('btnDownload');

    if (!url) return alert("Tempelkan link TikTok dulu!");

    // PINDAH KE HALAMAN 2 (Result Page)
    inputSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    
    // UI Loading State
    loading.classList.remove('hidden');
    contentDiv.classList.add('hidden');
    contentDiv.innerHTML = ''; // Bersihkan konten lama
    btn.disabled = true;

    try {
        const response = await fetch('/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const res = await response.json();

        if (res.status && res.data) {
            const cleanNick = (res.data.author_nickname || 'user').replace(/\s+/g, '');
            const fileName = `ssstik.io_@${cleanNick}_${res.data.itemId}.mp4`;

            // Render Tampilan Premium di Halaman 2
            contentDiv.innerHTML = `
                <div class="animate-fade-in space-y-6">
                    <div class="flex flex-col sm:flex-row gap-5 p-5 bg-[#1e1e1e] rounded-2xl border border-white/5 shadow-xl">
                        <div class="relative w-full sm:w-40 flex-shrink-0">
                            <img src="${res.data.cover_link}" class="w-full h-56 sm:h-40 object-cover rounded-xl shadow-lg border border-gray-800">
                            <div class="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                                Preview
                            </div>
                        </div>

                        <div class="flex flex-col justify-between text-left py-1 overflow-hidden">
                            <div>
                                <h3 class="text-white font-bold text-lg mb-1 line-clamp-2 leading-snug">${res.data.text || 'TikTok Video'}</h3>
                                <div class="flex items-center gap-2 mt-2">
                                    <img src="${res.data.author_cover_link}" class="w-6 h-6 rounded-full border border-gray-600">
                                    <span class="text-blue-400 font-medium text-sm truncate">@${res.data.author_nickname}</span>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/5 text-gray-400">
                                <div class="text-center">
                                    <p class="text-[10px] uppercase font-bold text-gray-500">Likes</p>
                                    <p class="text-sm font-semibold text-white">${res.data.like_count || '0'}</p>
                                </div>
                                <div class="text-center">
                                    <p class="text-[10px] uppercase font-bold text-gray-500">Shares</p>
                                    <p class="text-sm font-semibold text-white">${res.data.share_count || '0'}</p>
                                </div>
                                <div class="text-center">
                                    <p class="text-[10px] uppercase font-bold text-gray-500">Views</p>
                                    <p class="text-sm font-semibold text-white">${res.data.play_count || '0'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-3">
                        <a href="${res.data.no_watermark_link}" 
                           download="${fileName}" 
                           class="flex items-center justify-center gap-3 bg-[#2ecc71] hover:bg-[#27ae60] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-green-500/20 active:scale-95">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                            </svg>
                            Download Video (No WM)
                        </a>

                        <div class="grid grid-cols-2 gap-3">
                            <a href="${res.data.no_watermark_link_hd || res.data.no_watermark_link}" 
                               download="${fileName}" 
                               class="flex items-center justify-center gap-2 bg-[#2980b9] hover:bg-[#3498db] text-white font-semibold py-3.5 rounded-xl transition-all active:scale-95">
                                <span class="text-xs uppercase font-bold tracking-wider">HD Quality</span>
                            </a>
                            <a href="${res.data.music_link}" 
                               download="music_${res.data.itemId}.mp3" 
                               class="flex items-center justify-center gap-2 bg-[#333] hover:bg-[#444] text-white font-semibold py-3.5 rounded-xl transition-all active:scale-95">
                                <span class="text-xs uppercase font-bold tracking-wider">Audio MP3</span>
                            </a>
                        </div>
                    </div>

                    <button onclick="backToHome()" class="w-full mt-4 text-gray-500 hover:text-white text-sm font-medium transition-all py-2 border border-dashed border-white/5 rounded-xl">
                        Cari Video Lain
                    </button>
                </div>
            `;
            
            loading.classList.add('hidden');
            contentDiv.classList.remove('hidden');
        } else {
            alert("Gagal mendapatkan data. Link tidak valid.");
            backToHome();
        }
    } catch (err) {
        alert("Terjadi kesalahan server.");
        backToHome();
    } finally {
        btn.disabled = false;
        btn.innerText = "Mulai Download";
    }
}

// FUNGSI UNTUK KEMBALI KE HALAMAN INPUT
function backToHome() {
    document.getElementById('inputSection').classList.remove('hidden');
    document.getElementById('resultSection').classList.add('hidden');
    document.getElementById('urlInput').value = ''; // Reset input link
}
