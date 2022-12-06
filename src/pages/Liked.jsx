import Card from '../components/Card/Index';
import AppContext from '../context';
import React from'react';
import Info from '../components/Info';
import {Link} from 'react-router-dom';

function Liked({onAddToLiked, onAddToCart}) {
   const {isLiked} = React.useContext(AppContext)
   return (
      <div className="content p-40">
         {
            isLiked.length > 0 ? 
               (<div>
                  <div className= "d-flex flex-wrap align-center  mb-20 mr-15 ml-15">
                  <Link to='/'>
                     <img width={35} height={35} src="/img/liked/back.svg" alt="back" className='mr-10'/>
                  </Link>
                     <h1 className='ml-10'>Мои закладки</h1>
                  </div>
                  <div className="sneakers d-flex flex-wrap">
                     {isLiked.map((item, index) => (
                           <Card 
                           key={index}
                           onPlus = {(obj) => onAddToCart(obj)}
                           onLiked ={(obj) => onAddToLiked(obj)}
                           Liked={true}
                           {...item}
                           />
                     ))}
                  </div>
               </div>)
            :
            (<Info title="Закладок нет :(" description="Вы ничего не добавляли в закладки" image="/img/liked/smail.png" />)
         } 
      </div>
   )
}

export default Liked;


