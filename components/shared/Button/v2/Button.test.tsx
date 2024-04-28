import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";

describe("ButtonV2", () => {
  it("should renders button text", () => {
    render(<Button>Button</Button>);

    const button = screen.getByRole("button", {
      name: /Button/i,
    });

    expect(button).toBeInTheDocument();
  });

  it("should have correct className", () => {
    render(
      <Button variant="danger" className="test">
        Button
      </Button>
    );

    const button = screen.getByRole("button", {
      name: /Button/i,
    });

    expect(button).toHaveClass("test");
    expect(button).not.toHaveClass("pointer-events-none");
  });
});
