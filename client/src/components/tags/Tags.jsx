import { WalletUtil } from "../../utils/WalletUtil";
import ProgressLine from "../progressLine/ProgressLine";
import Transactions from "../transaction/transaction";
import style from "./tags.module.css";

export default function Tags(props) {
	const { tag, transactions = [] } = props;
	const { name: tagName, value: tagValue } = tag;

	if (!tag || !transactions || !Array.isArray(transactions) || transactions.length == 0) return <></>;

	function getSpendingPercentage() {
		console.log(WalletUtil.getTotalSpending(transactions) / WalletUtil.getTotalBudget(transactions));

		return (100 * WalletUtil.getTotalSpending(transactions)) / WalletUtil.getTotalBudget(transactions);
	}

	return (
		<div className={style.container}>
			{/* <h2>{`NAME :: ${name} and total value is ${value}`}</h2> */}
			<ProgressLine
				label={tagName}
				backgroundColor="lightgreen"
				visualParts={[
					{
						percentage: `${getSpendingPercentage()}%`,
						color: "indianred",
					},
				]}
			/>
			{transactions.map((ele, index) => (
				<Transactions key={index} {...ele} />
			))}
		</div>
	);
}
