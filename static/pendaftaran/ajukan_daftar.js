import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";
import { setValue } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";
import { UrlGetBiodataByToken, UrlPostPendafaranP1, UrlPostPendaftaranI2, UrlPostPendaftaranTA, UrlGetSyarati2 } from "../controller/template.js";
import { token } from "../controller/cookies.js";

// Untuk inputin data mahasiswa ke inputan secara otomatis
await getWithHeader(UrlGetBiodataByToken, "LOGIN", token, biodataMahasiswa);

async function biodataMahasiswa(result) {
    if (result.data) {
        setValue('inputNPMAnggota1', result.data.npm);
    }
}

// Mengubah teks judul sesuai dengan nilai dropdown yang dipilih
document.getElementById("selectTipeBimbingan").addEventListener("change", async function() {
    // Mendapatkan nilai terpilih dari dropdown
    var selectedValue = this.value;
    
    // Membuat objek map untuk menghubungkan nilai dropdown dengan judul yang sesuai
    var titleMap = {
      "p1": "Proyek 1",
      "p2": "Proyek 2",
      "p3": "Proyek 3",
      "i1": "Internship 1",
      "i2": "Internship 2",
      "ta": "Tugas Akhir"
    };
  
    // Mengubah teks judul sesuai dengan nilai dropdown yang dipilih
    titleElement.innerText = "Pendaftaran " + titleMap[selectedValue];

    if (selectedValue === 'i2' || selectedValue === 'ta') {
      await getWithHeader(UrlGetSyarati2, "LOGIN", token, matkulReq);
    }
});

async function matkulReq(result) {
    if (!result.success) {
        document.getElementById("form-body").parentNode.setAttribute("hidden", "true");
        Swal.fire({
            title: 'Oops...',
            html: 'Anda belum memenuhi syarat untuk mengikuti Internship 2. <br><br><br> <small>Jika menurut anda terjadi kesalahan, Silahkan hubungi Admin DTI <a href="https://wa.me/+6289687960500">disini</a></small>',
            icon: 'error',
            showCloseButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
        });
    }
}

// Post Pendaftaran
document.addEventListener('DOMContentLoaded', function() {
    // Mendengarkan event submit pada form
    document.getElementById('buttonDaftar').addEventListener('click', function(event) {
        // Menghentikan perilaku default form
        event.preventDefault();

        // Menampilkan alert konfirmasi
        Swal.fire({
            title: 'Konfirmasi',
            text: 'Apakah Anda yakin ingin melakukan pendaftaran?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then((result) => {
            // Jika pengguna menekan tombol "Ya", lanjutkan pendaftaran
            if (result.isConfirmed) {
                continueRegistration();
            }
        });
    });
    
    // Function untuk melanjutkan proses pendaftaran
    function continueRegistration() {
        // Mendapatkan nilai yang dipilih dari dropdown
        var selectedValue = document.getElementById('selectTipeBimbingan').value;
        
        // Menyiapkan action form berdasarkan nilai yang dipilih
        var formAction;
        switch(selectedValue) {
            case 'p1':
                formAction = UrlPostPendafaranP1;
                break;
            case 'i2':
                formAction = UrlPostPendaftaranI2;
                break;
            case 'ta':
                formAction = UrlPostPendaftaranTA;
                break;
            default:
                // Jika tidak ada yang dipilih, tidak melakukan apa-apa
                return;
        }
        
        // Set action form sesuai dengan tipe bimbingan yang dipilih
        document.querySelector('form').action = formAction;
        
        // Mengirimkan data ke endpoint yang sesuai
        fetch(formAction, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'LOGIN': token
            },
            body: JSON.stringify(getFormData(selectedValue))
        })
        .then(response => {
            if (!response.ok) {
                Swal.fire({
                    title: 'Oops...',
                    text: 'Gagal melakukan pendaftaran. Silahkan hubungi wa.me/+6289687960500',
                    icon: 'error'
                })
            }
            return response.json();
        })
        .then(data => {
            // Lakukan sesuatu setelah berhasil mengirimkan data
            console.log('Pengajuan berhasil:', data);
            Swal.fire({
                title : 'Sukses!',
                text: 'Pendaftaran berhasil ditambahkan.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            })
            .then(() => {
                location.reload();
            })
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    }
    
    // Function untuk mendapatkan data formulir sesuai dengan tipe bimbingan yang dipilih
    function getFormData(selectedValue) {
        var formData = {};
        switch(selectedValue) {
            case 'p1':
                formData = {
                    npm_1: document.getElementById('inputNPMAnggota1').value,
                    nama_mhs_1: "Alif", // Nilai hard-coded untuk contoh
                    npm2: document.getElementById('inputNPMAnggota2').value,
                    kelas_mhs_2: "2B", // Nilai hard-coded untuk contoh
                    pembimbing: document.getElementById('selectPembimbing1').value,
                    judul_penelitian: document.getElementById('judulPenelitian').value,
                    url_proposal_penelitian: document.getElementById('inputUrlProposal').value,
                    url_plagiarisme_proposal: document.getElementById('hasilPlagiarisme').value,
                    approval: false // Nilai hard-coded untuk contoh
                };
                break;
            case 'i2':
                formData = {
                    pembimbing1: document.getElementById('selectPembimbing1').value,
                    pembimbing2: document.getElementById('selectPembimbing2').value,
                    judul_penelitian: document.getElementById('judulPenelitian').value,
                    url_proposal_penelitian: document.getElementById('inputUrlProposal').value,
                    url_plagiarisme_proposal: document.getElementById('hasilPlagiarisme').value,
                    tahun: "2024", // Nilai hard-coded untuk contoh
                    approval: false // Nilai hard-coded untuk contoh
                };
                break;
            case 'ta':
                formData = {
                    pembimbing1: document.getElementById('selectPembimbing1').value,
                    pembimbing2: document.getElementById('selectPembimbing2').value,
                    judul_penelitian: document.getElementById('judulPenelitian').value,
                    url_proposal_penelitian: document.getElementById('inputUrlProposal').value,
                    url_plagiarisme_proposal: document.getElementById('hasilPlagiarisme').value,
                    tahun: "2024", // Nilai hard-coded untuk contoh
                    approval: false // Nilai hard-coded untuk contoh
                };
                break;
            default:
                // Jika tidak ada yang dipilih, tidak melakukan apa-apa
                break;
        }
        return formData;
    }
});
