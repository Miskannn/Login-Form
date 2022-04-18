import {render, screen} from "@testing-library/react";


import Dashboard from "../pages";

const env = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...env };
})

afterEach(() => {
  process.env = env;
})

it("Render home page", () => {
  render(<Dashboard />)
  expect(screen.getAllByRole('heading', {name: "Welcome!"})).toBeInTheDocument();
})
