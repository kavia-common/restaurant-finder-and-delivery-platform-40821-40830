import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

test("loads and displays restaurants", async () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  expect(await screen.findByText(/Blue Harbor Sushi/i)).toBeInTheDocument();
  expect(screen.getByText(/Amber Spice Kitchen/i)).toBeInTheDocument();
});
