import styles from './Card.modules.scss';
import React from 'react';

import AppContext from '../../context';

import ContentLoader from "react-content-loader";

function Card({id, imgUrl, title, price, onPlus, onLiked, Liked=false, loading=false}) {

  const obj = {id, parentId: id, imgUrl, title, price};

  const onClickPlus = () => {
    onPlus(obj);
  };
  const [isLiked, setLiked] = React.useState(Liked);
  const onClickLikes = () => {
    setLiked(!isLiked);
    onLiked(obj);
  };
  const {isItemAdded} = React.useContext(AppContext);


   return (
      <div className="card">
        {
          loading ? 
          <ContentLoader 
            speed={2}
            width={150}
            height={206}
            viewBox="0 0 150 187"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"> 
            <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
            <rect x="0" y="105" rx="3" ry="3" width="150" height="15" /> 
            <rect x="0" y="125" rx="3" ry="3" width="93" height="15" /> 
            <rect x="0" y="162" rx="8" ry="8" width="80" height="24" /> 
            <rect x="118" y="154" rx="8" ry="8" width="32" height="32" />
          </ContentLoader> :
          <>
            {onLiked && 
              <div className="favorite" onClick={onClickLikes}>
                <img 
                  className={styles.iconBtn} 
                  src={isLiked ? "/img/card/icons/heart-liked.svg" : "/img/card/icons/heart-unliked.svg"} 
                  alt="unliked" 
                  />
              </div>}
            <img width={133} height={112} src={imgUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="card-body d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b> {price} руб.</b>
              </div>
              {onPlus && 
              <img 
                className={styles.iconBtn} 
                src={isItemAdded(id) ? "/img/card/icons/btn-checked.svg" : "/img/card/icons/btn-plus.svg"} 
                alt="Plus" 
                onClick={onClickPlus}
                />}
            </div>
          </>
        }
    </div>
   );
}

export default Card;
