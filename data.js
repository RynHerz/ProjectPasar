// ========================================================
// DATA PRESET & KONFIGURASI AWAL TOKO BUMBU
// ========================================================

const DEFAULT_STORE_CONFIG = {
  name: "Toko Bumbu Rempah Berkah",
  tagline: "Bumbu Giling Segar, Rempah Asli & Kebutuhan Dapur Pasar",
  whatsapp: "62895394603282", // Nomor WhatsApp penjual: +62 895-3946-03282
  marketName: "Pasar Induk Tradisional - Blok C No. 12",
  address: "Jl. Pasar Besar No. 45, Lapak Bumbu Berkah Blok C-12",
  qrisName: "BUMBU BERKAH PASAR",
  qrisNmid: "ID1020304050607",
  bankName: "BCA",
  bankAccount: "123-456-7890",
  bankHolder: "BUMBU REMPAH BERKAH",
  openHours: "04:00 - 15:00 WIB",
  deliveryNotes: "Pengantaran oleh Kurir Pasar mulai jam 06:00 - 12:00 WIB"
};

const DEFAULT_CATEGORIES = [
  { id: "all", name: "Semua Bumbu", icon: "✨" },
  { id: "giling", name: "Bumbu Giling Basah", icon: "🌶️" },
  { id: "rempah", name: "Rempah Kering & Bubuk", icon: "🌿" },
  { id: "segar", name: "Bumbu Dapur Segar", icon: "🧅" },
  { id: "pelengkap", name: "Pelengkap Masakan", icon: "🥫" }
];

