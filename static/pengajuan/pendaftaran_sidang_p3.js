// Import library dan function yang dibutukan
import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getValue, setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";
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
    const inputNamaAnggota1 = getValue('inputNamaAnggota1');
    const inputNPMAnggota1 = getValue('inputNPMAnggota1');
    const selectKelasAnggota1 = getValue('selectKelasAnggota1');
    const selectPosisiAnggota1 = getValue('selectPosisiAnggota1');
    const inputNamaAnggota2 = getValue('inputNamaAnggota2');
    const inputNPMAnggota2 = getValue('inputNPMAnggota2');
    const selectKelasAnggota2 = getValue('selectKelasAnggota2');
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
                text : 'Pendaf'
            })
        }
    })
}