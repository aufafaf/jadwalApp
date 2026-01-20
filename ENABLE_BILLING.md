# ✅ Cara Enable Billing di Firebase (GRATIS!)

## ⚠️ Penting!

**Billing = Free Tier unlocked, BUKAN berarti akan charge**

- Firebase memberikan credit gratis setiap bulan
- Hanya charge jika melebihi quota gratis
- Bisa set budget limit untuk safety

---

## Step 1️⃣: Pergi ke Link Billing

Klik link dari error message:

```
https://console.developers.google.com/billing/enable?project=portofolio-jadwal
```

Atau manual:

- Buka https://console.cloud.google.com/billing
- Login dengan Google account yang sama
- Klik project `portofolio-jadwal`

## Step 2️⃣: Setup Billing Account

- [ ] Klik "Create Billing Account"
- [ ] Isi data:
  - Nama: bisa masukkan nama Anda
  - Negara: Pilih **Indonesia**
  - Address: Masukkan alamat rumah/kantor
- [ ] Klik "Continue to payment"

## Step 3️⃣: Pilih Payment Method

- [ ] Pilih **Debit/Credit Card** atau **Bank Transfer**
- [ ] Isi data kartu (Firebase tidak akan charge karena gratis)
- [ ] Klik "Start Free Trial" atau sesuai pilihan

## Step 4️⃣: Verifikasi

- [ ] Tunggu konfirmasi (bisa sampai 24 jam)
- [ ] Buka ulang Firebase Console
- [ ] Coba buat Firestore Database lagi

---

## 💰 Jaminan GRATIS

**Firebase Free Tier setiap bulan:**

- ✅ Firestore: 50,000 read, 20,000 write, 20,000 delete
- ✅ Storage: 5GB
- ✅ Authentication: Unlimited
- ✅ Hosting: 10GB/bulan

**Untuk aplikasi jadwal sederhana:**

- Estimated: ~1,000 write/bulan (jauh di bawah limit!)
- Status: **100% GRATIS** ✅

---

## 🛡️ Set Budget Alert (Safety)

Untuk extra safety, set budget limit:

1. Buka https://console.cloud.google.com/billing
2. Klik "Budgets and alerts" di sidebar
3. Klik "Create budget"
4. Set budget limit: **$5** (jika melebihi akan alert)
5. Save

---

## ✅ Setelah Enable Billing

1. Pergi ke https://console.firebase.google.com/
2. Pilih project `portofolio-jadwal`
3. Klik "Build" → "Firestore Database"
4. Klik "Create Database" (sekarang akan bisa!)
5. Lanjutkan setup seperti di SETUP_CHECKLIST.md

---

## 🆘 Masih Error?

1. **Tunggu 5-10 menit** setelah enable billing (propagasi sistem)
2. **Refresh halaman** Firebase Console
3. **Cek status billing**:
   - https://console.cloud.google.com/billing → Project `portofolio-jadwal`
   - Status harus "Active" ✅

4. Jika masih error, coba:
   - Logout Firebase Console
   - Clear cookies
   - Login ulang

---

## 📞 Support

Jika masih bermasalah, hubungi Firebase Support atau coba:

- Chat dengan Google Cloud Support
- Forum: stackoverflow.com (tag: firebase)

---

**Jangan khawatir, billing sudah enable = project siap production!** 🚀
