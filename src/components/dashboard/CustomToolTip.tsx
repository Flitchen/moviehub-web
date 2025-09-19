const CustomToolTip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-2 rounded shadow-lg">
        <p className="font-semibold">
          {label}: {payload[0].value} movies
        </p>
      </div>
    );
  }
  return null;
};

export default CustomToolTip;