const DEFAULT_PRODUCTS = [
  // Bumbu Giling Basah
  {
    id: "p1",
    name: "Bumbu Rendang Padang (Giling)",
    category: "giling",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=400&q=80",
    badge: "Favorit",
    description: "Bumbu rendang khas Minang racikan rempah lengkap (cabai merah, bawang, lengkuas, jahe, kunyit, rempah gulai). Siap masak.",
    baseUnit: "1/4 kg",
    variants: [
      { name: "1 Ons (100 gr)", weight: "100g", price: 6000 },
      { name: "1/4 Kg (250 gr)", weight: "250g", price: 15000, default: true },
      { name: "1/2 Kg (500 gr)", weight: "500g", price: 28000 },
      { name: "1 Kg (1000 gr)", weight: "1000g", price: 55000 }
    ],
    notePlaceholder: "Contoh: Pedas sedang, jangan pakai kunyit",
    inStock: true
  },
  {
    id: "p2",
    name: "Bumbu Opor Kuning / Putih (Giling)",
    category: "giling",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    badge: "Terlaris",
    description: "Bumbu opor lezat harum kemiri dan ketumbar sangrai. Cocok untuk opor ayam, tahu, telur saat lebaran atau harian.",
    baseUnit: "1/4 kg",
    variants: [
      { name: "1 Ons (100 gr)", weight: "100g", price: 5000 },
      { name: "1/4 Kg (250 gr)", weight: "250g", price: 12000, default: true },
      { name: "1/2 Kg (500 gr)", weight: "500g", price: 23000 },
      { name: "1 Kg (1000 gr)", weight: "1000g", price: 45000 }
    ],
    notePlaceholder: "Contoh: Minta opor kuah kuning / opor putih",
    inStock: true
  },
  {
    id: "p3",
    name: "Bumbu Gulai & Kari Daging (Giling)",
    category: "giling",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400&q=80",
    badge: "Rempah Kuat",
    description: "Perpaduan rempah gulai aromatik: kapulaga, cengkeh, kayu manis, jintan, dan kunyit asli. Cocok untuk gulai kambing/sapi/ayam.",
    baseUnit: "1/4 kg",
    variants: [
      { name: "1 Ons (100 gr)", weight: "100g", price: 6000 },
      { name: "1/4 Kg (250 gr)", weight: "250g", price: 14000, default: true },
      { name: "1/2 Kg (500 gr)", weight: "500g", price: 27000 },
      { name: "1 Kg (1000 gr)", weight: "1000g", price: 52000 }
    ],
    notePlaceholder: "Contoh: Untuk gulai kambing, rempah dibanyakin",
    inStock: true
  },
  {
    id: "p4",
    name: "Bumbu Rawon Khas Jawa Timur (Keluak)",
    category: "giling",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80",
    badge: "Keluak Pilihan",
    description: "Bumbu rawon pekat dengan keluak tua hitam pilihan, tidak pahit, gurih berkaldu asli.",
    baseUnit: "1/4 kg",
    variants: [
      { name: "1/4 Kg (250 gr)", weight: "250g", price: 15000, default: true },
      { name: "1/2 Kg (500 gr)", weight: "500g", price: 29000 },
      { name: "1 Kg (1000 gr)", weight: "1000g", price: 56000 }
    ],
    notePlaceholder: "Contoh: Minta yang hitam pekat",
    inStock: true
  },
  {
    id: "p5",
    name: "Bumbu Balado & Sambal Goreng (Giling)",
    category: "giling",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80",
    badge: "Segar Harian",
    description: "Gilingan cabai merah keriting segar, bawang merah, tomat, dan terasi. Gurih pedas mantap untuk balado ati ampela, telur, tongkol.",
    baseUnit: "1/4 kg",
    variants: [
      { name: "1/4 Kg (250 gr)", weight: "250g", price: 12000, default: true },
      { name: "1/2 Kg (500 gr)", weight: "500g", price: 23000 },
      { name: "1 Kg (1000 gr)", weight: "1000g", price: 44000 }
    ],
    notePlaceholder: "Contoh: Pedas banget / cabai rawit ditambah",
    inStock: true
  },

  // Bumbu Dapur Segar
  {
    id: "p6",
    name: "Bawang Merah Brebes Super",
    category: "segar",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80",
    badge: "Kering & Wangi",
    description: "Bawang merah Brebes asli, umbi padat, kering, aroma sangat wangi untuk tumisan dan bawang goreng.",
    baseUnit: "1/2 kg",
    variants: [
      { name: "1/4 Kg (250 gr)", weight: "250g", price: 10000 },
      { name: "1/2 Kg (500 gr)", weight: "500g", price: 19000, default: true },
      { name: "1 Kg (1000 gr)", weight: "1000g", price: 37000 }
    ],
    notePlaceholder: "Contoh: Pilihkan umbi ukuran besar",
    inStock: true
  },
  {
    id: "p7",
    name: "Bawang Putih Kating Super",
    category: "segar",
    image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=400&q=80",
    badge: "Kating Pilihan",
    description: "Bawang putih jenis Kating asli, siung gemuk dan padat, rasa lebih gurih dan tajam dibanding jenis Honan.",
    baseUnit: "1/2 kg",
    variants: [
      { name: "1/4 Kg (250 gr)", weight: "250g", price: 12000 },
      { name: "1/2 Kg (500 gr)", weight: "500g", price: 23000, default: true },
      { name: "1 Kg (1000 gr)", weight: "1000g", price: 45000 }
    ],
    notePlaceholder: "Contoh: Minta yang siung utuh bersih",
    inStock: true
  },
  {
    id: "p8",
    name: "Cabai Rawit Merah (Setan / Domba)",
    category: "segar",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=400&q=80",
    badge: "Super Pedas",
    description: "Cabai rawit merah petik segar setiap subuh. Pedas menyengat, segar tanpa tangkai busuk.",
    baseUnit: "1/4 kg",
    variants: [
      { name: "1 Ons (100 gr)", weight: "100g", price: 6000 },
      { name: "1/4 Kg (250 gr)", weight: "250g", price: 14000, default: true },
      { name: "1/2 Kg (500 gr)", weight: "500g", price: 27000 },
      { name: "1 Kg (1000 gr)", weight: "1000g", price: 52000 }
    ],
    notePlaceholder: "Contoh: Petik tangkai / biarkan bertangkai",
    inStock: true
  },
  {
    id: "p9",
    name: "Paket Daun Aromatik (Salam, Sereh, Jeruk, Pandan)",
    category: "segar",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
    badge: "Paket Hemat",
    description: "1 Ikat lengkap daun salam segar (10 lembar), daun jeruk purut (10 lembar), 3 batang sereh geprek, dan daun pandan wangi.",
    baseUnit: "1 Ikat",
    variants: [
      { name: "1 Ikat Komplit", weight: "1 ikat", price: 5000, default: true },
      { name: "3 Ikat Komplit", weight: "3 ikat", price: 13000 }
    ],
    notePlaceholder: "Contoh: Daun jeruknya dibanyakin ya Bu",
    inStock: true
  },
  {
    id: "p10",
    name: "Jahe Merah & Lengkuas Segar",
    category: "segar",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80",
    badge: "Segar Petik",
    description: "Rimpang jahe merah segar berkhasiat dan lengkuas muda empuk mudah digeprek atau diparut.",
    baseUnit: "1/4 kg",
    variants: [
      { name: "1/4 Kg (250 gr)", weight: "250g", price: 8000, default: true },
      { name: "1/2 Kg (500 gr)", weight: "500g", price: 15000 },
      { name: "1 Kg (1000 gr)", weight: "1000g", price: 28000 }
    ],
    notePlaceholder: "Contoh: Campur jahe dan lengkuas 50:50",
    inStock: true
  },

  // Rempah Kering & Bubuk
  {
    id: "p11",
    name: "Ketumbar Butir Sangrai / Bubuk Murni",
    category: "rempah",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=400&q=80",
    badge: "100% Murni",
    description: "Ketumbar berkualitas tinggi, sudah disangrai harum. Tersedia butiran utuh atau digiling halus murni tanpa campuran tepung.",
    baseUnit: "1 Ons",
    variants: [
      { name: "1 Ons (100 gr) - Butir", weight: "100g", price: 4000, default: true },
      { name: "1 Ons (100 gr) - Bubuk Halus", weight: "100g", price: 5000 },
      { name: "1/4 Kg (250 gr) - Butir", weight: "250g", price: 9000 },
      { name: "1/4 Kg (250 gr) - Bubuk", weight: "250g", price: 11000 }
    ],
    notePlaceholder: "Contoh: Minta yang butir / bubuk",
    inStock: true
  },
  {
    id: "p12",
    name: "Lada Putih Butir Muntok / Bubuk",
    category: "rempah",
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=400&q=80",
    badge: "Grade A Muntok",
    description: "Merica putih Bangka Muntok kualitas ekspor. Pedas hangat tajam khas lada asli tanpa pemutih kimia.",
    baseUnit: "1 Ons",
    variants: [
      { name: "1 Ons (100 gr) - Butir", weight: "100g", price: 13000, default: true },
      { name: "1 Ons (100 gr) - Bubuk", weight: "100g", price: 14000 },
      { name: "1/4 Kg (250 gr) - Butir", weight: "250g", price: 31000 },
      { name: "1/4 Kg (250 gr) - Bubuk", weight: "250g", price: 33000 }
    ],
    notePlaceholder: "Contoh: Mau yang bubuk halus untuk sup",
    inStock: true
  },
  {
    id: "p13",
    name: "Paket Rempah Kering Soto & Sop Komplit",
    category: "rempah",
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=400&q=80",
    badge: "Praktis",
    description: "Paket rempah utuh: Kayu manis, kapulaga india, cengkeh aromatik, bunga lawang (pekak), dan buah pala geprek.",
    baseUnit: "1 Bungkus",
    variants: [
      { name: "1 Bungkus (Cukup 1-2 Ekor Daging)", weight: "1 bks", price: 5000, default: true },
      { name: "3 Bungkus Hemat", weight: "3 bks", price: 13000 }
    ],
    notePlaceholder: "Contoh: Untuk kuah soto daging",
    inStock: true
  },

  // Pelengkap Masakan
  {
    id: "p14",
    name: "Kelapa Parut Segar (Peras Santan Kental)",
    category: "pelengkap",
    image: "https://images.unsplash.com/photo-1544476915-ed1370594142?auto=format&fit=crop&w=400&q=80",
    badge: "Parut Langsung",
    description: "Kelapa tua pilihan khusus santan gurih. Diparut langsung saat pesanan disiapkan agar tetap manis dan gurih alami.",
    baseUnit: "1 Butir",
    variants: [
      { name: "1/2 Butir Kelapa Parut", weight: "1/2 butir", price: 5000 },
      { name: "1 Butir Kelapa Parut", weight: "1 butir", price: 9000, default: true },
      { name: "1 Butir (Peras Santan Murni di Toko)", weight: "1 botol", price: 12000 }
    ],
    notePlaceholder: "Contoh: Kupas kulit ari kelapanya sebelum diparut",
    inStock: true
  },
  {
    id: "p15",
    name: "Terasi Udang Asli Juwana / Cirebon",
    category: "pelengkap",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80",
    badge: "Aroma Mantap",
    description: "Terasi udang rebon asli tanpa bahan pengawet berlebih. Sangat sedap untuk sambal terasi dan bumbu tumis kangkung.",
    baseUnit: "1 Bungkus",
    variants: [
      { name: "1 Bungkus (Isi 5 Pcs Kotak)", weight: "5 pcs", price: 6000, default: true },
      { name: "1 Balek (Isi 20 Pcs)", weight: "20 pcs", price: 22000 }
    ],
    notePlaceholder: "Contoh: Terasi bakar / mentah",
    inStock: true
  },
  {
    id: "p16",
    name: "Asam Jawa Matang & Gula Merah Aren Asli",
    category: "pelengkap",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80",
    badge: "Alami",
    description: "Asam jawa matang tanpa biji dan gula aren murni batok kelapa. Wangi khas gula kelapa asli, manis legit.",
    baseUnit: "1/4 kg",
    variants: [
      { name: "Asam Jawa Tanpa Biji (250 gr)", weight: "250g", price: 8000, default: true },
      { name: "Gula Merah Aren Asli (500 gr)", weight: "500g", price: 16000 },
      { name: "Paket Combo Asam + Gula Aren", weight: "1 paket", price: 23000 }
    ],
    notePlaceholder: "Contoh: Gula aren yang warna cokelat pekat",
    inStock: true
  }
];

