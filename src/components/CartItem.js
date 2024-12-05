// src/components/CartItem.js
import React from "react";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div style={styles.cartItem}>
      <img src={item.image} alt={item.name} style={styles.image} />
      <div>
        <h4>{item.name}</h4>
        <p>Price: ${item.price}</p>
        <p>Size: {item.size}</p>
        <p>
          Quantity:
          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
            -
          </button>
          {item.quantity}
          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
        </p>
        <button onClick={() => onRemove(item.id)} style={styles.removeButton}>
          Remove
        </button>
      </div>
    </div>
  );
};

const styles = {
  cartItem: {
    display: "flex",
    borderBottom: "1px solid #ccc",
    padding: "10px 0",
  },
  image: {
    width: "100px",
    height: "100px",
    marginRight: "15px",
  },
  removeButton: {
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default CartItem;
