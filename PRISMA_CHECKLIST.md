# ✅ Prisma + Neon Setup Checklist (GRATIS!)

Ini lebih mudah dari Firebase, dijamin GRATIS selamanya tanpa billing!

---

## Step 1️⃣: Buat Account Neon

- [ ] Pergi ke https://neon.tech/
- [ ] Klik "Sign Up"
- [ ] Login dengan GitHub atau email

## Step 2️⃣: Buat Project Database

- [ ] Klik "Create a project"
- [ ] Nama project: `portofolio-jadwal`
- [ ] Region: **Asia Southeast** (Tokyo/Singapore)
- [ ] Tunggu database terbuat

## Step 3️⃣: Ambil Connection String

- [ ] Di Neon dashboard, cari **"Connection String"**
- [ ] Pilih "Pooler connection"
- [ ] Copy full connection string

## Step 4️⃣: Setup .env.local

1. Buka/buat `.env.local` di root folder project
2. Paste ini:

```env
DATABASE_URL="connection_string_dari_neon_di_sini"
```

Contoh:

```env
DATABASE_URL="postgresql://user:password@ep-calm-cloud-123456.us-east-1.neon.tech/neondb?sslmode=require"
```

## Step 5️⃣: Initialize Database

Jalankan di terminal:

```bash
npx prisma migrate dev --name init
```

Ini akan:

- ✅ Create database schema
- ✅ Generate Prisma Client
- ✅ Beri nama migration: ketik "init"

## Step 6️⃣: Test Database (Optional)

```bash
npx prisma studio
```

Buka http://localhost:5555 untuk lihat data 📊

## Step 7️⃣: Jalankan Aplikasi

```bash
npm run dev
```

Buka http://localhost:3000 dan mulai buat jadwal! 🎉

---

## ✨ Keuntungan Prisma vs Firebase

| Feature     | Prisma           | Firebase                  |
| ----------- | ---------------- | ------------------------- |
| Setup       | Super mudah      | Perlu billing             |
| Database    | Neon gratis      | Firestore gratis          |
| Cost        | GRATIS selamanya | GRATIS tapi perlu billing |
| Realtime    | Polling (cukup)  | Real-time built-in        |
| Type Safety | ✅ Excellent     | ⚠️ Manual typing          |

---

## 🆓 Neon Free Tier

- ✅ 3 projects
- ✅ 500MB per project
- ✅ Unlimited queries
- ✅ GRATIS selamanya!

Cukup untuk jutaan records aplikasi jadwal Anda! 🚀

---

## 🆘 Troubleshooting

**Error: "Can't reach database"**

```bash
# Check connection string di .env.local
# Restart dev server (Ctrl+C, npm run dev)
```

**Database empty?**

```bash
npx prisma migrate dev --name init
```

**Forgot connection string?**

- Buka https://console.neon.tech/
- Pilih project → Connection details

---

**Selesai! Database Anda siap tanpa billing!** 🎉
