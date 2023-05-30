import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a Home heading.", () => {
    render(<Home />);

    //screen.debug();
    const head = screen.getByRole("heading", {
      name: /Home/i,
    });

    expect(head).toBeInTheDocument();
  });
});