import { useEffect, useState } from "react";
import WalletService from "../../apiService/WalletService";
import Transactions from "../transaction/transaction";
import BarChart from "../charts/barChart/BarChart";
import { WalletUtil } from "../../utils/WalletUtil";
import Tags from "../tags/Tags";
import Badge from "../badge/Badge";
import Modal from "react-modal";
import Select from "react-dropdown-select";

export default function Wallet() {
	const walletId = "66ddc88399b3e9f524271921";
	const [wallet, setWallet] = useState(null);
	const [createTagModal, setCreateTagModal] = useState(false);
	const [createExpenseModal, setCreateExpenseModal] = useState(false);

	const newtag = {};
	const newtransaction = {};

	useEffect(() => {
		getWallet();
	}, []);

	async function getWallet() {
		// const walletResp = await WalletService.getWallet("f14c8ab0-1b9b-4fc6-833d-8c01c3658bec");
		// 66dd5073ce87e6dc1cc40622
		const walletResp = await WalletService.getWallet(walletId);

		const walletutil = new WalletUtil(walletResp);
		setWallet(walletutil);
	}

	function openModal() {
		setCreateTagModal(true);
	}

	function closeModal() {
		setCreateTagModal(false);
	}

	function onTagUpdate(key, val) {
		newtag[key] = val;
	}

	function onTransactionUpdate(key, value) {
		newtransaction[key] = value;
		console.log(newtransaction);
	}

	async function saveTag() {
		console.log(newtag);
		const savedTag = await WalletService.addTag(walletId, newtag);
		console.log(savedTag);
		await getWallet();
		setCreateTagModal(false);
	}

	async function saveTransaction() {
		console.log(newtransaction);
		const savedTransaction = await WalletService.addTransaction(walletId, newtransaction);
		console.log(savedTransaction);
		await getWallet();
		setCreateExpenseModal(false);
	}

	function getTagList() {
		return wallet?.getTags().map((ele) => ({ ...ele, label: ele.name, value: ele._id })) ?? [];
	}

	console.log(getTagList());

	return (
		<>
			<Modal isOpen={createExpenseModal} onRequestClose={() => setCreateExpenseModal(false)} contentLabel="Example Modal">
				<button onClick={() => setCreateExpenseModal(false)}>close</button>
				<Select options={getTagList()} onChange={(res) => onTransactionUpdate("tag", res[0].value)} />

				<Select
					options={[
						{ label: "DEBIT", value: "DEBIT" },
						{ label: "CREDIT", value: "CREDIT" },
					]}
					onChange={(res) => onTransactionUpdate("type", res[0].value)}
				/>

				<input onInput={(e) => onTransactionUpdate("name", e.target.value)} placeholder="tag title" />
				<input onInput={(e) => onTransactionUpdate("amount", parseInt(e.target.value))} placeholder="tag amount" type="number" />
				<button onClick={saveTransaction}>Submit</button>
			</Modal>

			<Modal isOpen={createTagModal} onRequestClose={closeModal} style={{}} contentLabel="Add Tag">
				<button onClick={closeModal}>close</button>
				<input onInput={(e) => onTagUpdate("name", e.target.value)} placeholder="tag title" />
				<input onInput={(e) => onTagUpdate("amount", parseInt(e.target.value))} placeholder="tag amount" type="number" />
				<button onClick={saveTag}>Submit</button>
			</Modal>

			<div style={{ display: "flex", gap: "10px" }}>
				<Badge heading={"Total Income"} mainContent={wallet?.getTotalBudget()} />
				<Badge type={"secondary"} heading={"Current Balance"} mainContent={wallet?.getTotalMoneyLeft()} />
				<Badge type={"ternary"} heading={"Total Spendings"} mainContent={wallet?.getTotalSpending()} />
				<button onClick={() => setCreateExpenseModal(true)}>Add Transaction</button>
				<button onClick={() => setCreateTagModal(true)}>Add Tag</button>
			</div>
			{wallet?.getTags().map((tag) => (
				<Tags key={tag._id} tag={tag} transactions={wallet?.getTagTransactions(tag)} />
			))}

			{/* <BarChart /> */}
		</>
	);
}
