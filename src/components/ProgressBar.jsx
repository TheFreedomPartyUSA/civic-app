export default function ProgressBar({ xp }) {
  const percent = (xp % 50) * 2;

  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{
        height: "10px",
        background: "#ddd",
        borderRadius: "10px"
      }}>
        <div style={{
          width: `${percent}%`,
          height: "100%",
          background: "black",
          borderRadius: "10px"
        }} />
      </div>
    </div>
  );
}