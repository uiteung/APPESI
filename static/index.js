// Import library yang dibutuhkan
import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { UrlGetAllPersyaratan } from "./controller/template.js";
import { token } from "./controller/cookies.js"

// Get Data Program Studi
CihuyDomReady(() => {
    const tablebody = CihuyId("tablebody");
    const buttonPreviousPage = CihuyId("prevPageBtn");
    const buttonNextPage = CihuyId("nextPageBtn");
    const halamanSaatIni = CihuyId("currentPage");
    const itemPerPage = 8;
    let halamannow = 1;

    const requestOptions = {
        method: 'GET',
        headers: {
            'AUTH': token,
            'Content-Type': 'application/json'
        }
    };

    // Untuk Get All Data Pendaftar
    fetch(UrlGetAllPersyaratan, requestOptions)
    .then((result) => {
    return result.json();
    })
    .then((data) => {
        if (data && Array.isArray(data.data)) {
            let tableData = "";
            data.data.forEach((item) => {
                if (item.persyaratan && item.persyaratan.jadwal) {
                    const values = item.persyaratan;
    
                    // Check if 'jadwal' and 'penguji2' are defined before accessing
                    const penguji2Value = values.jadwal.penguji2 ? values.jadwal.penguji2 : '';
    
                    // Format tanggal
                    const waktuSidangFormatted = new Date(values.jadwal.waktuSidang).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
    
                    tableData += `
                        <tr>
                            <td>
                                <p class="fw-bold mb-1">${values.npm_1}</p>
                            </td>
                            <td>
                                <p class="fw-bold mb-1">${values.npm2}</p>
                            </td>
                            <td>
                                <p class="fw-bold mb-1">${values.pembimbing}</p>
                            </td>
                            <td>
                                <p class="fw-bold mb-1">${penguji2Value}</p>
                            </td>
                            <td>
                                <p class="fw-bold mb-1">${waktuSidangFormatted}</p>
                            </td>
                        </tr>`;
                }
            });
            // Tampilkan data pegawai ke dalam tabel
            document.getElementById("tablebody").innerHTML = tableData;
    
            // Untuk Memunculkan Pagination Halamannya
            displayData(halamannow);
            updatePagination();
        } else {
            console.error("Data or data.data is undefined or not an array.");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

    // Fungsi untuk Menampilkan Data
	function displayData(page) {
		const baris = CihuyQuerySelector("#tablebody tr");
		const mulaiindex = (page - 1) * itemPerPage;
		const akhirindex = mulaiindex + itemPerPage;

		for (let i = 0; i < baris.length; i++) {
			if (i >= mulaiindex && i < akhirindex) {
				baris[i].style.display = "table-row";
			} else {
				baris[i].style.display = "none";
			}
		}
	}

    // Fungsi untuk Update Pagination
    function updatePagination() {
        halamanSaatIni.textContent = `Halaman ${halamannow}`;
    }

    // Button Pagination (Sebelumnya)
    buttonPreviousPage.addEventListener("click", () => {
        if (halamannow > 1) {
            halamannow--;
            displayData(halamannow);
            updatePagination();
        }
    });

    // Button Pagination (Selanjutnya)
	buttonNextPage.addEventListener("click", () => {
		const totalPages = Math.ceil(
			tablebody.querySelectorAll("#tablebody tr").length / itemPerPage
		);
		if (halamannow < totalPages) {
			halamannow++;
			displayData(halamannow);
			updatePagination();
		}
	});
});