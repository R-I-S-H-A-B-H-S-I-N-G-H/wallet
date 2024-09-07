import axios, {} from "axios";
export default class WalletService {
	static Wallet_BASE_URL = "https://wallte-api.vercel.app/wallet";

	static async getWallet(id) {
		const url = `${this.Wallet_BASE_URL}/${id}`;
		return JSON.parse(await (await fetch(url)).json());
	}

	static async syncWallet(payload) {
		const url = `${this.Wallet_BASE_URL}`
		axios.post(url, payload)
	}
}
