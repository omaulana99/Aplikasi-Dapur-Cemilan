// Fungsi untuk menampilkan kotak bantuan
document.addEventListener("DOMContentLoaded", function() {
    const helpBox = document.getElementById("help-box");
    const openHelpBtn = document.getElementById("open-help-btn");

    // Menampilkan kotak bantuan setelah beberapa detik
    setTimeout(function() {
        helpBox.style.display = "block";
    }, 3000); // 3 detik setelah halaman dimuat

    // Fungsi untuk mengarahkan ke kontak WhatsApp
    openHelpBtn.addEventListener("click", function() {
        window.location.href = "https://wa.me/6287877611218"; // Ganti dengan nomor WhatsApp toko
    });
});
