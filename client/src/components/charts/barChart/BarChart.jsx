import { useEffect, useRef } from "react";
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController } from "chart.js";

// Register components
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController);

export default function BarChart() {
	const barChartRef = useRef(null);
	const chartObj = useRef(null);

	useEffect(() => {
		if (barChartRef.current) createChart();

		// Cleanup to destroy chart instance on component unmount or re-render
		return () => {
			if (chartObj.current) {
				chartObj.current.destroy();
			}
		};
	}, []);

	function createChart() {
		if (chartObj.current) {
			chartObj.current.destroy(); // Destroy any existing chart instance
		}

		chartObj.current = getChartObj(barChartRef.current);
		console.log("CHART OBJ :: ", chartObj.current);
	}

	function getChartObj(ctx) {
		console.log("calling get chart");

		const chartInstance = new Chart(ctx, {
			type: "bar",
			data: {
				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange","ramd"],
				datasets: [
					{
						label: "# of Votes",
						data: [12, 19, 3, 5, 2, 3,12],
						borderWidth: 1,
						backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
						borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});

		return chartInstance;
	}

	return <canvas ref={barChartRef}></canvas>;
}
