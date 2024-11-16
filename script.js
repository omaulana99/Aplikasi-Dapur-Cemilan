let cartCount = 0;
const cartItems = [];

// Fungsi untuk memformat harga dengan pemisah ribuan dan spasi setelah Rp
function formatCurrency(price) {
    return 'Rp ' + price.toLocaleString('id-ID'); // Format harga sesuai dengan mata uang Indonesia (Rp)
}

// Fungsi untuk menambah kuantitas produk di keranjang
function increaseQuantity(productName) {
    const quantityInput = document.getElementById(`quantity-${productName}`);
    let currentQuantity = parseInt(quantityInput.value);
    currentQuantity++;
    quantityInput.value = currentQuantity;
}

// Fungsi untuk mengurangi kuantitas produk di keranjang
function decreaseQuantity(productName) {
    const quantityInput = document.getElementById(`quantity-${productName}`);
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
        currentQuantity--;
        quantityInput.value = currentQuantity;
    }
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productName, price, image) {
    const quantity = parseInt(document.getElementById(`quantity-${productName}`).value);
    cartCount += quantity;
    document.getElementById("cart-count").textContent = cartCount;

    const productInCart = cartItems.find(item => item.name === productName);
    if (productInCart) {
        productInCart.quantity += quantity;
    } else {
        cartItems.push({ name: productName, price: price, image: image, quantity: quantity });
    }
    alert(`Produk ${productName} sebanyak ${quantity} ditambahkan ke keranjang!`);
}

// Fungsi untuk menghapus produk dari keranjang
function removeFromCart(productName) {
    const productIndex = cartItems.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        cartItems.splice(productIndex, 1);
        cartCount--;
        document.getElementById("cart-count").textContent = cartCount;
        alert(`Produk ${productName} telah dihapus dari keranjang!`);
        showCart(); // Menampilkan ulang keranjang setelah penghapusan
    }
}

// Fungsi untuk menampilkan keranjang belanja
function showCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalAmountContainer = document.getElementById("total-amount");
    cartItemsContainer.innerHTML = "";

    // Cek apakah keranjang kosong
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>Keranjang Anda kosong. Silakan pesan produk terlebih dahulu.</p>";
        totalAmountContainer.textContent = "Total: Rp 0";
        document.getElementById("cart-modal").style.display = "flex";
        return; // Jika kosong, hentikan eksekusi fungsi lebih lanjut
    }

    let totalAmount = 0;
    cartItems.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        // Menambahkan gambar produk terlebih dahulu
        const productImage = document.createElement("img");
        productImage.src = item.image;
        productImage.alt = item.name;
        productImage.classList.add("product-image"); // Menambahkan kelas untuk mengatur gaya gambar
        itemDiv.appendChild(productImage);

        // Membuat elemen untuk nama produk
        const productName = document.createElement("div");
        productName.classList.add("product-name");
        productName.textContent = item.name;

        // Membuat elemen untuk harga satuan
        const productPrice = document.createElement("div");
        productPrice.classList.add("product-price");
        productPrice.textContent = `Harga satuan: ${formatCurrency(item.price)}`;

        // Membuat elemen untuk kuantitas
        const productQuantity = document.createElement("div");
        productQuantity.classList.add("product-quantity");
        productQuantity.textContent = `Qyt: ${item.quantity}`;

        // Menambahkan tombol hapus
        const removeButton = document.createElement("button");
        removeButton.textContent = "Hapus";
        removeButton.classList.add("remove-button");
        removeButton.onclick = function() {
            removeFromCart(item.name); // Menghapus produk ketika tombol hapus diklik
        };

        // Menambahkan elemen-elemen tersebut ke dalam itemDiv
        itemDiv.appendChild(productName);
        itemDiv.appendChild(productPrice);
        itemDiv.appendChild(productQuantity);
        itemDiv.appendChild(removeButton); // Menambahkan tombol hapus ke dalam item

        // Menambahkan itemDiv ke container keranjang
        cartItemsContainer.appendChild(itemDiv);

        // Menghitung total harga
        totalAmount += item.price * item.quantity;
    });

    // Menampilkan total amount
    totalAmountContainer.textContent = `Total: ${formatCurrency(totalAmount)}`;

    // Menampilkan modal keranjang
    document.getElementById("cart-modal").style.display = "flex";

    // Menambahkan tombol untuk pengiriman lewat WhatsApp

     // Menampilkan total amount
     totalAmountContainer.textContent = `Total: ${formatCurrency(totalAmount)}`;
    
    // Menambahkan event listener untuk mengirim pesan lewat WhatsApp
    whatsappButton.onclick = function () {
        const orderDetails = cartItems.map(item =>
            `${item.name} - ${formatCurrency(item.price)}\nQyt: ${item.quantity}`
        ).join("\n\n"); // Memisahkan produk dengan dua baris kosong

        const message = encodeURIComponent(`Pesanan saya: \n${orderDetails}\n\nTotal Keseluruhan: ${formatCurrency(totalAmount)}`);
        window.open(`https://wa.me/6287877611218?text=${message}`, '_blank');
    };

    // Menambahkan tombol ke modal keranjang
    cartItemsContainer.appendChild(whatsappButton);
}

