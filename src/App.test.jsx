import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./components/Home";

// intercept the useAuth0 function and mock it
jest.mock("@auth0/auth0-react");
describe("<Home/>", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  });
  it("renders learn react link", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const linkElement = screen.getByText("UNQui-Meter");
    expect(linkElement).toBeInTheDocument();
  });
});
