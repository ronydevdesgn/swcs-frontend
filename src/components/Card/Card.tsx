import "./Card.css";

interface TitleProps {
  titleCard?: string;
  numberCard?: number;
  descriptionCard?: string;
  emojiUp?: string
}

export function Card({ titleCard, numberCard, descriptionCard, emojiUp }: TitleProps) {
  return (
    <section className="card">
      <h3 className="header-card">{titleCard}</h3>
      <div className="main-card">
        <span>
          <span className="emoji-plus">+</span>
          {numberCard}
          <span className="emoji-up">{emojiUp}</span>
        </span>
        <p>{descriptionCard}</p>
      </div>
    </section>
  );
}
