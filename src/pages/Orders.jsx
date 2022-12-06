import React from'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Card from '../components/Card/Index';
import Info from '../components/Info';


function Orders() {
   const [isOrders, setIsOrders] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(true);

   React.useEffect(() => {
      (async() => {
         try {
            const { data } = await axios.get(`https://6387382ad9b24b1be3e9cb49.mockapi.io/orders`);
            setIsOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            setIsLoading(false);
         } catch (error) {
            alert ('Не удалось отобразить список ваших покупок');
            console.error(error);
         }
      })()
   }, []);

   return (
      <div className="content p-40">
         {
            isOrders.length > 0 ? 
               (<div>
                  <div className= "d-flex flex-wrap align-center  mb-20 mr-15 ml-15">
                     <Link to='/'>
                        <img width={35} height={35} src="/img/liked/back.svg" alt="back" className='mr-10'/>
                     </Link>
                     <h1 className='ml-10'>Мои покупки</h1>
                  </div>
                  <div className="sneakers d-flex flex-wrap">
                     {(isLoading 
                     ? [...Array(4)] 
                     : isOrders)
                     .map((item, index) => (
                           <Card 
                              key={index}
                              loading={isLoading}
                              {...item}
                           />
                     ))}
                  </div>
               </div>)
            :
            (<Info title="У вас нет заказов" description="Вы нищеброд?  Оформите хотя бы один заказ." image="/img/orders/orders.png" />)
         } 
      </div>
   )
}

export default Orders;
