import styled from "styled-components";

const ButtonSearch = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  font-size: 1.6rem;
  padding: 1.2rem 2.4rem;
  font-weight: 500;

  color: var(--color-brand-50);
  background-color: var(--color-brand-600);

  &:hover {
    background-color: var(--color-brand-700);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1rem 1rem;
    margin-bottom: 10px;
    width: 30%;
  }
`;

export default ButtonSearch;