const INITIAL_MOCK_ORDERS = [
  {
    id: "BMB-260829-001",
    date: "2026-08-29 07:30",
    customer: {
      name: "Ibu Hj. Aminah (Warung Nasi Berkah)",
      phone: "081298765432",
      method: "delivery", // "pickup" | "delivery"
      address: "Jl. Melati No. 18, RT 02/RW 04 (Dekat Masjid Al-Ikhlas)",
      pickupTime: "-"
    },
    payment: {
      method: "qris", // "qris" | "bank" | "cash"
      status: "Lunas (QRIS)",
      isPaid: true
    },
    items: [
      {
        id: "p1",
        name: "Bumbu Rendang Padang (Giling)",
        variant: "1/2 Kg (500 gr)",
        price: 28000,
        qty: 2,
        subtotal: 56000,
        note: "Pedas sedang, tolong ditandai plastiknya"
      },
      {
        id: "p6",
        name: "Bawang Merah Brebes Super",
        variant: "1 Kg (1000 gr)",
        price: 37000,
        qty: 1,
        subtotal: 37000,
        note: "Pilihkan yang kering dan besar"
      },
      {
        id: "p14",
        name: "Kelapa Parut Segar",
        variant: "1 Butir (Peras Santan Murni di Toko)",
        price: 12000,
        qty: 2,
        subtotal: 24000,
        note: "Santan kental dipisah santan encer"
      }
    ],
    shippingFee: 5000,
    total: 122000,
    status: "Diproses" // "Menunggu", "Diproses", "Siap", "Selesai"
  },
  {
    id: "BMB-260829-002",
    date: "2026-08-29 08:15",
    customer: {
      name: "Pak Bambang (Catering Sederhana)",
      phone: "085712349988",
      method: "pickup",
      address: "-",
      pickupTime: "09:30 WIB (Lapak C-12)"
    },
    payment: {
      method: "cash",
      status: "Bayar di Lapak (Tunai)",
      isPaid: false
    },
    items: [
      {
        id: "p2",
        name: "Bumbu Opor Kuning / Putih (Giling)",
        variant: "1 Kg (1000 gr)",
        price: 45000,
        qty: 1,
        subtotal: 45000,
        note: "Bumbu opor kuning ya Bu"
      },
      {
        id: "p8",
        name: "Cabai Rawit Merah (Setan / Domba)",
        variant: "1/2 Kg (500 gr)",
        price: 27000,
        qty: 1,
        subtotal: 27000,
        note: "Buang tangkai kalau sempat"
      }
    ],
    shippingFee: 0,
    total: 72000,
    status: "Siap"
  }
];
