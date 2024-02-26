import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";
import { setValue } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";
import { UrlGetBiodataByToken, UrlPostPendafaranP1, UrlPostPendaftaranI2, UrlPostPendaftaranTA } from "../controller/template.js";
import { token } from "../controller/cookies.js";

// Untuk inputin data mahasiswa ke inputan secara otomatis
await getWithHeader(UrlGetBiodataByToken, "LOGIN", token, biodataMahasiswa);

async function biodataMahasiswa(result) {
    if (result.data) {
        setValue('inputNPMAnggota1', result.data.npm);
    }
}

// Post Pendaftaran
document.addEventListener('DOMContentLoaded', function() {
    // Mendengarkan event submit pada form
    document.getElementById('buttonDaftar').addEventListener('click', function(event) {
        // Menghentikan perilaku default form
        event.preventDefault();
        
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getFormData(selectedValue))
        })
        .then(response => {
            if (!response.ok) {
                Swal.fire({
                    title: 'Oops...',
                    text: 'Gagal melakukan pendaftaran.',
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
    });
    
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
