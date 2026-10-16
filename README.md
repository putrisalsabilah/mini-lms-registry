# Mini-LMS Service Registry

## 1. Deskripsi Proyek

Mini-LMS Service Registry merupakan proyek sederhana yang dibuat untuk menyimpan dan mencari alamat tujuh service pada sistem Mini-LMS. Registry digunakan agar Gateway dapat menemukan alamat service berdasarkan nama logis tanpa harus menuliskan alamat dan port service secara langsung di source code Gateway.

Proyek ini menggunakan file `services.json` sebagai tempat penyimpanan data service, Node.js dan Express untuk membuat Registry API, serta Gateway untuk mengakses salah satu service melalui Registry.

## 2. Teknologi yang Digunakan

- **Node.js:** Menjalankan program JavaScript.
- **Express.js:** Membuat endpoint API untuk Registry.
- **JSON:** Menyimpan data nama, alamat, dan port service.
- **Visual Studio Code:** Menulis dan mengelola source code.
- **Postman:** Menguji endpoint Registry.

## 3. Daftar Service Mini-LMS

Registry menyimpan informasi tujuh service berikut:

| No. | Nama Logis | Fungsi | Port Awal |
|---|---|---|---|
| 1 | auth-service | Mengelola autentikasi dan login | 3001 |
| 2 | user-service | Mengelola data pengguna | 3002 |
| 3 | course-service | Mengelola data kursus | 3003 |
| 4 | enrollment-service | Mengelola pendaftaran kursus | 3004 |
| 5 | material-service | Mengelola materi pembelajaran | 3005 |
| 6 | assignment-service | Mengelola tugas pembelajaran | 3006 |
| 7 | grade-service | Mengelola nilai pembelajaran | 3007 |

Alamat dan port tersebut merupakan konfigurasi contoh untuk pengembangan lokal. Dalam implementasi ini, service yang dijalankan sebagai contoh adalah `course-service`.

## 4. Struktur Berkas

- `services.json`: Menyimpan nama logis, base URL, dan port tujuh service.
- `server.js`: Menjalankan Registry API untuk mencari alamat service.
- `course-service.js`: Menjalankan service kursus sebagai contoh service tujuan.
- `gateway.js`: Mencari alamat `course-service` melalui Registry dan menghubungi service tersebut.
- `README.md`: Berisi petunjuk menjalankan dan menguji proyek.
- `diagram-alur.png`: Diagram proses lookup Registry.
- `screenshots/`: Menyimpan bukti pengujian.

## 5. Cara Instalasi

Pastikan Node.js sudah terpasang pada komputer.

Buka terminal di folder proyek, kemudian jalankan perintah berikut:

```bash
npm init -y
npm install express
```

Perintah tersebut digunakan untuk membuat konfigurasi proyek Node.js dan memasang Express.js.

## 6. Cara Menjalankan Program

Jalankan setiap program melalui terminal yang berbeda.

**Terminal 1 — Registry API**

```bash
node server.js
```

Registry berjalan pada port 4000.

**Terminal 2 — Course Service**

```bash
node course-service.js
```

Course Service berjalan pada port yang ditentukan dalam file `course-service.js`.

**Terminal 3 — Gateway**

```bash
node gateway.js
```

Gateway akan meminta alamat `course-service` kepada Registry, kemudian menggunakan alamat yang diperoleh untuk menghubungi service tujuan.

## 7. Endpoint Registry

Registry menyediakan endpoint berikut:

`GET /api/registry/{name}`

Endpoint digunakan untuk mencari alamat service berdasarkan nama logisnya.

Contoh endpoint untuk mencari Course Service:

`http://localhost:4000/api/registry/course-service`

Jika nama ditemukan, Registry mengembalikan nama service, base URL, dan port. Jika nama tidak ditemukan, Registry mengembalikan status HTTP 404 beserta pesan kesalahan.

## 8. Pengujian

### A. Pengujian Nama Valid

Endpoint yang digunakan:

`http://localhost:4000/api/registry/course-service`

Hasil yang diharapkan adalah Registry mengembalikan data `course-service`, alamat service, dan port yang sesuai dengan konfigurasi di `services.json`.

### B. Pengujian Nama Tidak Ditemukan

Endpoint yang digunakan:

`http://localhost:4000/api/registry/unknown-service`

Hasil yang diharapkan adalah status HTTP 404 dengan pesan bahwa service tidak ditemukan.

### C. Pengujian Perubahan Port

Pengujian dilakukan dengan mengubah port `course-service` dari 3003 menjadi 3010. Perubahan dilakukan pada file `services.json` dan `course-service.js`, tanpa mengubah source code `gateway.js`.

Setelah Registry dan Course Service dijalankan kembali, Gateway dijalankan ulang untuk memastikan bahwa alamat baru diperoleh melalui Registry.

Hasil yang diharapkan adalah Gateway menggunakan alamat `http://localhost:3010` dan berhasil menerima respons dari Course Service.

## 9. Hasil Pengujian

- **Nama valid:** Registry berhasil menemukan service dengan menampilkan nama course-service, base URL, dan port sesuai konfigurasi pada services.json.
- **Nama tidak ditemukan:** Registry berhasil memberikan hasil status HTTP 404 Not Found dan pesan bahwa service tidak ditemukan.
- **Perubahan port:** Gateway berhasil menampilkan port baru tanpa perubahan source code Gateway.

Bukti pengujian dilampirkan pada folder `screenshots/`.

## 10. Diagram Alur Lookup

Diagram alur menjelaskan proses ketika Gateway meminta nama service kepada Registry. Registry mencari nama tersebut di `services.json`. Jika ditemukan, Registry mengembalikan alamat service dan Gateway menghubungi service tujuan. Jika tidak ditemukan, Registry memberikan respons error 404.

Diagram disimpan dalam file `diagram-alur-lookup.png`.

## 11. Pembagian Kontribusi Anggota

1. **Putri Ayu Auliah** - Membuat file services.json yang berisi data tujuh service Mini-LMS serta mengembangkan endpoint Registry API untuk mencari alamat service berdasarkan nama logis.

2. **Mursalina** - Membuat Gateway yang terhubung dengan service melalui Registry, membuat diagram alur lookup, serta menyusun README berisi cara menjalankan dan menguji program.

3. **Putri Salsabilah** - Menjalankan Registry, Course Service, dan Gateway, menguji nama service valid dan tidak ditemukan, menguji perubahan port tanpa mengubah source code Gateway, serta mengambil screenshot sebagai bukti pengujian.

## 12. Kesimpulan

Proyek Mini-LMS Service Registry menunjukkan bagaimana alamat service dapat dicari berdasarkan nama logis melalui Registry. Gateway tidak perlu mengubah source code ketika port service berubah karena alamat tujuan diperoleh dari konfigurasi Registry. Selain itu, Registry dapat menangani nama service yang tidak ditemukan dengan memberikan status HTTP 404.