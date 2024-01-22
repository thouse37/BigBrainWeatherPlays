const SortDropDown = ({ onSortChange }) => {
  return (
    <div className="pb-6 mr-8">
      <select
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-blue-900 text-blue-300 text-center py-2 px-4 border border-blue-400 rounded shadow"
      >
        <option value="all">All Games</option>
        <option value="highTemperature">High Temperature</option>
        <option value="lowTemperature">Low Temperature</option>
        <option value="windy">Windy Conditions</option>
        <option value="rainy">Rainy Conditions</option>
      </select>
    </div>
  );
};

export default SortDropDown;
