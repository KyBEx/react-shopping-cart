export function loadCart() {
  return new Promise((resolve) => {
    fetch("../mockData")
      .then((data) => {
        console.log(data);
      })
      .then((data) => console.log("data", data))
      .catch((err) => console.log("err", err));
  });
}
