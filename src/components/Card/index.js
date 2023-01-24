import React from 'react'
import styles from './Card.module.scss'

function Card({title, url, price, onClickLike, onClickPlus}) {
  const [checked, setChecked] = React.useState(false);

  const onPlus = () => {
    {!checked && onClickPlus({title, url, price})};
    setChecked(!checked)
  }

    return (
        <div className={styles.card}>
          <div className="favorite" onClick={onClickLike}>
            <img src="/img/like-btn-off.svg" alt="Like"/>
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