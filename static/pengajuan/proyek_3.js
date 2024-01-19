import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";
import { UrlCekPendaftaranSidangP3 } from "../controller/template.js";
import { token } from "../controller/cookies.js";

// Cek Apakah dia sudah daftar sidang atau belum
getWithHeader(UrlCekPendaftaranSidangP3, "AUTH", token, cekDaftarP3);

function cekDaftarP3(result) {
    const linkElement = document.getElementById('buttonFormP3');

    if (result.data) {
        // If data exists, update href to "success_daftarp3.html"
        linkElement.href = "success_daftarp3.html";
    } else {
        // If data does not exist, keep href as "pendaftaran_sidang_p3.html"
        linkElement.href = "pendaftaran_sidang_p3.html";
    }
}

// Jika klik halaman yang belum tersedia
document.addEventListener("DOMContentLoaded", function () {
    // Get the button element
    var ajukanSidangBtn = document.getElementById("buttonNilaiP3");

    // Add a click event listener to the button
    ajukanSidangBtn.addEventListener("click", function () {
        // Display a SweetAlert
        Swal.fire({
            title: 'Halaman Belum Tersedia',
            text: 'Maaf, halaman ini belum tersedia.',
            icon: 'info',
            confirmButtonText: 'OK'
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Get the button element
    var ajukanSidangBtn = document.getElementById("buttonJadwalP3");

    // Add a click event listener to the button
    ajukanSidangBtn.addEventListener("click", function () {
        // Display a SweetAlert
        Swal.fire({
            title: 'Halaman Belum Tersedia',
            text: 'Maaf, halaman ini belum tersedia.',
            icon: 'info',
            confirmButtonText: 'OK'
        });
    });
});