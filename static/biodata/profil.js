import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";
import { setValue } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";
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
        setValue('inputNPM', result.data.npm);
        setValue('inputNama', result.data.nama);
        setValue('inputNPMAnggota2', result.data.npm2);
        setValue('programStudi', getProdiByCode(result.data.Kode_Jp));
        setValue('email', result.data.email);
        setValue('noHandphone', result.data.phone);
    }
}