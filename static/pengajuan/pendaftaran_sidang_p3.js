// Import library dan function yang dibutukan
import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { token } from "../controller/cookies.js";

// Cek Pendaftaran Sidang P3
postWithToken(UrlCekPendaftaranSidangP3, "LOGIN", token, "test", ResponseSidangP3)

function ResponseSidangP3(value) {
    const bgSuccess = 'alert alert-success';

    if (value.data) {
        setInner('AlertDaftarSidang', 'Sebelum melakukan pendaftaran sidang, silahkan cek nilai matakuliah prasyaratnya <a href="">di sini</a>!');
        document.getElementById('AlertDaftarSidang').className = bgSuccess;
        console.log("Masuk ke Success value");
    } else {
        console.log(value);
    }
}