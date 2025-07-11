import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const MoodGraph = ({ moodLogs }) => {
  const data = {
    labels: moodLogs.map((entry) => entry.date), // e.g., ["Jul 1", "Jul 2", ...]
    datasets: [
      {
        label: "Stats Level",
        data: moodLogs.map((entry) => entry.level), // mood level: 1=Sad to 5=Happy
        backgroundColor: "rgba(59,130,246,0.2)", // Tailwind blue-500 light
        borderColor: "#3b82f6",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: (val) => {
            const moods = [
              "Depressed 😢",
              "Sad 😞",
              "Neutral 😐",
              "Cool 😎",
              "Happy 😂",
            ];
            return moods[val - 1] || val;
          },
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default MoodGraph;
