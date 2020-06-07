export function loadCart() {
  return new Promise((resolve) => {
    fetch("../tools/mockData.json").then((data) => {
      console.log("data in fetch", data);
    });
  });
}
