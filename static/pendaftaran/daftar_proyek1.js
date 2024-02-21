import { getWithHeader } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.1/croot.js";
import { setValue } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.0.5/croot.js";
import { UrlGetBiodataByToken } from "../controller/template.js";
import { token } from "../controller/cookies.js";

// Untuk inputin data mahasiswa ke inputan secara otomatis
await getWithHeader(UrlGetBiodataByToken, "LOGIN", token, biodataMahasiswa);

async function biodataMahasiswa(result) {
    if (result.data) {
        setValue('inputNPMAnggota1', result.data.npm);
    }
}