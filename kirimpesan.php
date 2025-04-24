<?php
    // Koneksi ke database
    $host = "localhost";
    $user = "root";
    $password = "root";
    $db = "portfolio"; 

    $conn = new mysqli($host, $user, $password, $db);

    // Cek koneksi
    if ($conn->connect_error) {
        die("Koneksi gagal: " . $conn->connect_error);
    }

    // Ambil data dari form dan amankan
    $nama = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $telepon = htmlspecialchars($_POST['phone']);
    $pesan = htmlspecialchars($_POST['message']);

    // Simpan ke database
    $sql = "INSERT INTO kontak (nama, email, telepon, pesan) VALUES ('$nama', '$email', '$telepon', '$pesan')";

    if ($conn->query($sql) === TRUE) {
        // Tidak ada output HTML di sini jika menggunakan Fetch API
        http_response_code(200); // Set status kode sukses
    } else {
        // Tidak ada output HTML di sini jika menggunakan Fetch API
        http_response_code(500); // Set status kode error server
        echo "Gagal menyimpan pesan: " . $conn->error; // Mungkin berguna untuk debugging
    }

    $conn->close();
?>