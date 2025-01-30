import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.header`
  background-color: rgb(14, 19, 41);
  padding: 3.2rem 2.4rem;
  border-bottom: 1px soild var(--color-grey-100);

  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 3px solid rgb(14, 19, 41), 19, 41;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  &::-webkit-scrollbar-track {
    background: #e0e0e0;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track:hover {
    background: #d0d0d0;
  }

  @media (max-width: 768px) {
    width: 65%;
  }

  @media (max-width: 769px) and(max-width: 992px) {
    width: 82%;
  }
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
