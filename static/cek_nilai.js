// Import library yang dibutuhkan
// import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
// import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { UrlGetNilaiP3ByNPM } from "./controller/template.js";
import { token } from "./controller/cookies.js"

// Untuk Cek Nilai Sidang Mahasiswa
document.addEventListener('DOMContentLoaded', function () {
    // Mapping NIDN ke Nama
    const codeToNameMapping = {
        "0420058801" : "Roni Andarsyah, S.T.,M.Kom.,SFPC",
        "0427078401" : "Cahyo Prianto, S.Pd.,M.T.,CDSP.,SFPC",
        "0407117405" : "M. Yusril Helmi Setyawan, S.Kom.,M.Kom.,SFPC",
        "0410118609" : "Rolly Maulana Awangga, S.T.,MT.,CAIP,SFPC",
        "0402058005" : "Mohamad Nurkamal Fauzan, S.T.,M.T.,SFPC",
        "0423127804" : "Roni Habibi, S.Kom.,M.T.,SFPC",
        "0416048803" : "Syafrial Fachri Pane,ST. M.TI.,EBDP.,CDSP.,SFPC",
        "0402047205" : "Rd. Nuraini Siti Fatonah, S.S.,M.Hum.,SFPC",
        "0415048901" : "Nisa Hanum Harani, S.Kom.,M.T.,CDSP.,SFPC",
        "0415107901" : "Woro Isti Rahayu, S.T.,M.T.,SFPC",
        "0403117607" : "Noviana Riza, S.Si.,M.T.,SFPC",
    };

    const btnCekNilai = document.querySelector('#btnCekNilai');
    const inputNPM = document.querySelector('#inputNPM');
    const rataRataNilaiElement = document.querySelector('#RataRataNilai');
    
    btnCekNilai.addEventListener('click', function () {
        const npm = inputNPM.value;
        const GetNilaiP3ByNPM = `https://kimteungbim.ulbi.ac.id/sidang/p3/npmnilai?npm=${npm}`;
        
        const tablebody = document.getElementById("tablebody-nilai");
        const requestOptions = {
            method: 'GET',
            headers: {
                'LOGIN': token,
                'Content-Type': 'application/json'
            }
        };

        fetch(GetNilaiP3ByNPM, requestOptions)
        .then((result) => {
            return result.json();
        })
        .then((data) => {
            if (data && Array.isArray(data.data)) {
                let tableData = "";
                let totalNilai = 0;
                let jumlahData = 0;
                data.data.forEach((item) => {
                    if (item.nilai) {
                        const { nilai } = item;
                        nilai.forEach((itemNilai) => {
                            totalNilai += itemNilai.value;
                            jumlahData++;
                        });
                        const { nim, tipe, tahun, penilai } = item;
                        const getNameByCode = (code) => codeToNameMapping[code] || 'Tidak Ada';
                        tableData += `
                            <tr style="text-align: center; vertical-align: middle">
                                <td hidden></td>
                                <td>
                                    <p class="fw-bold mb-1">${nim}</p>
                                </td>    
                                <td>
                                    <p class="fw-bold mb-1">${tipe}</p>
                                </td>
                                <td>
                                    <p class="fw-bold mb-1">${tahun}</p>
                                </td>
                                <td>
                                    <p class="fw-bold mb-1">${getNameByCode(penilai)}</p>
                                </td>
                                <td>
                                    <p class="fw-bold mb-1">${nilai.map(item => item.value).join(', ')}</p>
                                </td>
                            </tr>`;
                    }
                });
                tablebody.innerHTML = tableData;
                
                // Hitung nilai rata-rata
                const rataRataNilai = totalNilai / jumlahData;
                
                // Tampilkan nilai rata-rata
                rataRataNilaiElement.textContent = `Nilai Akhir Sidang adalah sebesar : ${rataRataNilai.toFixed(2)}`;
            } else {
                console.error("Data or data.data is undefined or not an array.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    });
});