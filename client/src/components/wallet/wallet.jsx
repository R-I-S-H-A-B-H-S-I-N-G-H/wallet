import { useEffect, useState } from "react";
import WalletService from "../../apiService/WalletService";
import Transactions from "../transaction/transaction";
import BarChart from "../charts/barChart/BarChart";
import { WalletUtil } from "../../utils/WalletUtil";
import Tags from "../tags/Tags";
import Badge from "../badge/Badge";

export default function Wallet() {
	const [wallet, setWallet] = useState(null);
	useEffect(() => {
		getWallet();
	}, []);
	async function getWallet() {
		const walletResp = await WalletService.getWallet("f14c8ab0-1b9b-4fc6-833d-8c01c3658bec");
		const walletutil = new WalletUtil(walletResp);
		setWallet(walletutil);
	}

	return (
		<>
			<div style={{ display: "flex", gap: "10px" }}>
				<Badge heading={"Total Income"} mainContent={wallet?.getTotalBudget()} />
				<Badge type={"secondary"} heading={"Current Balance"} mainContent={wallet?.getTotalMoneyLeft()} />
				<Badge type={"ternary"} heading={"Total Spendings"} mainContent={wallet?.getTotalSpending()} />
			</div>
			{wallet?.getTags().map((tag) => (
				<Tags key={`${tag}`} tag={tag} transactions={wallet?.getTagTransactions(tag)} />
			))}

			{/* <BarChart /> */}
		</>
	);
}
