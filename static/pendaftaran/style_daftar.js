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
  
    // Jika opsi yang dipilih adalah "Tugas Akhir", tampilkan input pembimbing 2
    if (selectedValue === "ta" || selectedValue === "i2") {
      document.getElementById("selectPembimbing2").parentNode.removeAttribute("hidden");
      document.getElementById("inputNPMAnggota2").parentNode.setAttribute("hidden");
    } else {
      // Sembunyikan input pembimbing 2 jika opsi yang dipilih bukan "Tugas Akhir"
      document.getElementById("selectPembimbing2").parentNode.setAttribute("hidden", "true");
    }
});