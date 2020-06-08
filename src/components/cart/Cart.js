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
  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="cart-item-display">
          <div className="cart-image-display">
            <img src={item.image} />
          </div>
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
            <Button>REMOVE</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
