import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import styles from './Admin.module.css'


type ProductType = {
  name: string;
  price: string
}

type HistoryType = {
  username: string;
  products: string[];
  price: string;
  createdAt: string
}
const Admin = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [history, setHistory] = useState<HistoryType[]>([]);

  useEffect(() => {
    getProducts();
    getHistory();
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

  const getHistory = useCallback(() => {
    (async () => {
      try {
        const history = await axios.get('http://localhost:5000/get-history');
        setHistory(history.data)
      } catch (error: any) {
        console.error('Error fetching data', error.message);
      }
    })();
  }, [])


  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:5000/create-product', { name, price }).then(() => {
        getProducts();
      });
    } catch (error: any) {
      console.error('Registration failed', error.message);
    }
  };

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const day = newDate.getDate().toString().padStart(2, '0');

    return `${year} ${month} ${day}`
  }


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Products</th>
                <th>Total Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
            {history.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.products.join(', ')}</td>
                  <td>{item.price} $</td>
                  <td>{formatDate(item.createdAt)}</td>
                </tr>
              )
            })
            }
            </tbody>

          </table>

        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
            <tr>
              <th>ID</th>
              <th>Product name</th>
              <th>Product price</th>
            </tr>
            </thead>
            <tbody>
            {
              products.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>

        <div className={styles.card}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <div className={styles.btn} onClick={handleAdd}>Add</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin