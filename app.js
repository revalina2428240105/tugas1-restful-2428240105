const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Data sementara (disimpan di memori)
let fieldBookings = [
    {
        id: 1,
        namaPemesan: "Tim Garuda SI",
        lapangan: "Futsal A",
        tanggal: "2026-10-10",
        jamMulai: "19:00",
        durasiJam: 2
    },
    {
        id: 2,
        namaPemesan: "Tim Elang",
        lapangan: "Futsal B",
        tanggal: "2026-10-11",
        jamMulai: "16:00",
        durasiJam: 2
    },
    {
        id: 3,
        namaPemesan: "Andi Saputra",
        lapangan: "Badminton A",
        tanggal: "2026-10-12",
        jamMulai: "18:30",
        durasiJam: 1
    }
];

// GET / -> informasi API
app.get("/", (req, res) => {
    res.status(200).json({
        nama: "Reva Lina",
        nim: "2428240105",
        topik: "30 - Sarana Olahraga: Booking Lapangan",
        endpoint: "/field-bookings"
    });
});

// GET /field-bookings -> menampilkan seluruh data
// Filter: /field-bookings?lapangan=Futsal A
app.get("/field-bookings", (req, res) => {
    const { lapangan } = req.query;

    if (lapangan) {
        const hasil = fieldBookings.filter(
            (b) => b.lapangan === lapangan
        );

        return res.status(200).json(hasil);
    }

    res.status(200).json(fieldBookings);
});

// GET /field-bookings/:id -> menampilkan satu data berdasarkan id
app.get("/field-bookings/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const data = fieldBookings.find((b) => b.id === id);

    if (!data) {
        return res.status(404).json({
            status: "error",
            message: "Data tidak ditemukan",
            data: null
        });
    }

    res.status(200).json(data);
});

// POST /field-bookings -> menambahkan booking baru
app.post("/field-bookings", (req, res) => {
    const { namaPemesan, lapangan, tanggal, jamMulai, durasiJam } = req.body;

    if (!namaPemesan || !lapangan || !tanggal || !jamMulai || durasiJam === undefined) {
        return res.status(400).json({
            status: "error",
            message: "Semua field wajib diisi",
            data: null
        });
    }

    const baru = {
        id: fieldBookings.length > 0
            ? Math.max(...fieldBookings.map((b) => b.id)) + 1
        : 1,
        namaPemesan,
        lapangan,
        tanggal,
        jamMulai,
        durasiJam
    };

    fieldBookings.push(baru);

    res.status(201).json({
        status: "success",
        message: "Booking berhasil ditambahkan",
        data: baru
    });
});

// PUT /field-bookings/:id -> mengubah data booking
app.put("/field-bookings/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = fieldBookings.findIndex((b) => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: "error",
            message: "Data tidak ditemukan",
            data: null
        });
    }

    const { namaPemesan, lapangan, tanggal, jamMulai, durasiJam } = req.body;

    if (!namaPemesan || !lapangan || !tanggal || !jamMulai || durasiJam === undefined) {
        return res.status(400).json({
            status: "error",
            message: "Semua field wajib diisi",
            data: null
        });
    }

    fieldBookings[index] = {
        id: id,
        namaPemesan,
        lapangan,
        tanggal,
        jamMulai,
        durasiJam
    };

    res.status(200).json({
        status: "success",
        message: "Booking berhasil diperbarui",
        data: fieldBookings[index]
    });
});

// DELETE /field-bookings/:id -> menghapus data booking
app.delete("/field-bookings/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = fieldBookings.findIndex((b) => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: "error",
            message: "Data tidak ditemukan",
            data: null
        });
    }

    fieldBookings.splice(index, 1);

    res.status(200).json({
        status: "success",
        message: "Booking berhasil dihapus",
        data: null
    });
});

app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Endpoint tidak ditemukan",
        data: null
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});