import { WalletUtil } from "../../utils/WalletUtil";
import ProgressLine from "../progressLine/ProgressLine";
import Transactions from "../transaction/transaction";
import style from "./tags.module.css";

export default function Tags(props) {
	const { tag, transactions = [] } = props;
	const { name: tagName, value: tagValue } = tag;

	if (!tag || !transactions || !Array.isArray(transactions) || transactions.length == 0) return <></>;

	function getSpendingPercentage() {
		return (100 * WalletUtil.getTotalSpending(transactions)) / WalletUtil.getTagAmount(tag);
	}

	return (
		<div className={style.container}>
			<ProgressLine
				label={`${tagName}-${WalletUtil.getTagAmount(tag)}`}
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
