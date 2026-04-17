function showError(message) {
    const inputWrapper = document.querySelector('.group');
    const urlInput = document.getElementById('urlInput');
    
    inputWrapper.classList.add('animate-shake');
    urlInput.classList.add('border-red-500/50', 'bg-red-500/5');
    
    const toast = document.createElement('div');
    toast.className = 'absolute -top-12 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xl animate-fade-in z-50 whitespace-nowrap';
    toast.innerHTML = `<div class="flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        ${message}
    </div>`;
    
    inputWrapper.appendChild(toast);

    setTimeout(() => {
        inputWrapper.classList.remove('animate-shake');
        urlInput.classList.remove('border-red-500/50', 'bg-red-500/5');
        toast.remove();
    }, 3000);
}

async function downloadVideo() {
    const url = document.getElementById('urlInput').value;
    const inputSection = document.getElementById('inputSection');
    const resultSection = document.getElementById('resultSection');
    const contentDiv = document.getElementById('content');
    const loading = document.getElementById('loading');
    const btn = document.getElementById('btnDownload');

    if (!url) {
        showError("tempel dulu tautan nya!");
        return;
    }

    inputSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    
    loading.classList.remove('hidden');
    contentDiv.classList.add('hidden');
    contentDiv.innerHTML = '';
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
            const fileName = `WsynapTik_@${cleanNick}_${res.data.itemId}.mp4`;

            contentDiv.innerHTML = `
                <div class="animate-fade-in space-y-6">
                    <div class="flex flex-col sm:flex-row gap-5 p-5 bg-[#1e1e1e]/50 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl">
                        <div class="relative w-full sm:w-40 flex-shrink-0">
                            <img src="${res.data.cover_link}" class="w-full h-56 sm:h-40 object-cover rounded-xl shadow-lg border border-gray-800">
                            <div class="absolute bottom-2 right-2 bg-blue-600/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                                Thumb
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
                           class="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-green-500/20 active:scale-95">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                            </svg>
                            Download No Watermark
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

                    <button onclick="backToHome()" class="w-full mt-4 text-gray-500 hover:text-white text-sm font-medium transition-all py-3 border border-dashed border-white/10 rounded-xl hover:bg-white/5">
                        ← Download Video Lain
                    </button>
                </div>
            `;
            
            loading.classList.add('hidden');
            contentDiv.classList.remove('hidden');
        } else {
            showError("Data tidak ditemukan. Link salah?");
            backToHome();
        }
    } catch (err) {
        showError("Yah, server lagi pusing. Coba lagi!");
        backToHome();
    } finally {
        btn.disabled = false;
        btn.innerHTML = `<span>Gas Download</span><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>`;
    }
}

function backToHome() {
    document.getElementById('inputSection').classList.remove('hidden');
    document.getElementById('resultSection').classList.add('hidden');
    document.getElementById('urlInput').value = ''; 
}
