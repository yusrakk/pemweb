<?php
$host = "localhost";
$username = "root";
$password = "root";
$dbname = "portfolio";

$conn = new mysqli($host, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Proses penghapusan data jika ada permintaan
if (isset($_GET['hapus_id'])) {
    $hapus_id = $_GET['hapus_id'];
    $sql_delete = "DELETE FROM kontak WHERE id = ?";
    $stmt = $conn->prepare($sql_delete);
    $stmt->bind_param("i", $hapus_id);
    if ($stmt->execute()) {
        echo "<p style='color: green;'>Data berhasil dihapus.</p>";
    } else {
        echo "<p style='color: red;'>Gagal menghapus data: " . $stmt->error . "</p>";
    }
    $stmt->close();
}

$sql = "SELECT * FROM kontak ORDER BY tanggal_kirim DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Data Pesan Kontak</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #999; padding: 8px; text-align: left; }
        th { background-color: #eee; }
        .hapus-button { background-color: #f44336; color: white; border: none; padding: 5px 10px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; cursor: pointer; border-radius: 5px; }
        .hapus-button:hover { opacity: 0.8; }
    </style>
</head>
<body>

<h2>Data Pesan Kontak</h2>

<?php
if ($result->num_rows > 0) {
    echo "<table>
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Telepon</th>
                <th>Pesan</th>
                <th>Waktu Kirim</th>
                <th>Aksi</th>
            </tr>";
    $no = 1;
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . $no++ . "</td>
                <td>" . htmlspecialchars($row["nama"]) . "</td>
                <td>" . htmlspecialchars($row["email"]) . "</td>
                <td>" . htmlspecialchars($row["telepon"]) . "</td>
                <td>" . htmlspecialchars($row["pesan"]) . "</td>
                <td>" . $row["tanggal_kirim"] . "</td>
                <td><a href='?hapus_id=" . $row["id"] . "' class='hapus-button' onclick='return confirm(\"Apakah Anda yakin ingin menghapus pesan ini?\")'>Hapus</a></td>
              </tr>";
    }
    echo "</table>";
} else {
    echo "<p>Tidak ada data ditemukan.</p>";
}

$conn->close();
?>

</body>
</html>