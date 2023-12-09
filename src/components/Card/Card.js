import './Card.css';

const Card = ({ classes, children }) => {  
  return (
    <div className={`card card__${classes}`}>
      {children}
    </div>
  )
}

export default Card;