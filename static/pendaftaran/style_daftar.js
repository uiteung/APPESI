// Membuat variabel untuk menyimpan elemen judul
var titleElement = document.getElementById("titleDaftar");

// Menambahkan event listener ke dropdown untuk mendengarkan perubahan
document.getElementById("selectTipeBimbingan").addEventListener("change", function() {
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
      document.getElementById("inputNPMAnggota2").disabled = true;
      document.getElementById("selectPembimbing2").parentNode.removeAttribute("hidden");
      document.getElementById("hasilPlagiarisme").parentNode.removeAttribute("hidden");
  } else {
      // Jika selectedValue tidak sama dengan 'i2' atau 'ta', pastikan textbox diaktifkan dan elemen selectPembimbing2 disembunyikan
      document.getElementById("inputNPMAnggota2").disabled = false;
      document.getElementById("selectPembimbing2").parentNode.setAttribute("hidden", "true");
  }
});