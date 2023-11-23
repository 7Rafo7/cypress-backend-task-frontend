import React, {useCallback, useEffect, useState} from "react";
import styles from "./Employee.module.css"
import axios from "axios";
import {jwtDecode} from "jwt-decode";


type ProductType = {
  _id: string;
  name: string;
  price: number;
}

type TokenType = {
  id: string;
  username: string
}

const Employee = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [candidateToDrag, setCandidateToDrag] = useState({});
  const [cartPrice, setCartPrice] = useState(0)
  const token = localStorage.getItem('token');


  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = useCallback(() => {
    (async () => {
      try {
        const products = await axios.get('http://localhost:5000/get-products');
        setProducts(products.data)
      } catch (error: any) {
        console.error('Error fetching data', error.message);
      }
    })();
  }, [])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    //@ts-ignore
    const exist = cartItems.find(item => item._id === candidateToDrag._id)
    if (exist) {
      setCandidateToDrag({})
      return
    }

    //@ts-ignore
    setCartPrice(cartPrice + Number(candidateToDrag.price))
    //@ts-ignore
    setCartItems([...cartItems, candidateToDrag])

    setCandidateToDrag({})
  };

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDragStart = (item: ProductType) => {
    setCandidateToDrag(item)
  }

  const handeBuy = async () => {
    try {
      // @ts-ignore
      const decodedToken: TokenType = jwtDecode(token);

      await axios.post('http://localhost:5000/create-history', {
        userId: decodedToken.id,
        username: decodedToken.username,
        price: cartPrice,
        products: cartItems.map(item => {
          return item.name
        })
      }).then(() => {
        alert("Successful")
        setCartItems([]);
        setCartPrice(0)
      });

      getProducts();
    } catch (error: any) {
      console.error('Registration failed', error.message);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div>Employee page</div>
        <div className={styles.cardContainer}>
          <div className={styles.card}
               onDrop={handleDrop}
               onDragOver={allowDrop}
          >
            {products.map((item, index) => (
              <div
                key={index}
                className={styles.boxContainer}
                draggable={true}
                onDragStart={() => onDragStart(item)}
              >
                {item.name} {item.price} $
              </div>
            ))}
          </div>

          <div className={styles.card}
               onDrop={handleDrop}
               onDragOver={allowDrop}>
            {cartItems.map((item, index) => (
              <div
                key={index}
                className={styles.boxContainer}
                draggable={true}
                onDragStart={() => onDragStart(item)}
              >
                <div>{item.name} {item.price} $</div>
              </div>
            ))}
            <div className={styles.cartActions}>
              <div className={styles.price}>
                <span>Total</span>
                <span>{cartPrice} $</span>
              </div>
              <div className={styles.buyBtn} onClick={handeBuy}>Buy</div>
            </div>
          </div>
        </div>

      </div>
    </>

  )
}

export default Employee