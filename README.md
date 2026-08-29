# 🌶️ Toko Bumbu Digital - Web Katalog & Generator Nota Otomatis

Aplikasi web modern yang dibuat khusus untuk memecahkan kendala penjual bumbu dan rempah pasar tradisional yang kelelahan menulis nota pesanan secara manual di kertas.

---

## ✨ Fitur Unggulan

1. **Katalog Bumbu & Rempah Khusus Pasar**:
   - Pilihan bumbu giling (Rendang, Opor, Gulai, Rawon, Balado), rempah kering/bubuk, bawang, cabai, dan pelengkap masakan.
   - Pilihan takaran fleksibel: **1 Ons (100 gr), 1/4 Kg, 1/2 Kg, 1 Kg, atau per Ikat/Bungkus**.
2. **Form Catatan Khusus**:
   - Pembeli bisa menambahkan preferensi masakan (*"Pedas sedang"*, *"Tanpa kunyit"*, *"Bawang minta dikupas"*).
3. **Pilihan Pengambilan & Pembayaran**:
   - 🏪 **Ambil Sendiri di Lapak/Outlet Pasar** (Gratis ongkir) atau 🛵 **Diantar Kurir Pasar**.
   - 📱 **QRIS**, 🏦 **Transfer Bank**, atau 💵 **Bayar di Outlet (Tunai)**.
4. **Generator Nota Digital Otomatis (Format Kasir Thermal / PDF)**:
   - Membuat no. nota unik otomatis (`#BMB-YYMMDD-XXX`).
   - Tombol **Cetak / Simpan PDF Struk** standar printer kasir thermal (58mm / 80mm).
5. **Direct WhatsApp Checkout**:
   - Satu klik tombol *"Kirim Pesanan"*, seluruh rincian nota langsung terkirim dengan teks rapi ke WhatsApp pemilik lapak.
6. **Panel Admin Pemilik Toko (Mode Penjual)**:
   - Ubah harga harian komoditas (cabai, bawang, rempah) dengan cepat.
   - Tambah produk bumbu baru.
   - Ubah nomor WhatsApp dan alamat toko.
   - Rekap daftar pesanan masuk harian dengan status pemrosesan.

---

## 🚀 Cara Menjalankan Aplikasi

Anda memiliki 2 cara mudah untuk menjalankannya:

### Opsi 1: Menjalankan via Server Lokal (Rekomendasi)
Buka terminal / PowerShell di folder ini, lalu jalankan:
```bash
npm start
```
atau
```bash
node server.js
```
Lalu buka browser di alamat: **`http://localhost:3000`**

### Opsi 2: Buka Langsung Tanpa Install Apapun
Cukup klik dua kali (double-click) file **`index.html`** di Windows Explorer untuk membukanya langsung di Google Chrome / Microsoft Edge / Firefox!

---

## ⚙️ Mengganti Nomor WhatsApp & Info Lapak

1. Buka web aplikasi di browser.
2. Klik tombol **`⚙️ Mode Penjual`** di pojok kanan atas.
3. Masuk ke tab **`🏬 Info Toko & WA`**.
4. Masukkan nomor WhatsApp pemilik lapak (gunakan format `628xxxxxxxxxx`) dan simpan!
