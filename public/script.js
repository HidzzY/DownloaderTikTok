let currentMode = 'tiktok';

// Fungsi Switch Tab
function switchTab(mode) {
    currentMode = mode;
    const tabTik = document.getElementById('tab-tiktok');
    const tabIg = document.getElementById('tab-instagram');
    const brandTitle = document.getElementById('brandTitle');
    const brandDesc = document.getElementById('brandDesc');
    const inputIcon = document.getElementById('inputIcon');
    const urlInput = document.getElementById('urlInput');
    const btnDownload = document.getElementById('btnDownload');
    const mainGlow = document.getElementById('mainGlow');

    urlInput.value = ''; // Reset input saat pindah tab

    if (mode === 'instagram') {
        // Mode Instagram
        tabIg.className = "flex-1 py-2.5 rounded-xl text-sm font-bold transition-all bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg";
        tabTik.className = "flex-1 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-all";
        
        brandTitle.innerText = "WsynapGram";
        brandDesc.innerText = "Download Reels & Photo Instagram";
        inputIcon.className = "fab fa-instagram h-5 w-5 text-gray-500 group-focus-within:text-purple-500 transition-colors";
        urlInput.placeholder = "tempel tautan instagram disini";
        
        btnDownload.classList.remove('btn-gradient');
        btnDownload.classList.add('btn-gradient-ig');
        mainGlow.style.background = "radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)";
    } else {
        // Mode TikTok
        tabTik.className = "flex-1 py-2.5 rounded-xl text-sm font-bold transition-all bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg";
        tabIg.className = "flex-1 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-all";
        
        brandTitle.innerText = "WsynapTik";
        brandDesc.innerText = "Fast, Secure, & No Watermark";
        inputIcon.className = "fab fa-tiktok h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors";
        urlInput.placeholder = "tempel tautan video disini";
        
        btnDownload.classList.remove('btn-gradient-ig');
        btnDownload.classList.add('btn-gradient');
        mainGlow.style.background = "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)";
    }
}

// Fungsi Penengah (Handler)
async function handleDownload() {
    if (currentMode === 'tiktok') {
        await downloadVideo();
    } else {
        await downloadInstagram();
    }
}

// Fungsi Error Toast
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

// Fungsi Download TikTok
async function downloadVideo() {
    const url = document.getElementById('urlInput').value;
    const inputSection = document.getElementById('inputSection');
    const resultSection = document.getElementById('resultSection');
    const contentDiv = document.getElementById('content');
    const loading = document.getElementById('loading');
    const btn = document.getElementById('btnDownload');

    if (!url) { showError("tempel dulu tautan nya!"); return; }

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
                            <div class="absolute bottom-2 right-2 bg-blue-600/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">Preview</div>
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
                                <div class="text-center"><p class="text-[10px] uppercase font-bold text-gray-500">Likes</p><p class="text-sm font-semibold text-white">${res.data.like_count || '0'}</p></div>
                                <div class="text-center"><p class="text-[10px] uppercase font-bold text-gray-500">Shares</p><p class="text-sm font-semibold text-white">${res.data.share_count || '0'}</p></div>
                                <div class="text-center"><p class="text-[10px] uppercase font-bold text-gray-500">Views</p><p class="text-sm font-semibold text-white">${res.data.play_count || '0'}</p></div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 gap-3">
                        <a href="${res.data.no_watermark_link}" download="${fileName}" class="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95">Download No Watermark</a>
                    </div>
                    <button onclick="backToHome()" class="w-full mt-4 text-gray-500 hover:text-white text-sm py-3 border border-dashed border-white/10 rounded-xl">← Download Lain</button>
                </div>`;
            loading.classList.add('hidden');
            contentDiv.classList.remove('hidden');
        } else {
            showError("Data tidak ditemukan."); backToHome();
        }
    } catch (err) {
        showError("Server lagi pusing!"); backToHome();
    } finally {
        btn.disabled = false;
    }
}

// Fungsi Download Instagram
async function downloadInstagram() {
    const url = document.getElementById('urlInput').value;
    const contentDiv = document.getElementById('content');
    const loading = document.getElementById('loading');
    const inputSection = document.getElementById('inputSection');
    const resultSection = document.getElementById('resultSection');
    const btn = document.getElementById('btnDownload');

    if (!url) { showError("tempel link instagram nya!"); return; }

    inputSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    loading.classList.remove('hidden');
    contentDiv.classList.add('hidden');
    btn.disabled = true;

    try {
        const response = await fetch(`https://ikyyzyyrestapi.my.id/download/instagram?apikey=kyzz&query=${encodeURIComponent(url)}`);
        const res = await response.json();

        if (res.status && res.result) {
            const dl = res.result.download_urls[0];
            contentDiv.innerHTML = `
                <div class="animate-fade-in space-y-6">
                    <div class="p-8 bg-[#1e1e1e]/50 backdrop-blur-md rounded-2xl border border-white/5 text-center shadow-2xl">
                        <div class="w-20 h-20 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-lg rotate-3">
                            <i class="fab fa-instagram text-4xl text-white"></i>
                        </div>
                        <h3 class="text-white font-bold text-xl mb-2">Media Berhasil Ditemukan!</h3>
                        <p class="text-gray-500 text-xs truncate px-4 mb-8 italic">Source: Instagram Media</p>
                        
                        <a href="${dl}" target="_blank" class="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-5 rounded-2xl transition-all shadow-xl active:scale-95 shadow-purple-500/20">
                            <i class="fas fa-download"></i> Download Sekarang
                        </a>
                    </div>
                    <button onclick="backToHome()" class="w-full mt-4 text-gray-500 hover:text-white text-sm py-3 border border-dashed border-white/10 rounded-xl">← Download Lainnya</button>
                </div>`;
            loading.classList.add('hidden');
            contentDiv.classList.remove('hidden');
        } else {
            showError("Media Instagram tidak ditemukan."); backToHome();
        }
    } catch (err) {
        showError("Gagal akses API Instagram!"); backToHome();
    } finally {
        btn.disabled = false;
    }
}

function backToHome() {
    document.getElementById('inputSection').classList.remove('hidden');
    document.getElementById('resultSection').classList.add('hidden');
    document.getElementById('urlInput').value = ''; 
}
