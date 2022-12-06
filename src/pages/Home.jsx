import React from 'react'

import Card from '../components/Card/Index';
// import AppContext from '../context';

function Home({items, searchValue, setSearchValue, onChangeSearchInput, onAddToLiked, onAddToCart, cartItems, isLoading}) {
   
   const renderItems = () => { 
      const filtredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
      return (
         isLoading 
         ? [...Array(12)] 
         : filtredItems)
         .map((item, index) => (
            <Card 
            key={index}
            onPlus = {(obj) => onAddToCart(obj)}
            onLiked ={(obj) => onAddToLiked(obj)}
            loading={isLoading}
            {...item}
            />
         ));
   };
   return (
      <div className="content p-40">
         <div className= "d-flex flex-wrap align-center justify-between mb-20 mr-15 ml-15">
            <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
            <div className="search-block">
               <div className='search-block__body'>
                  <img src="img/search/search.svg" alt="search" />
                  <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
                  {searchValue && <img 
                  onClick={() => setSearchValue('')}
                  className="clear cu-p" 
                  src="/img/drawer/btn-remove.svg" 
                  alt="clear"
                  />}
               </div>
            </div>
         </div>
         <div className="sneakers d-flex flex-wrap">
         {renderItems()}
         </div>
      </div>
   )
}

export default Home;