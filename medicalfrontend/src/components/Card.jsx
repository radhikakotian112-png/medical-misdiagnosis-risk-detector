function Card({ title, value, icon, color }) {
  return (
    <div className="card">
      <div className="card-top">
        <div>
          <h4>{title}</h4>
          <h2>{value}</h2>
        </div>

        <div
          className="card-icon"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default Card;