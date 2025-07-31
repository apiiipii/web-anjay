document.addEventListener('DOMContentLoaded', function() {
    const landingPage = document.getElementById('landingPage');
    const mainContent = document.getElementById('mainContent');
    const openInvitationBtn = document.getElementById('openInvitationBtn');
    const backgroundMusic = document.getElementById('background-music');
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    const rsvpForm = document.getElementById('rsvpForm');
    const rsvpMessage = document.getElementById('rsvpMessage');
    const numGuestsGroup = document.getElementById('numGuestsGroup');
    const attendYesRadio = document.getElementById('attendYes');
    const attendNoRadio = document.getElementById('attendNo');
    const countdownElement = document.getElementById('countdown');
    const copyButtons = document.querySelectorAll('.btn-copy');

    // --- 1. Buka Undangan & Putar Musik ---
    openInvitationBtn.addEventListener('click', function() {
        landingPage.style.display = 'none';
        mainContent.style.display = 'block';
        backgroundMusic.play().catch(error => {
            console.log("Autoplay prevented. User interaction required:", error);
            // Anda bisa menampilkan pesan ke user untuk memutar musik secara manual
        });
        // Scroll ke bagian atas main content
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 2. Toggle Musik ---
    let isPlaying = true; // Asumsi musik mulai otomatis setelah tombol dibuka
    musicToggleBtn.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            backgroundMusic.play();
            musicToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        isPlaying = !isPlaying;
    });

    // --- 3. Countdown Timer ---
    const weddingDate = new Date('2025-11-22T09:00:00').getTime(); // Ganti dengan tanggal dan waktu pernikahan Anda

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            countdownElement.innerHTML = "<h3>Kami Telah Menikah!</h3>";
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div>${days}<span>Hari</span></div>
            <div>${hours}<span>Jam</span></div>
            <div>${minutes}<span>Menit</span></div>
            <div>${seconds}<span>Detik</span></div>
        `;
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Panggil pertama kali agar langsung tampil

    // --- 4. RSVP Form (Contoh Frontend Saja) ---
    attendYesRadio.addEventListener('change', function() {
        if (this.checked) {
            numGuestsGroup.style.display = 'block';
        }
    });

    attendNoRadio.addEventListener('change', function() {
        if (this.checked) {
            numGuestsGroup.style.display = 'none';
        }
    });

    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah form submit secara default (reload halaman)

        const guestName = document.getElementById('guestName').value;
        const attendance = document.querySelector('input[name="attendance"]:checked').value;
        const numGuests = document.getElementById('numGuests').value;
        const message = document.getElementById('message').value;

        // Di sini Anda akan mengirim data ini ke server (backend)
        // Contoh: Menggunakan Fetch API
        /*
        fetch('/api/rsvp', { // Ganti dengan endpoint API Anda
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ guestName, attendance, numGuests, message }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            rsvpMessage.textContent = 'Terima kasih, konfirmasi Anda telah terkirim!';
            rsvpMessage.style.backgroundColor = '#d4edda';
            rsvpMessage.style.color = '#155724';
            rsvpMessage.style.display = 'block';
            rsvpForm.reset(); // Reset form
            // Tambahkan ucapan ke guestbook display secara dinamis (opsional)
            // appendToGuestbook(guestName, message);
        })
        .catch((error) => {
            console.error('Error:', error);
            rsvpMessage.textContent = 'Terjadi kesalahan saat mengirim konfirmasi. Silakan coba lagi.';
            rsvpMessage.style.backgroundColor = '#f8d7da';
            rsvpMessage.style.color = '#721c24';
            rsvpMessage.style.display = 'block';
        });
        */

        // --- Demo Tanpa Backend (hanya tampilkan pesan berhasil) ---
        console.log({ guestName, attendance, numGuests, message });
        rsvpMessage.textContent = 'Terima kasih, konfirmasi Anda telah terkirim!';
        rsvpMessage.style.backgroundColor = '#d4edda';
        rsvpMessage.style.color = '#155724';
        rsvpMessage.style.display = 'block';
        rsvpForm.reset(); // Reset form

        // Sembunyikan pesan setelah beberapa detik
        setTimeout(() => {
            rsvpMessage.style.display = 'none';
        }, 5000);

        // Tambahkan ucapan ke guestbook display secara dinamis (opsional)
        // Jika tidak ada backend, ini hanya akan menambah di sisi client
        if (message) {
             const guestbookList = document.getElementById('guestbookList');
             const newItem = document.createElement('div');
             newItem.classList.add('guestbook-item');
             newItem.innerHTML = `
                 <p class="gb-name">${guestName || 'Anonim'}</p>
                 <p class="gb-message">${message}</p>
             `;
             guestbookList.prepend(newItem); // Tambahkan di paling atas
        }
    });

    // --- 5. Copy Rekening ---
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const textToCopy = document.getElementById(targetId).textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                alert('Nomor rekening berhasil disalin!');
            }).catch(err => {
                console.error('Gagal menyalin:', err);
            });
        });
    });

    // --- 6. Smooth Scroll untuk Navigasi ---
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Tutup menu mobile setelah klik
            if (window.innerWidth <= 768) {
                const navLinks = document.querySelector('.nav-links');
                navLinks.classList.remove('active');
            }
        });
    });

    // --- 7. Hamburger Menu (untuk mobile) ---
    // Tambahkan tombol hamburger di HTML jika ingin
    // Contoh penambahan secara manual di HTML:
    // <button class="hamburger-menu" id="hamburgerMenu"><i class="fas fa-bars"></i></button>
    const navLinks = document.querySelector('.nav-links');
    const navBrand = document.querySelector('.nav-brand');
    
    // Create hamburger button dynamically for simplicity here
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.classList.add('hamburger-menu');
    hamburgerBtn.id = 'hamburgerMenu';
    hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
    navBrand.appendChild(hamburgerBtn); // Add it next to brand or where you prefer

    hamburgerBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = hamburgerBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); // Ikon silang saat terbuka
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars'); // Ikon baris saat tertutup
        }
    });

});