import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders navbar brand", () => {
  render(<App />);
  expect(screen.getByText("OceanEats")).toBeInTheDocument();
});

test("renders home headline", () => {
  render(<App />);
  expect(screen.getByText(/Find food that arrives fast/i)).toBeInTheDocument();
});
