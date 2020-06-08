import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import "./Cart.css";

export default function Cart() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("./mockData.json")
      .then((response) => response.json())
      .then((response) => {
        const itemHash = {};
        response.items.forEach((item) => {
          if (itemHash[item.id]) {
            itemHash[item.id].count += 1;
          } else {
            item.count = 1;
            itemHash[item.id] = item;
          }
        });
        setItems(Object.values(itemHash));
      });
  }, []);

  function changeCount(e, itemId) {
    const { value } = e.target;
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        item.count = Number(value.replace(/\D/, ""));
      }
      return item;
    });
    setItems(newItems);
  }

  function removeFromCart(itemId) {
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
  }

  function checkOut() {
    console.log("checking");
    if (!localStorage.getItem("user")) {
    }
  }

  return (
    <div>
      {items.length && (
        <>
          <div className="cart-item-display">
            <div>
              Total{" "}
              {items.reduce((prev, curr) => prev + curr.cost * curr.count, 0)}
            </div>
            <Button onClick={checkOut}>CHECKOUT</Button>
          </div>
          {items.map((item) => (
            <div key={item.id} className="cart-item-display">
              <div className="cart-info-display">
                {item.brand} {item.model} {item.year}
              </div>
              <div className="cart-cost-display">{item.cost}</div>
              <div className="cart-count-display">
                <input
                  className="cart-count-display"
                  type="number"
                  min="1"
                  step="1"
                  value={item.count}
                  onChange={(e) => {
                    changeCount(e, item.id);
                  }}
                />
              </div>
              <div>
                <Button onClick={() => removeFromCart(item.id)}>REMOVE</Button>
              </div>
            </div>
          ))}
        </>
      )}
      {!items.length && <div>Your cart is empty!</div>}
    </div>
  );
}
