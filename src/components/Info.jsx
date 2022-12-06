import React from 'react'
import AppContext from '../context';
import {Link} from 'react-router-dom';

const Info = ({image, title, description}) => {
   const {setCartOpened} = React.useContext(AppContext);

  return (
   <div className="cartEmpty d-flex align-center justify-center flex-column flex">
   <img className="mb-20" width={120} src={image} alt="Empty"/>
   <h2>{title}</h2>
   <p className="opacity-6">{description}</p>
   <Link to='/'>
    <button className="greenButton" onClick={() => setCartOpened(false)}>
      <img 
        src="/img/drawer/arrow.svg" 
        alt="Arrow"
      />
      Вернуться назад
    </button>
   </Link>
 </div>

  )
}

export default Info;