// Fungsi untuk membuka modal informasi selengkapnya
function viewMoreInfo() {
    document.getElementById("info-modal").style.display = "block";
}

// Fungsi untuk menutup modal informasi selengkapnya
function closeInfoModal() {
    document.getElementById("info-modal").style.display = "none";
}

// Fungsi untuk menutup modal keranjang
// Fungsi untuk menutup modal keranjang belanja
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Fungsi untuk membuka modal informasi lebih lanjut
function viewMoreInfo() {
    document.getElementById('info-modal').style.display = 'block';
}

// Fungsi untuk menutup modal informasi lebih lanjut
function closeInfoModal() {
    document.getElementById('info-modal').style.display = 'none';
}

// Fungsi untuk tombol Kembali ke Pesanan
function goBackToOrder() {
    // Menutup modal keranjang belanja
    document.getElementById('cart-modal').style.display = 'none';
    
    // Menampilkan bagian atau halaman pesanan kembali
    // Misalnya, menggulir ke atas atau ke bagian tertentu
    window.scrollTo(0, 0); // Gulir ke atas halaman
    alert('Kembali ke halaman pesanan');
}


// Fungsi untuk mengirim informasi selengkapnya ke WhatsApp (dari form)
document.getElementById("info-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah form disubmit secara default

    // Ambil nilai input dari form
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const paymentMethod = document.getElementById("payment-method").value;
    const calendar = document.getElementById("calendar").value;
    const time = document.getElementById("time").value;
    const receipt = document.getElementById("receipt").files[0]; // Bukti pembayaran

    // Jika bukti pembayaran ada, kita akan kirimkan pesan ke WhatsApp
    let message = `Pesanan saya:\n\n`;
    message += `Nama: ${name}\nNo HP: ${phone}\nAlamat: ${address}\nMetode Pembayaran: ${paymentMethod}\nTanggal Pesanan: ${calendar}\nJam Pesanan: ${time}`;

    // Menambahkan informasi bukti pembayaran jika ada
    if (receipt) {
        message += `\nBukti Pembayaran: [File Bukti Harap Kirim Kembali]`;
    }

    // Menambahkan informasi produk dari keranjang
    const orderDetails = cartItems.map(item =>
        `${item.name} - ${formatCurrency(item.price)}\nQyt: ${item.quantity}`
    ).join("\n\n");

    message += `\n\nPesanan Produk:\n${orderDetails}`;

    // Mengirimkan pesan ke WhatsApp
    const whatsappMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6287877611218?text=${whatsappMessage}`, '_blank');

    // Menutup modal setelah pengiriman
    closeInfoModal();
});
// Mendapatkan elemen produk dan input pencarian
function searchProduct() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        const productName = product.querySelector('h2').textContent.toLowerCase();
        
        // Menyembunyikan atau menampilkan produk berdasarkan pencarian
        if (productName.includes(searchInput)) {
            product.style.display = 'block'; // Menampilkan produk jika nama cocok dengan pencarian
        } else {
            product.style.display = 'none'; // Menyembunyikan produk jika nama tidak cocok
        }
    });
}
// Mendapatkan tanggal saat ini
function updateDate() {
    const currentDate = new Date(); // Membuat objek Date untuk tanggal sekarang
    const day = currentDate.getDate(); // Mendapatkan hari
    const month = currentDate.getMonth() + 1; // Mendapatkan bulan (dimulai dari 0, jadi perlu ditambah 1)
    const year = currentDate.getFullYear(); // Mendapatkan tahun
    
    // Format tanggal menjadi dd/mm/yyyy
    const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
    
    // Menampilkan tanggal di elemen dengan id "current-date"
    document.getElementById('current-date').textContent = formattedDate;
}

// Memanggil fungsi untuk update tanggal ketika halaman dimuat
window.onload = updateDate;
 // Filter produk berdasarkan kategori
 function filterProducts(category) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Pencarian produk
function searchProduct() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(input)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Tampilkan tanggal saat ini di footer
document.getElementById('current-date').innerText = new Date().getFullYear();