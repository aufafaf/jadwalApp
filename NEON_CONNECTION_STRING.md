# 🔍 Cara Menemukan Connection String di Neon

## Jika Project Sudah Terbuat

### Opsi 1: Via Dashboard (Paling Mudah)

1. Pergi ke https://console.neon.tech/
2. Lihat project Anda (contoh: `portofolio-jadwal`)
3. **Di halaman project**, cari **"Connection strings"** atau **"Quick Start"**
4. Lihat dropdown di samping "PostgreSQL"
5. Ganti ke **"Pooler"** (untuk Node.js/Next.js)
6. Copy string yang muncul

### Opsi 2: Via Project Settings

1. https://console.neon.tech/
2. Klik project `portofolio-jadwal`
3. Tab **"Connection"** di sidebar kiri
4. Pilih branch (default: `main`)
5. Scroll ke bawah → Lihat "Connection string"
6. Klik **"Pooler"** tab
7. Copy string

---

## Jika Project Belum Terbuat

Kemungkinan project Anda belum selesai setup:

### Check Status:

1. Buka https://console.neon.tech/
2. Cek apakah project `portofolio-jadwal` sudah muncul
3. Jika ada:
   - Status harus **"Ready"** (bukan "Creating...")
   - Tunggu ~1-2 menit jika masih "Creating"

### Jika Belum Ada Project:

1. https://console.neon.tech/
2. Klik **"Create a project"** atau **"+ New Project"**
3. Masukkan:
   - Project name: `portofolio-jadwal`
   - Region: **Asia** (Tokyo atau Singapore)
4. Klik **"Create Project"**
5. **Tunggu 1-2 menit** sampai selesai
6. Refresh halaman
7. Sekarang harusnya muncul connection string

---

## Format Connection String Yang Benar

Connection string dari Neon akan terlihat seperti:

```
postgresql://neondb_owner:password123@ep-calm-cloud-123456.us-east-1.neon.tech/neondb?sslmode=require
```

### Di dalam .env.local:

```env
DATABASE_URL="postgresql://neondb_owner:password123@ep-calm-cloud-123456.us-east-1.neon.tech/neondb?sslmode=require"
```

**PENTING:** Gunakan **Pooler connection** (bukan regular), dengan `?sslmode=require` di akhir

---

## Screenshot Guide (Deskripsi)

**Dashboard Neon:**

```
┌─────────────────────────────────────┐
│ Neon Console                        │
├─────────────────────────────────────┤
│ Projects:                           │
│ • portofolio-jadwal [Ready] ← Klik  │
│                                     │
├─ Dalam Project ─────────────────────┤
│ Connection strings                  │
│ ├─ PostgreSQL ▼ ← Dropdown          │
│ │  ├─ Direct connection             │
│ │  └─ Pooler ✓ ← Pilih ini!        │
│ │                                   │
│ └─ [Copy button] ← Copy string      │
└─────────────────────────────────────┘
```

---

## Troubleshooting

### Tidak ada project di Neon?

```
1. Pergi ke https://console.neon.tech/
2. Klik "+ New Project" di kiri bawah
3. Buat project baru dengan nama portofolio-jadwal
```

### Project masih "Creating"?

```
1. Tunggu 2-3 menit
2. Refresh halaman browser
3. Biasanya langsung muncul
```

### Connection string tidak muncul?

```
1. Klik project name (portofolio-jadwal)
2. Lihat sidebar kiri → "Connection"
3. Pilih branch "main"
4. Tab "Pooler"
5. Copy string yang muncul
```

### Copy button tidak ada?

```
Kemungkinan UI Neon update
Solusi:
1. Highlight manual string
2. Ctrl+C copy
3. Atau pakai "Show connection string" button
```

---

## Reset Jika Stuck

Jika masih tidak bisa menemukan:

1. **Logout Neon**: https://console.neon.tech/ → klik avatar → logout
2. **Login ulang** dengan fresh session
3. **Refresh halaman** beberapa kali
4. Seharusnya semuanya muncul

---

## Next Steps Setelah Dapat Connection String

```env
# Masukkan ke .env.local:
DATABASE_URL="paste_connection_string_di_sini"
```

Kemudian jalankan:

```bash
npx prisma migrate dev --name init
```

Done! 🚀
