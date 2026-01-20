# Setup Firebase untuk Jadwal Mingguanku

## Langkah 1: Buat Firebase Project

1. Pergi ke [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project" atau "Create project"
3. Masukkan nama project (contoh: "portofolio-jadwal")
4. Selesaikan setup project

## Langkah 2: Setup Firestore Database

1. Di Firebase Console, pilih project Anda
2. Klik "Build" → "Firestore Database"
3. Klik "Create Database"
4. Pilih lokasi (Asia Southeast 1 untuk Indonesia)
5. Mode: Pilih "Start in production mode" (lebih aman)
6. Klik "Create"

## Langkah 3: Dapatkan Kredensial Firebase

1. Di Firebase Console, klik gear icon ⚙️ → "Project Settings"
2. Scroll ke bawah, cari "Your apps"
3. Klik "</> (Web)" untuk menambah web app
4. Masukkan nama app
5. Copy Firebase config object

## Langkah 4: Setup Environment Variables

1. Copy file `.env.example` menjadi `.env.local`
2. Isi kredensial dari Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Langkah 5: Update Firestore Rules (Production Mode)

Di Firebase Console → Firestore Database → Rules, ganti dengan:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read and write schedules
    // Untuk app yang public seperti ini (shared scheduling)
    match /schedules/{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Catatan:**

- Ini aman karena hanya collection `schedules` yang bisa diakses publik
- Collection lain akan blocked otomatis
- Untuk production lebih ketat, bisa tambahkan authentication (lihat di bawah)

### Opsi: Dengan Authentication (Lebih Aman)

Jika ingin hanya user yang login yang bisa akses:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User hanya bisa read/write data mereka sendiri
    match /schedules/{userId}/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

Tapi ini perlu setup authentication terlebih dahulu.

## Selesai! 🎉

Aplikasi Anda sekarang akan:

- ✅ Menyimpan data ke Firebase Firestore (GRATIS)
- ✅ Real-time sync antar pengguna
- ✅ Data tersimpan di cloud, tidak perlu localStorage
- ✅ Production mode yang aman
- ✅ Bisa diakses oleh banyak orang

## Biaya Firebase?

**GRATIS untuk:**

- Firestore: 50,000 read/bulan, 20,000 write/bulan, 20,000 delete/bulan
- Storage: 5GB/bulan
- Authentication: Unlimited

**Maksimal billing**: Jika melebihi limit free tier, Firebase akan blok sampai bulan berikutnya (tidak akan charge otomatis)

## Testing

1. Jalankan: `npm run dev`
2. Buka browser: http://localhost:3000
3. Buat jadwal baru
4. Pergi ke Firebase Console → Firestore Database → Collections → "schedules"
5. Verifikasi data tersimpan di collection "schedules"
6. Buka di tab browser lain, data akan real-time update! 🎉
