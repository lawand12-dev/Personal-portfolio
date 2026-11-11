import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";
import ActionLink from "./ActionLink";

describe("ActionLink component", () => {
  it("renders with secondary variant as default", () => {
    render(
      <BrowserRouter>
        <ActionLink to="/about">About Me</ActionLink>
      </BrowserRouter>,
    );

    const link = screen.getByRole("link", { name: /about me/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/about");
    expect(link).toHaveClass("portfolio-action--secondary");
  });

  it("renders with primary variant when specified", () => {
    render(
      <BrowserRouter>
        <ActionLink to="/work" variant="primary">
          View Projects
        </ActionLink>
      </BrowserRouter>,
    );

    const link = screen.getByRole("link", { name: /view projects/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/work");
    expect(link).toHaveClass("portfolio-action--primary");
  });
});
