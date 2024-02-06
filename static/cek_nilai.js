// Import library yang dibutuhkan
// import { CihuyDomReady, CihuyQuerySelector } from "https://c-craftjs.github.io/table/table.js";
// import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { UrlGetNilaiP3ByNPM } from "./controller/template.js";
import { token } from "./controller/cookies.js"

// Untuk Cek Nilai Sidang Mahasiswa
document.addEventListener('DOMContentLoaded', function () {
    const btnCekNilai = document.querySelector('#btnCekNilai');
    const inputNPM = document.querySelector('#inputNPM');
    
    btnCekNilai.addEventListener('click', function () {
        const npm = inputNPM.value;
        const GetNilaiP3ByNPM = UrlGetNilaiP3ByNPM + `?npm=${npm}`
        
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
                data.data.forEach((item) => {
                    if (item.nilai) {
                        const { nim, tipe, tahun, penilai, nilai } = item;
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
            } else {
                console.error("Data or data.data is undefined or not an array.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    });
});
