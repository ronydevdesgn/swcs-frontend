import { Plus } from "react-feather";
import "./Card.css";

interface TitleProps {
  titleCard: string;
  numberCard: number;
  descriptionCard: string;
  iconUp?: React.ReactNode;
  iconDown?: React.ReactNode;
}

export function Card({
  titleCard,
  numberCard,
  descriptionCard,
  iconUp,
  iconDown
}: TitleProps) {
  return (
    <section className="card">
      <h3 className="header-card">{titleCard}</h3>
      <div className="main-card">
        <span>
          <span className="emoji-plus"><Plus size={24} strokeWidth={4}/></span>
          {numberCard}
          <span className="emoji-up">{iconUp}{iconDown}</span>
        </span>
        <p>{descriptionCard}</p>
      </div>
    </section>
  );
}
