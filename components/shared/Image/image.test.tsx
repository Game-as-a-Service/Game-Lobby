import React from "react";
import { render, screen } from "@testing-library/react";
import Image from ".";

describe("Image", () => {
  test("should render Image component", () => {
    render(
      <Image
        src="https://images.unsplash.com/photo-1683125695370-1c7fc9ff1315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160"
        alt="Image"
        width={300}
        height={300}
      />
    );
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAccessibleName("Image");
  });
});
