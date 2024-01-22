export const getNavLinkClasses = (isActive) => {
  const baseClasses =
    "flex items-center gap-3 font-medium p-3 transition-all border border-transparent rounded-lg focus:bg-blue-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2";
  const activeClasses = "text-blue-950 bg-blue-400 border-blue-400 rounded-lg";
  const inactiveClasses =
    "text-blue-400 hover:text-blue-950 hover:bg-yellow-300 ";
  return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
};
