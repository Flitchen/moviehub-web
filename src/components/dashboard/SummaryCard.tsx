import React from "react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center">
      <div className="mr-4">{icon}</div>
      <div>
        <p className="text-gray-400">{title}</p>
        <p className="text-2xl font-bold">{value.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
