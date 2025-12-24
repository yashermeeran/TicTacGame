export default function Button({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value && <span className={value === "x" ? "x" : "o"}>{value.toUpperCase()}</span>}
    </button>
  );
}
