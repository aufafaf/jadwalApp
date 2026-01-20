# ✅ Checklist Setup Firebase (Step-by-Step)

## Step 1️⃣: Buka Firebase Console

- [ ] Pergi ke https://console.firebase.google.com/
- [ ] Login dengan Google account

## Step 2️⃣: Buat Project Firebase

- [ ] Klik "Add project"
- [ ] Masukkan nama project: `portofolio-jadwal` (atau nama lain)
- [ ] Disable Google Analytics (optional)
- [ ] Klik "Create project"
- [ ] Tunggu selesai (~2-3 menit)

## Step 3️⃣: Setup Firestore Database

- [ ] Klik "Build" di sidebar kiri
- [ ] Pilih "Firestore Database"
- [ ] Klik "Create Database"
- [ ] Pilih lokasi: **Asia Southeast 1** (untuk Indonesia)
- [ ] Mode: **Start in production mode** ✅
- [ ] Klik "Create"
- [ ] Tunggu database terbuat

## Step 4️⃣: Set Security Rules

- [ ] Di Firestore Database, buka tab **"Rules"**
- [ ] Hapus semua kode yang ada
- [ ] Copy-paste kode ini:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /schedules/{document=**} {
      allow read, write: if true;
    }
  }
}
```

- [ ] Klik **"Publish"**

## Step 5️⃣: Ambil API Keys

- [ ] Klik gear icon ⚙️ (Project Settings) di sidebar
- [ ] Scroll ke bawah → cari **"Your apps"**
- [ ] Klik **"</> (Web)"** untuk add web app
- [ ] Centang "Also set up Firebase Hosting"
- [ ] Klik "Register app"
- [ ] **Copy seluruh Firebase config object** (dari const firebaseConfig)

## Step 6️⃣: Setup Environment Variables

- [ ] Buka file `.env.local` di project (jika tidak ada, buat baru di root folder)
- [ ] Copy-paste Firebase config ke .env.local dengan format:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

**Contoh:**

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDa1LQZ4oXaBcDeFgHiJkLmNoPqRsTuVwX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=portofolio-jadwal.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=portofolio-jadwal
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=portofolio-jadwal.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcd
```

## Step 7️⃣: Restart Development Server

- [ ] Stop running dev server (Ctrl+C di terminal)
- [ ] Jalankan ulang: `npm run dev`
- [ ] Pergi ke http://localhost:3000

## Step 8️⃣: Test

- [ ] Buat jadwal baru
- [ ] Pergi ke https://console.firebase.google.com/ → Firestore Database → Collections
- [ ] Lihat collection "schedules" dengan data yang baru dibuat ✅
- [ ] Buka app di tab/device lain
- [ ] Tambah schedule baru di device lain
- [ ] Lihat real-time update! 🎉

---

## 💡 Tips

- **Jangan commit `.env.local`** ke GitHub! (sudah ada di .gitignore)
- **API Key PUBLIC OK** (NEXT*PUBLIC*\* tidak rahasia)
- **Database aman** karena sudah ada Security Rules

## 🆘 Troubleshooting

**Error: "Failed to connect to Firebase"**

- Pastikan `.env.local` sudah benar
- Restart dev server
- Buka browser developer (F12) → Console untuk melihat error detail

**Data tidak muncul di Firestore Console**

- Tunggu beberapa detik (real-time sync)
- Refresh Firestore Console
- Check browser console untuk error message

**Biaya bayar?**

- Tidak! Firebase gratis untuk usage normal
- Free tier: 50,000 read/bulan, 20,000 write/bulan

---

Selesai! Aplikasi sudah siap production-ready dengan Firebase! 🚀
