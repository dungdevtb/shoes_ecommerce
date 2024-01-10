/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars
import CryptoJS from "crypto-js";

const cryptkey = 'cryptkey123123';
const iv = 'iv123123';

export const encrypted = (data) => {
    var encryptedData = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(cryptkey),
        {
            keySize: 256 / 8,
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
    return {
        timestamp: data,
        checksum: encryptedData.ciphertext.toString(CryptoJS.enc.Base64)
    }
}
