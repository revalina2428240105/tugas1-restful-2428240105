# Tugas 1 RESTful API - Booking Lapangan

## Identitas
- Nama: Reva Lina
- NIM: 2428240105
- Topik: 30 - Sarana Olahraga: Booking Lapangan

## Deskripsi
RESTful API untuk melakukan pengelolaan data booking lapangan olahraga menggunakan Express.js.

## Teknologi
- Node.js
- Express.js
- Postman
- Vercel

## Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | /field-bookings | Menampilkan semua booking |
| GET | /field-bookings/:id | Menampilkan booking berdasarkan ID |
| POST | /field-bookings | Menambahkan booking |
| PUT | /field-bookings/:id | Mengubah booking |
| DELETE | /field-bookings/:id | Menghapus booking |
| GET | /field-bookings?lapangan=Futsal%20A | Filter berdasarkan lapangan |

## Menjalankan Project

Install dependency:

```bash
npm install

## GitHub
https://github.com/revalina2428240105/tugas1-restful-2428240105

## Vercel
https://tugas1-restful-2428240105.vercel.app/