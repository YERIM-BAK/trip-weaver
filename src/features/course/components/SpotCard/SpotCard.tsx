import { Spot } from "../../course.types";

interface SpotCardProps {
  spot: Spot;
  order: number;
}

function SpotCard({ spot, order }: SpotCardProps) {
  return (
    <article className="spotCard">
      <div className="spotOrder" aria-hidden="true">
        {order}
      </div>
      <div className="spotBody">
        <header className="spotHeader">
          <h3 className="spotName">{spot.name}</h3>
          {spot.category && (
            <span className="spotCategory">{spot.category}</span>
          )}
        </header>
        <p className="spotDesc">{spot.description}</p>
        <footer className="spotMeta">
          <span className="spotAddress">
            <span aria-hidden="true">📍</span>
            {spot.address}
          </span>
          <span className="spotDuration">
            <span aria-hidden="true">⏱</span>
            {spot.duration}
          </span>
        </footer>
      </div>
    </article>
  );
}

export default SpotCard;
