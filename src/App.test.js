import { render, screen } from "@testing-library/react";
import App from "./App";

test("verifica se o link 'learn react' está presente", () => {
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
