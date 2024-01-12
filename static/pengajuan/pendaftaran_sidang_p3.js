// Import library dan function yang dibutukan
import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getValue, setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";
import { UrlCekPendaftaranSidangP3, UrlPostPendaftaranSidangP3 } from "../controller/template.js";
import { token } from "../controller/cookies.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

// Cek Pendaftaran Sidang P3
postWithToken(UrlCekPendaftaranSidangP3, "LOGIN", token, "test", ResponseSidangP3)

function ResponseSidangP3(value) {
    const bgSuccess = 'alert alert-success';

    if (value.data) {
        setInner('AlertDaftarSidang', 'Sebelum melakukan pendaftaran sidang, silahkan cek nilai matakuliah prasyaratnya <a href="">di sini</a>!');
        document.getElementById('AlertDaftarSidang').className = bgSuccess;
        console.log("Masuk ke Success value");
    } else {
        console.log(value);
    }
}

// Untuk POST Pendaftaran Sidang P3
// Membuat function untuk mengirimkan data pendaftaran sidang p3
function SubmitPendaftaranSidangP3() {
    const inputNPMAnggota1 = getValue('inputNPMAnggota1');
    const selectPosisiAnggota1 = getValue('selectPosisiAnggota1');
    const inputNPMAnggota2 = getValue('inputNPMAnggota2');
    const selectPosisiAnggota2 = getValue('selectPosisiAnggota2');
    const selectPembimbing = getValue('selectPembimbing');
    const inputUrlPelatihan = getValue('inputUrlPelatihan');
    const inputDaftarHadir = getValue('inputDaftarHadir');
    const inputBuktiSubmitArtikel = getValue('inputBuktiSubmitArtikel');
    const inputUrlGoogleBook = getValue('inputUrlGoogleBook');

    const myData = {
        "npm_1": inputNPMAnggota1, 
        "posisi_mhs_1": selectPosisiAnggota1, 
        "npm2": inputNPMAnggota2, 
        "posisi_mhs_2": selectPosisiAnggota2, 
        "pembimbing": selectPembimbing, 
        "url_pengabdian": inputUrlPelatihan, 
        "daftar_hadir": inputDaftarHadir, 
        "bukti_artikel": inputBuktiSubmitArtikel, 
        "url_google_book": inputUrlGoogleBook
    };

    console.log(myData);

    fetch(UrlPostPendaftaranSidangP3, {
        method : "POST",
        headers : header,
        body : JSON.stringify(myData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon : 'success',
                title : 'Sukses!',
                text : 'Pendaftaran Sidang Proyek 3 Berhasil Disubmit',
                showConfirmButton : false,
                timer : 1500
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

// Event listener tuntuk tombol "Submit Pendaftaran Sidang"
const buttonDaftarSidangP3 = document.getElementById('');
buttonDaftarSidangP3.addEventListener('click', () => {
    const inputNPMAnggota1 = getValue('inputNPMAnggota1');
    const selectPosisiAnggota1 = getValue('selectPosisiAnggota1');
    const inputNPMAnggota2 = getValue('inputNPMAnggota2');
    const selectPosisiAnggota2 = getValue('selectPosisiAnggota2');
    const selectPembimbing = getValue('selectPembimbing');
    const inputUrlPelatihan = getValue('inputUrlPelatihan');
    const inputDaftarHadir = getValue('inputDaftarHadir');
    const inputBuktiSubmitArtikel = getValue('inputBuktiSubmitArtikel');
    const inputUrlGoogleBook = getValue('inputUrlGoogleBook');

    if (!inputNPMAnggota1 || !selectPosisiAnggota1 || !inputNPMAnggota2 || 
        !selectPosisiAnggota2 || !selectPembimbing || !inputUrlPelatihan ||
        !inputDaftarHadir || !inputBuktiSubmitArtikel || !inputUrlGoogleBook) {
            Swal.fire({
                icon : 'warning',
                title : 'Oops...',
                text : 'Semua Field Harus Diisi',
            });
            return;
        }
        Swal.fire({
            title : 'Submit Pendaftaran Sidang Proyek 3?',
            text : 'Apakah anda yakin ingin submit pendaftaran sidang proyek 3?',
            icon : 'question',
            showCancelButton : true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                SubmitPendaftaranSidangP3();
            }
        });
});