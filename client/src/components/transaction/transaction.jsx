import style from "./transaction.module.css";

export default function Transactions(props) {
	const { id, date: dateStr, tag, amount = 100, type = "DEBIT", name } = props;
	const date = new Date(dateStr);
	const tags = [tag];

	const styleObject = {
		DEBIT: {
			color: "#FF5184",
		},
		CREDIT: {
			// backgroundColor: "#FFF2F7",
			color: "#87DCBA",
		},
	};

	function getAmountRepresentationValue() {
		return `${type == "DEBIT" ? "-" : "+"}${amount}`;
	}

	return (
		<div className={style.container}>
			<div className={style.leftContainer}>
				<div className={style.timeContainer}>{name}</div>
				<div className={style.timeContainer}>{date.toLocaleDateString()}</div>
				<div style={{ ...styleObject[type] }} className={style.amountContainer}>
					{getAmountRepresentationValue()}
				</div>
			</div>
			<div>{tag}</div>
		</div>
	);
}
