import React from "react";
import axios from "axios";

import styles from "./Drawer.module.scss";

import Info from "../Info";
import AppContext from "../../context.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({onCloseCart, onRemove, items = [], opened}) {
  const {cartItems, setCartItems} = React.useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const totalPrice = cartItems.reduce((sum, obj) => sum + obj.price, 0);

  const onClickOrder = async () => {
    try{
      setIsLoading(true);
      const{data} = await axios.post(`https://6387382ad9b24b1be3e9cb49.mockapi.io/orders`, {
        items : cartItems,
      });
      setOrderId(data.id)
      setIsOrderComplete(true);
      setCartItems([]);  
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://6387382ad9b24b1be3e9cb49.mockapi.io/cart/` + item.id);
        await delay(1000);
      }
    } catch (error){
      alert('Не удлось создать заказ :(')
    }
    setIsLoading(false);
  }

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
      <h2 className="mb-30 d-flex justify-between align-center">
        Корзина
        <img 
          className="cu-p" 
          src="/img/drawer/btn-remove.svg" 
          alt="Remove" 
          onClick={onCloseCart}
          />
      </h2>
      {
        items.length > 0 ? 
        (<>
          <div className="items flex">
            {items.map((obj) => (
              <div key={obj.id} className="cartItem d-flex align-center mb-20">
                <div className="cartItemImg" style={{ backgroundImage: `url(${obj.imgUrl})` }}>
                </div>
                <div className="mr-12 flex">
                  <p className="mb-5">{obj.title}</p>
                  <b>{obj.price} руб.</b>
                </div>
                <img className="removeBtn" onClick={() => onRemove(obj.id)} src="/img/drawer/btn-remove.svg" alt="Remove" />
              </div>
            ))}
          </div>
          <div className="cartTotalBlock">
            <ul>
              <li>
                <span>Итого:</span>
                <div></div>
                <b>{totalPrice} руб.</b>
              </li>
              <li>
                <span>Налог 5%: </span>
                <div></div>
                <b>{Math.round(totalPrice / 100 * 5)} руб.</b>
              </li>
            </ul>
            <button className="greenButton" onClick={onClickOrder} disabled={isLoading}>
              Оформить заказ
              <img src="/img/drawer/arrow.svg" />
            </button>
          </div>
        </>)
        : 
        (<Info 
          title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"} 
          description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} 
          image={isOrderComplete ? "/img/drawer/complete-order.png" : "/img/drawer/empty-cart.jpeg"} />)
      }      
      </div>
    </div>
   );
}

export default Drawer;