// This file runs in the browser when the page loads.
import { add } from "./setup";

const message = document.getElementById("message");
if (message) {
  message.textContent = `Setup works! 1 + 1 = ${add(1, 1)}`;
}
