"use client";
import { useState } from "react";
import { strategies } from "./StrategyData";

export default function Home() {
  const [selectedMatchup, setSelectedMatchup] = useState<string>("Terran vs Zerg");
  const [strategy, setStrategy] = useState<string>(strategies[selectedMatchup]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const matchup = event.target.value;
    setSelectedMatchup(matchup);
    setStrategy(strategies[matchup]);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">StarCraft Infinite Fast Map Strategy</h1>
      <select 
        value={selectedMatchup} 
        onChange={handleChange} 
        className="p-2 border rounded"
        aria-label="Select matchup"
      >
        {Object.keys(strategies).map((matchup) => (
          <option key={matchup} value={matchup}>
            {matchup}
          </option>
        ))}
      </select>
      <div className="mt-4 p-4 border rounded bg-gray-100">
        <h2 className="text-xl font-semibold">Strategy for {selectedMatchup}</h2>
        <p>{strategy}</p>
      </div>
    </div>
  );
}
