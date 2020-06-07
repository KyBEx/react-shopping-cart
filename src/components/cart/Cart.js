import React from "react";
import { loadCart } from "./api";

export default function Cart() {
  loadCart();
  return <div></div>;
}
