import React from 'react'
import { AppContext } from '../../App';
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss'

function Card({
    id,
    name, 
    price, 
    itemId,
    imageUrl, 
    onClickLike, 
    onClickPlus, 
    loading = false,
    favorited = false,
    }) {
 
    const { cartItems, favorites } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const obj = { id, name, imageUrl, price, itemId: id }

    const onPlus = () => {
      onClickPlus(obj);
    }

    const onLike = () => {
      onClickLike(obj);
      setIsFavorite(!isFavorite)
    }

    return (      
      <div className={styles.card}>
        { loading ? 
            <ContentLoader 
              speed={2}
              width={150}
              height={200}
              viewBox="0 0 150 200"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
              <rect x="1" y="105" rx="5" ry="5" width="150" height="15" /> 
              <rect x="0" y="130" rx="5" ry="5" width="100" height="15" /> 
              <rect x="0" y="176" rx="5" ry="5" width="80" height="25" /> 
              <rect x="117" y="169" rx="10" ry="10" width="32" height="32" />
            </ContentLoader>
        :
        <>
          {onClickLike && (
            <div className="favorite">
              <img 
                src={
                  (isFavorite ? "/img/like-btn-on.svg" : "/img/like-btn-off.svg")}
                alt="Like" 
                onClick={onLike}
              />
            </div>
          )}
          <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>         

            {(onClickPlus && 
              <img 
                onClick={onPlus}
                alt="кнопка добавить" 
                className={styles.plus}            
                src={ cartItems.length >0 ?
                  ((cartItems.some((obj) => obj.imageUrl === imageUrl)) ? "/img/sn-on.svg" : "/img/sn-off.svg") : "/img/sn-off.svg"                 
                  } 
              />    
            )}        
          </div>
        </>
        }
      </div>
    )
}

export default Card;