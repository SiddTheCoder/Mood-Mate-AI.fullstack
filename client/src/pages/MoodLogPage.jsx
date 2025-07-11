import React from "react";
import MoodGraph from "../components/MoodGraph";
import PageBacker from "../components/PageBacker";

function MoodLogPage() {
  const [loading, setLoading] = React.useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  // Sample mood logs data
  const moodLogs = [
    { date: "Sunday", level: 1 },
    { date: "Monday", level: 4 },
    { date: "Tuesday", level: 2 },
    { date: "Wednesday", level: 5 },
    { date: "Thrusday", level: 2 },
    { date: "Friday", level: 3 },
    { date: "Saturday", level: 4 },
    { date: "Sunday", level: 5 },
    { date: "Monday", level: 3 },
  ];
  return (
    <div className="h-screen w-screen items-center justify-start">
      <PageBacker />
      <div className="flex flex-col items-center justify-center h-full w-[80vw] p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <MoodGraph moodLogs={moodLogs} />
        )}
      </div>
    </div>
  );
}

export default MoodLogPage;
