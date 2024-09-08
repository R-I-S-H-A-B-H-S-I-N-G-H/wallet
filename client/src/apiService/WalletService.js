import axios from "axios";
export default class WalletService {
	static Wallet_BASE_URL = "https://wallte-api.vercel.app/wallet";

	static async getWallet(id) {
		const url = `${this.Wallet_BASE_URL}/${id}`;
		return JSON.parse(await (await fetch(url)).json());
	}

	static async syncWallet(payload) {
		const url = `${this.Wallet_BASE_URL}`;
		await axios.post(url, payload);
	}

	static async addTag(walletId, payload) {
		const { name, amount } = payload;

		if (!walletId || !name || !amount) {
			console.error("Invalid payload");
			return;
		}

		const url = `${this.Wallet_BASE_URL}/${walletId}/addTag`;
		return axios.put(url, { name, amount });
	}

	static async addTransaction(walletId, payload) {
		const { name, amount, tag, type } = payload;

		if (!walletId || !name || !amount || !tag || !type) {
			console.error("Invalid payload");
			return;
		}

		const url = `${this.Wallet_BASE_URL}/${walletId}/addTransaction`;
		return axios.put(url, { name, amount, tag, type });
	}
}
