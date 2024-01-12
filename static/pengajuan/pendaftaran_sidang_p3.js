// Import library dan function yang dibutukan
import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { token } from "../controller/cookies.js";

// Cek Pendaftaran Sidang P3
postWithToken(UrlCekPendaftaranSidangP3, "LOGIN", token, "test", ResponseSidangP3)

function ResponseSidangP3(value) {
    if (value.data) {
        setInner('AlertDaftarSidang')
    }
}