import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignupPage from ".";
import React from "react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "User registered successfully" }),
  })
);

describe("SignupPage", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders the signup form", () => {
    render(<SignupPage />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("allows the user to fill out the form and submit", () => {
    render(<SignupPage />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser", name: "username" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "testpass", name: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3005/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "testuser", password: "testpass" }),
    });
  });

  test("handles server response correctly", async () => {
    render(<SignupPage />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser", name: "username" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "testpass", name: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    const response = await fetch.mock.results[0].value;
    const data = await response.json();

    expect(data).toEqual({ message: "User registered successfully" });
  });
});
