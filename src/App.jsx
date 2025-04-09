import { useState } from "react";
import "./app.css";

const productList = [
  {
    id: 101,
    productName: "Redmi 10 ",
    price: 28000,
    stock: 20,
  },
  {
    id: 102,
    productName: "Realme 13",
    price: 12000,
    stock: 10,
  },
  {
    id: 103,
    productName: "Samsung",
    price: 38000,
    stock: 15,
  },
  {
    id: 104,
    productName: "Iphone 14",
    price: 88000,
    stock: 5,
  },
];

const TableRow = ({
  id,
  productName,
  price,
  stock,
  quantity,
  total,
  increment,
  decrement,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{productName}</td>
      <td>{price}</td>
      <td>{stock}</td>
      <td>{quantity}</td>
      <td>{total}</td>
      <td
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
          border: "0px solid black",
        }}>
        <button
          style={{
            border: "none",
            padding: "5px 20px",
            cursor: "pointer",
          }}
          onClick={() => increment(id)}
          disabled={stock === 0}>
          +
        </button>
        <button
          style={{
            border: "none",
            cursor: "pointer",
            padding: "5px 20px",
          }}
          onClick={() => decrement(id)}
          disabled={quantity === 0}>
          {" "}
          -{" "}
        </button>
      </td>
    </tr>
  );
};

const App = () => {
  const [products, setProducts] = useState(
    productList.map((item) => ({
      ...item,
      quantity: 0,
      total: 0,
    }))
  );
  const incrementQuantity = (id) => {
    setProducts(
      products.map((product) => {
        if (id === product.id && product.stock > 0) {
          product.quantity++;
          product.total = product.quantity * product.price;
          product.stock--;
        }
        return product;
      })
    );
  };

  const decrementQuantity = (id) => {
    const updatedProducts = products.map((product) => {
      if (id === product.id && product.quantity > 0) {
        product.quantity--;
        product.total = product.quantity * product.price;
        product.stock++;
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const totalPrice = products.reduce((acc, cur) => acc + cur.total, 0);

  return (
    <div className='productBox'>
      <h1>Product List</h1>
      <table border='1' cellPadding='10' cellSpacing='0' width={"100%"}>
        <thead style={{ width: "100%", backgroundColor: "#2c5e77", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "white", color: "black" }}>
          {products.map((products) => (
            <TableRow
              key={products.id}
              {...products}
              increment={incrementQuantity}
              decrement={decrementQuantity}
            />
          ))}

          <tr>
            <td colspan='5' style={{ textAlign: "right", fontWeight: "bold" }}>
              Total Price:
            </td>
            <td colspan='1' style={{ textAlign: "center", fontWeight: "bold" }}>
              {totalPrice} BDT
            </td>
            <td>
              <button type='submit' style={{ padding: "5px 22px", cursor: "pointer" }}>
                Buy Now
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
