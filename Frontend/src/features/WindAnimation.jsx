const WindAnimation = ({ direction }) => {
  const rotation = (direction - 90) % 360;

  const windStyle = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: "hidden",
  };

  const arrowBaseStyle = {
    width: "20%",
    height: "auto",
    position: "absolute",
    animation: `moveWind 3s linear infinite`,
    left: "40%",
    top: "45%",
  };

  const getArrowStyle = (index) => ({
    ...arrowBaseStyle,
    opacity: 0,
    animationDelay: `${index * 0.5}s`,
  });

  const containerStyle = {
    "--wind-direction": `${rotation}deg`,
  };

  return (
    <div className="wind" style={{ ...windStyle, ...containerStyle }}>
      {[...Array(5)].map((_, index) => (
        <img
          key={index}
          src="/wind.svg"
          alt="Wind arrow"
          className="wind-arrow"
          style={getArrowStyle(index)}
        />
      ))}
    </div>
  );
};

export default WindAnimation;
