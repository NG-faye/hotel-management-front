const StatCard = ({ icon: Icon, count, label, subtext, bgColor, iconColor }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor} ${iconColor}`}>
        <Icon size={24} />
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-800">{count}</span>
          <span className="text-gray-500 text-sm">{label}</span>
        </div>
        <p className="text-xs text-gray-400">{subtext}</p>
      </div>
    </div>
  );
};

export default StatCard;