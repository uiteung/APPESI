import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";
import { UrlGetBiodataByToken } from "../controller/template.js";
import { token } from "../controller/cookies.js";

// Mapping NIDN ke Nama
const codeToProdiMapping = {
    "14" : "D4 Teknik Informatika",
};

// Cek Pendaftaran Sidang P3
await getWithHeader(UrlGetBiodataByToken, "LOGIN", token, biodataMahasiswa);

const getProdiByCode = (code) => codeToProdiMapping[code] || 'Tidak Ada';

async function biodataMahasiswa(result) {
    if (result.data) {
        setValue('inputNPM', data.npm);
        setValue('inputNama', data.nama);
        setValue('inputNPMAnggota2', data.npm2);
        setValue('programStudi', getProdiByCode(data.Kode_Jp));
        setValue('email', data.email);
        setValue('noHandphone', data.phone);
    }
}