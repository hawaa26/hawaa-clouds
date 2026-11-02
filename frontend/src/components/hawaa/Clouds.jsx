export const Cloud = ({ className = "", tone = "pink", style }) => {
  const t = tone === "blue" ? "puff blue" : "puff";
  return (
    <div className={`relative ${className}`} style={style} aria-hidden="true">
      <div className={t} style={{ left: "0%", top: "38%", width: "38%", height: "56%" }} />
      <div className={t} style={{ left: "20%", top: "8%", width: "42%", height: "78%" }} />
      <div className={t} style={{ left: "48%", top: "22%", width: "34%", height: "62%" }} />
      <div className={t} style={{ left: "66%", top: "44%", width: "30%", height: "48%" }} />
      <div className={t} style={{ left: "10%", top: "56%", width: "80%", height: "40%" }} />
    </div>
  );
};
