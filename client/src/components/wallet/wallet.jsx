import { useEffect, useState } from "react";
import WalletService from "../../apiService/WalletService";
import Transactions from "../transaction/transaction";
import BarChart from "../charts/barChart/BarChart";
import { WalletUtil } from "../../utils/WalletUtil";
import Tags from "../tags/Tags";
import Badge from "../badge/Badge";
import Modal from "react-modal";

export default function Wallet() {
	const [wallet, setWallet] = useState(null);
	const [modalIsOpen, setIsOpen] = useState(false);
	let subtitle;

	useEffect(() => {
		getWallet();
	}, []);

	async function getWallet() {
		// const walletResp = await WalletService.getWallet("f14c8ab0-1b9b-4fc6-833d-8c01c3658bec");
		// 66dd5073ce87e6dc1cc40622
		const walletResp = await WalletService.getWallet("66dd68042e76ce9fc45fab55");


		const walletutil = new WalletUtil(walletResp);
		setWallet(walletutil);
	}

	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = "#f00";
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<>
			<Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={{}} contentLabel="Example Modal">
				<button onClick={closeModal}>close</button>
			</Modal>
			<div style={{ display: "flex", gap: "10px" }}>
				<Badge heading={"Total Income"} mainContent={wallet?.getTotalBudget()} />
				<Badge type={"secondary"} heading={"Current Balance"} mainContent={wallet?.getTotalMoneyLeft()} />
				<Badge type={"ternary"} heading={"Total Spendings"} mainContent={wallet?.getTotalSpending()} />
				<button onClick={openModal}>Add Transaction</button>
			</div>
			{wallet?.getTags().map((tag) => (
				<Tags key={`${tag}`} tag={tag} transactions={wallet?.getTagTransactions(tag)} />
			))}

			{/* <BarChart /> */}
		</>
	);
}
