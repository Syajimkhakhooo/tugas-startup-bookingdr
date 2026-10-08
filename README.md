# MedikaConnect — Sistem Booking Janji Temu & Rekam Medis Digital

Aplikasi web sederhana untuk **booking jadwal konsultasi dokter dan rekam medis digital** yang dirancang dengan antarmuka modern, clean, dan responsif.

## 🚀 Fitur Utama

1. **Halaman Login Demo**
   - Autentikasi instan dengan akun dummy:
     - **Email**: `user@gmail.com`
     - **Password**: `123456`
   - Tersedia tombol cepat **"Isi Demo"** untuk kemudahan pengujian.

2. **Dashboard Pasien**
   - Sapaan personal kepada pasien.
   - Ringkasan **Janji Temu Berikutnya**.
   - Statistik kunjungan, total booking, dan rekam medis aktif.
   - Daftar dokter spesialis yang bertugas dengan tombol pemesanan langsung.

3. **Booking Jadwal Janji Temu**
   - **Pilih Dokter**: Kartu profil dokter (foto, nama, spesialisasi, jadwal, poli).
   - **Pilih Tanggal**: Date picker kunjungan.
   - **Pilih Jam**: Slot waktu (`08:00`, `09:00`, `10:00`, `13:00`, `14:00`, `15:00`). Jam yang sudah terisi otomatis *disabled*.
   - **Keluhan Pasien**: Input keluhan sebelum konsultasi.
   - **Ringkasan & Konfirmasi**: Verifikasi jadwal sebelum submit.

4. **Konfirmasi Booking Berhasil**
   - Modal tiket sukses dengan nomor booking (contoh: `APT-006`), nama dokter, tanggal, jam, dan status *Menunggu Konfirmasi*.

5. **Riwayat Booking**
   - Tabel responsif riwayat janji temu dengan badge status (*Menunggu*, *Dikonfirmasi*, *Selesai*, *Dibatalkan*).
   - Filter status pencarian dan aksi pembatalan janji temu.

6. **Rekam Medis Digital**
   - Arsip riwayat medis pasien mencakup Tanggal, Dokter Pemeriksa, Keluhan, Diagnosa, Tindakan Medis, dan Terapi/Obat.

7. **Profil Pasien & Logout**
   - Informasi identitas diri, nomor rekam medis (`RM-2026-99201`), status BPJS/asuransi, dan tombol logout.

---

## 🛠️ Teknologi yang Digunakan

- **React 19**
- **Vite**
- **Lucide React** (Modern Medical & UI Icons)
- **Vanilla CSS** dengan Modern Design System & CSS Variables
- **Local Storage** untuk persistensi state tanpa database/backend

---

## 💻 Cara Menjalankan Proyek Secara Lokal

1. **Clone repository ini**:
   ```bash
   git clone https://github.com/Syajimkhakhooo/tugas-startup-bookingdr.git
   cd tugas-startup-bookingdr
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```

4. Buka browser pada alamat `http://localhost:5173`.
