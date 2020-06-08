import React, { useEffect, useState } from "react";

export default function Cart() {
  const [items, setItems] = useState({});
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
  return <></>;
}
