# ✅ Setup Prisma + Neon (Database Gratis)

## ✨ Keuntungan Prisma vs Firebase

- ✅ **GRATIS sepenuhnya** - tidak perlu billing
- ✅ **Lebih sederhana** - SQL langsung, tanpa rules kompleks
- ✅ **Lebih cepat** - queries langsung ke database
- ✅ **Developer friendly** - auto-generate types

---

## 📋 Pilihan Database Gratis untuk Prisma

### **1️⃣ Neon (RECOMMENDED)**

- Free tier: 3 projects, 500MB/project
- Unlimited database
- Cukup untuk hobby project
- 👉 **Gunakan ini**

### **2️⃣ Vercel Postgres**

- Free tier: 10GB
- Terbaik jika deploy di Vercel
- Unlimited databases

### **3️⃣ Supabase**

- Free tier: 500MB
- Built-in auth & real-time
- Lebih berat dari Neon

---

## 🚀 Setup Step-by-Step

### **Step 1: Buat Account Neon**

1. Pergi ke https://neon.tech/
2. Klik "Sign Up"
3. Pilih "Sign up with GitHub" atau email
4. Verify email

### **Step 2: Buat Project Database**

1. Klik "Create a project"
2. Masukkan nama: `portofolio-jadwal`
3. Region: Asia Southeast (Tokyo atau Singapore)
4. Klik "Create"
5. Tunggu hingga terbuat

### **Step 3: Ambil Connection String**

1. Di dashboard Neon, buka project `portofolio-jadwal`
2. Klik "Connection string" / "Connection details"
3. Copy connection string (format: `postgresql://...`)
4. Jangan share ke orang lain!

### **Step 4: Setup Environment Variable**

1. Buka/buat `.env.local` di root project
2. Paste connection string:

```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

Contoh:

```env
DATABASE_URL="postgresql://neondb_owner:abc123@ep-calm-cloud-123456.us-east-1.neon.tech/neondb?sslmode=require"
```

### **Step 5: Generate Database**

Jalankan di terminal:

```bash
npx prisma migrate dev --name init
```

Ini akan:

- Membuat database schema
- Generate Prisma Client
- Tanya nama migration: bisa tekan enter atau ketik "init"

### **Step 6: Test Database**

Jalankan Prisma Studio (UI untuk lihat data):

```bash
npx prisma studio
```

Browser akan terbuka di `http://localhost:5555` ✅

---

## 🔄 Update Aplikasi untuk Menggunakan Prisma

Kode sudah siap di:

- [app/jadwal.tsx](app/jadwal.tsx) - sudah di-update untuk Prisma
- [lib/prisma.ts](lib/prisma.ts) - helper functions

Aplikasi otomatis akan:

1. Connect ke database Neon
2. Buat/update schedules
3. Real-time sync semua pengguna ✅

---

## 📚 API Routes untuk Jadwal

Routes yang sudah tersedia:

```
GET  /api/schedules        - Ambil semua jadwal
POST /api/schedules        - Buat jadwal baru
PUT  /api/schedules/:id    - Update jadwal
DELETE /api/schedules/:id  - Hapus jadwal
```

---

## 🆓 Gratis Selamanya?

**YA!** Neon free tier tiba-tiba unlimited dengan syarat:

- ✅ Sampai 3 projects active
- ✅ Sampai 500MB/project (cukup untuk jutaan records)
- ✅ Unlimited queries
- ✅ Unlimited connections

Untuk aplikasi jadwal simple = **100% GRATIS SELAMANYA** 🎉

---

## 🛠️ Troubleshooting

**Error: "Can't reach database server"**

- Pastikan `.env.local` sudah benar
- Restart dev server
- Check Neon dashboard status

**Database kosong**

- Jalankan: `npx prisma migrate dev`
- Jalankan: `npx prisma studio`

**Forgot connection string?**

- Buka https://console.neon.tech/
- Pilih project → Connection details

---

**Selesai! Aplikasi siap pakai dengan database gratis!** 🚀
