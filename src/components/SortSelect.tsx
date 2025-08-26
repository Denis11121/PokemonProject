interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function SortSelect({ value, onChange }: Props) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="name-asc">Name (A-Z)</option>
      <option value="name-desc">Name (Z-A)</option>
    </select>
  );
}
