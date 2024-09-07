import { useEffect, useState } from "react";
import Wallet from "./components/wallet/wallet";
import "./main.css";
function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Wallet />
		</>
	);
}

export default App;
