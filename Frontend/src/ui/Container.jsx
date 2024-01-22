function Container({ children }) {
  return (
    <div className="max-w-full h-full bg-blue-950 text-blue-200 rounded-lg overflow-scroll shadow-lg ">
      {children}
    </div>
  );
}

export default Container;
