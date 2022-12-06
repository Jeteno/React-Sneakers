import Header from './components/Header';
import Drawer from './components/Drawer/Index';
import AppContext from './context';

import {Route, Routes} from 'react-router-dom';
import React from 'react';
import axios from 'axios';

import Home from './pages/Home.jsx'
import Liked from './pages/Liked.jsx';
import Orders from './pages/Orders';

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLiked, setLiked] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, likedResponse, itemsResponse] = await Promise.all([
          axios.get('https://6387382ad9b24b1be3e9cb49.mockapi.io/cart'), 
          axios.get('https://6387382ad9b24b1be3e9cb49.mockapi.io/liked'), 
          axios.get('https://6387382ad9b24b1be3e9cb49.mockapi.io/items')])
        
        setIsLoading(false);
  
        setCartItems(cartResponse.data);
        setLiked(likedResponse.data);
        setItems(itemsResponse.data);
  
      } catch (error) {
        alert('Ошибка при запросе данных');
      }
      }

      fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem){
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://6387382ad9b24b1be3e9cb49.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);    
        const {data} = await axios.post(`https://6387382ad9b24b1be3e9cb49.mockapi.io/cart`, obj);
        setCartItems((prev) => prev.map(item => {
          if(item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        }));    
      }
    }catch (error) {
      alert('Ошибка при добавлении в корзину')
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6387382ad9b24b1be3e9cb49.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));  
    } catch (error) {
      alert('Ошибка при удалении из корзины')
    }
  };

  const onAddToLiked = async(obj) => {
    try {
      if (isLiked.find(likObj => likObj.id === obj.id)){
        axios.delete(`https://6387382ad9b24b1be3e9cb49.mockapi.io/liked/${obj.id}`);
        setLiked((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
          const {data} = await axios.post(`https://6387382ad9b24b1be3e9cb49.mockapi.io/liked`, obj);
          setLiked((prev) => [...prev, data]);  
      }
    } catch (error) {
      alert ('Не удалось добавить в избранные');
    }
  };
 
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }

  return (
    <AppContext.Provider value={{items, cartItems, isLiked, isItemAdded, setCartOpened, setCartItems, onAddToCart}}>
      <div className="wrapper clear">
          <Drawer 
            items={cartItems} 
            onCloseCart={() => setCartOpened(false)} 
            onRemove={onRemoveItem}
            opened={cartOpened}
          />
        <Header onClickCart={() => setCartOpened(true)}/>
        <Routes>
          <Route path="/" element={<Home 
              items={items} 
              cartItems={cartItems}
              searchValue={searchValue} 
              setSearchValue={setSearchValue} 
              onChangeSearchInput={onChangeSearchInput} 
              onAddToLiked={onAddToLiked}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />}>
          </Route>
          <Route path="/liked" element={<Liked 
            onAddToLiked={onAddToLiked}
            onAddToCart={onAddToCart}
          />}> 
          </Route>
          <Route path="/orders" element={<Orders 
            onAddToLiked={onAddToLiked}
            onAddToCart={onAddToCart}
          />}> 
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;