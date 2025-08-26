import "../style.css";

interface Props {
  label: string;
  value: number;
  max?: number;
}

export default function StatBar({ label, value, max = 255 }: Props) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="stat-bar">
      <div className="stat-bar-header">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="stat-bar-track">
        <div
          className="stat-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
