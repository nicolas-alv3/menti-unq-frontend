import { render, screen } from '@testing-library/react';
import App from './App';
import {MemoryRouter} from "react-router";
import Home from "./components/Home";
import {
  useAuth0
} from "@auth0/auth0-react";

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234"
};

// intercept the useAuth0 function and mock it
jest.mock("@auth0/auth0-react");
describe('<Home/>', () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true
    })
  })
  it('renders learn react link', () => {
    render(<MemoryRouter><Home/></MemoryRouter>);
    const linkElement = screen.getByText("UNQui-Meter");
    expect(linkElement).toBeInTheDocument();
  })

})
;
