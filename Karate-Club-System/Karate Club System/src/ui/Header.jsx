import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/Authentication/UserAvatar";
import Clock from "./Clock";

const StyledHeader = styled.header`
  background-color: #f77c18;
  padding: 1.2rem 4.8rem;
  border-bottom: 1px soild var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 768px) {
    position: relative;
    left: -37%;
    gap: 2rem;
  }

  @media (max-width: 769px) and(max-width: 992px) {
    position: relative;
    left: -7%;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Clock />
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
