// Import library dan function yang dibutukan
import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getValue, setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";
import { UrlCekPendaftaranSidangP3, UrlPostPendaftaranSidangP3 } from "../controller/template.js";
// import { token } from "../controller/cookies.js"

var header = new Headers();
// header.append("AUTH", token);
header.append("AUTH", "v4.public.eyJleHAiOiIyMDI0LTAxLTE2VDExOjQxOjAzKzA3OjAwIiwiaWF0IjoiMjAyNC0wMS0xNlQwOTo0MTowMyswNzowMCIsImlkIjoiNjI4NTIxMzkyMTMzMSIsIm5iZiI6IjIwMjQtMDEtMTZUMDk6NDE6MDMrMDc6MDAifTZMKIURebHKzIXMRDp2YwmV99rtYUUO0dlizNpmkIXW0O3bZrtoD2_negar_KzV0sS--wo20pAXIk_7zSDbZgk")
header.append("Content-Type", "application/json");

// // Cek Pendaftaran Sidang P3
// postWithToken(UrlCekPendaftaranSidangP3, "AUTH", token, "test", ResponseSidangP3)

// function ResponseSidangP3(value) {
//     const bgSuccess = 'alert alert-success';

//     if (value.data) {
//         setInner('AlertDaftarSidang', 'Sebelum melakukan pendaftaran sidang, silahkan cek nilai matakuliah prasyaratnya <a href="">di sini</a>!');
//         document.getElementById('AlertDaftarSidang').className = bgSuccess;
//         console.log("Masuk ke Success value");
//     } else {
//         console.log(value);
//     }
// }


// Event listener for form submission
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Your existing code for handling the button click
    const inputNPMAnggota1 = getValue('inputNPMAnggota1');
    const selectPosisiAnggota1 = getValue('selectPosisiAnggota1');
    // const selectKelasAnggota1 = getValue('selectKelasAnggota1');
    const inputNPMAnggota2 = getValue('inputNPMAnggota2');
    const selectPosisiAnggota2 = getValue('selectPosisiAnggota2');
    // const selectKelasAnggota2 = getValue('selectKelasAnggota2');
    const selectPembimbing = getValue('selectPembimbing');
    const inputUrlPelatihan = getValue('inputUrlPelatihan');
    const inputDaftarHadir = getValue('inputDaftarHadir');
    const inputBuktiSubmitArtikel = getValue('inputBuktiSubmitArtikel');
    const inputUrlGoogleBook = getValue('inputUrlGoogleBook');

    // Check if all required fields are filled
    if (!inputNPMAnggota1 || !selectPosisiAnggota1 || !inputNPMAnggota2 || 
        !selectPosisiAnggota2 || !selectPembimbing || !inputUrlPelatihan ||
        !inputDaftarHadir || !inputBuktiSubmitArtikel || !inputUrlGoogleBook) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Semua Field Harus Diisi',
        });
        return;
    }

    // Your existing code for displaying confirmation dialog and submitting data
    Swal.fire({
        title: 'Submit Pendaftaran Sidang Proyek 3?',
        text: 'Apakah anda yakin ingin submit pendaftaran sidang proyek 3?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            // Call the correct function (SubmitPendaftaranSidangP3)
            SubmitPendaftaranSidangP3();
        }
    });
});

// Untuk POST Pendaftaran Sidang P3
// Membuat function untuk mengirimkan data pendaftaran sidang p3
function SubmitPendaftaranSidangP3() {
    const inputNPMAnggota1 = getValue('inputNPMAnggota1');
    const selectPosisiAnggota1 = getValue('selectPosisiAnggota1');
    // const selectKelasAnggota1 = getValue('selectKelasAnggota1');
    const inputNPMAnggota2 = getValue('inputNPMAnggota2');
    const selectPosisiAnggota2 = getValue('selectPosisiAnggota2');
    // const selectKelasAnggota2 = getValue('selectKelasAnggota2');
    const selectPembimbing = getValue('selectPembimbing');
    const inputUrlPelatihan = getValue('inputUrlPelatihan');
    const inputDaftarHadir = getValue('inputDaftarHadir');
    const inputBuktiSubmitArtikel = getValue('inputBuktiSubmitArtikel');
    const inputUrlGoogleBook = getValue('inputUrlGoogleBook');

    const myData = {
        "npm_1": inputNPMAnggota1, 
        "posisi_mhs_1": selectPosisiAnggota1, 
        // "kelas_mhs_1" : selectKelasAnggota1,
        "npm2": inputNPMAnggota2,
        "posisi_mhs_2": selectPosisiAnggota2, 
        // "kelas_mhs_2" : selectKelasAnggota2,
        "pembimbing": selectPembimbing, 
        "url_pengabdian": inputUrlPelatihan, 
        "daftar_hadir": inputDaftarHadir, 
        "bukti_artikel": inputBuktiSubmitArtikel, 
        "url_google_book": inputUrlGoogleBook
    };

    console.log(myData);

    fetch(UrlPostPendaftaranSidangP3, {
        method : "POST",
        headers: header,
        body : JSON.stringify(myData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            Swal.fire({
                icon : 'success',
                title : 'Sukses!',
                text : 'Pendaftaran Sidang Proyek 3 Berhasil Disubmit',
                showConfirmButton : false,
                timer : 1500
            }).then(() => {
                window.location.href = 'pendaftaran_sidang_p3.html';
            })
        } else {
            Swal.fire({
                icon : 'error',
                title : 'Oops...',
                text : 'Pendaftaran Sidang Proyek 3 Gagal Disubmit'
            })
        }
    })
    .catch(error => {
        console.error("Error saat melakukan POST Data : ", error);
    });
}