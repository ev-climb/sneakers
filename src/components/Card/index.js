import React from 'react'
import styles from './Card.module.scss'

function Card({title, url, price, onClickLike, onClickPlus, id}) {
  const [checked, setChecked] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);

  const onPlus = () => {
    {!checked && onClickPlus({title, url, price, id})};
    setChecked(!checked)
  }

  const onLikeClick = () => {
    setIsLiked(!isLiked);
  }

    return (
        <div className={styles.card}>
          <div className="favorite">
            <img src={isLiked ? '/img/like-btn-on.svg' : '/img/like-btn-off.svg'} alt="Like" onClick={onLikeClick}/>
          </div>
          <img width={133} height={112} src={url} alt="Sneakers"/>
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>            
            <img 
              className={styles.plus} 
              src={checked ? "/img/sn-on.svg" : "/img/sn-off.svg"} 
              alt="кнопка добавить" 
              onClick={onPlus}
            />            
          </div>
        </div>
    )
}

export default Card;