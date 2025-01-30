import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLinke = styled(NavLink)`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  color: var(--color-brand-50);
  background-color: var(--color-brand-600);

  &:hover {
    background-color: var(--color-brand-700);
  }
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1rem 1rem;
    margin-bottom: 20px;
  }
`;

export default StyledNavLinke;
