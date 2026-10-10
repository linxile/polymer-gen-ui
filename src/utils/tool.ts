import constant from '@/utils/constant'
import { AES, lib, enc, mode, pad } from 'crypto-js'

/**
 * 把路径转换成驼峰命名
 * @param path 路径，如 '/sys/user'
 * @returns 驼峰命名，如 'SysUser'
 */
export function pathToCamel(path: string): string {
	return path.replace(/\/(\w)/g, (_all, letter) => letter.toUpperCase())
}

/**
 * 是否外链
 * @param url 链接地址
 */
export function isExternalLink(url: string): boolean {
	return /^(https?:|\/\/|http?:|\/\/|^{{\s?apiUrl\s?}})/.test(url)
}

/**
 * 替换外链参数
 * @param url 链接地址，可能包含 {{apiUrl}} 占位符
 */
export function replaceLinkParam(url: string): string {
	return url.replace('{{apiUrl}}', constant.apiUrl)
}

// ==================== AES 加解密 ====================

/** 加密密钥（32 位） */
const ENCRYPT_KEY = 'polymerlowcode16'

/**
 * AES 解密
 * @param ciphertext Base64 密文
 */
export function decrypt(ciphertext: string): string {
	const cipherParams = lib.CipherParams.create({
		ciphertext: enc.Base64.parse(ciphertext)
	})
	const decrypted = AES.decrypt(cipherParams, enc.Utf8.parse(ENCRYPT_KEY), {
		mode: mode.ECB,
		padding: pad.Pkcs7
	})
	return decrypted.toString(enc.Utf8)
}

/**
 * AES 加密
 * @param plaintext 明文
 */
export function encrypt(plaintext: string): string {
	const message = enc.Utf8.parse(plaintext)
	const encrypted = AES.encrypt(message, enc.Utf8.parse(ENCRYPT_KEY), {
		mode: mode.ECB,
		padding: pad.Pkcs7
	})
	return encrypted.toString()
}
