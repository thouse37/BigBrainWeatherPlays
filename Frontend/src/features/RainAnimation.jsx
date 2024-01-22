const RainAnimation = () => {
  const rainStyle = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: `url(/rain.png)`,
    animation: "rain 0.3s linear infinite",
  };

  return <div className="rain" style={rainStyle} />;
};

export default RainAnimation;
