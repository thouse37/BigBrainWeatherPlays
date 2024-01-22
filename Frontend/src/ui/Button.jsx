import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, submit, onClick }) {
  const base =
    "inline-block text-sm rounded-full bg-blue-400 font-semibold tracking-wide text-blue-950 transition-colors duration-300 hover:bg-yellow-300 focus:bg-blue-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed items-center space-x-2";

  const styles = {
    primary: base + " px-3 py-2 sm:px-4 sm:py-3",
    small: base + " px-2.5 py-1.5 sm:px-5 sm:py-2.5 text-xs",
    secondary:
      "inline-block text-sm rounded-full border-2 border-blue-400 font-semibold uppercase tracking-wide text-blue-400 transition-colors duration-300 hover:bg-yellow-300 hover:text-blue-800 focus:bg-blue-400 focus:text-blue-950 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1 disabled:cursor-not-allowed px-4 py-2.5 sm:px-6 sm:py-3.5",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button
      type={submit ? "submit" : "button"}
      disabled={disabled}
      className={styles[type]}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
