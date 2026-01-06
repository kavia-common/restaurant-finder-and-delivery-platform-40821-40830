import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

test("loads and displays restaurants", async () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  // Existing baseline restaurants should still render.
  expect(await screen.findByText(/Blue Harbor Sushi/i)).toBeInTheDocument();
  expect(screen.getByText(/Amber Spice Kitchen/i)).toBeInTheDocument();

  // Added high-demand cuisines should also render.
  expect(screen.getByText(/Trattoria Sol Mare/i)).toBeInTheDocument();
  expect(screen.getByText(/Red Lantern Wok/i)).toBeInTheDocument();
});
