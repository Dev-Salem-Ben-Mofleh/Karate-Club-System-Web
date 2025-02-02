import styled from "styled-components";

const InputSearchStyled2 = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  width: 50%;
  @media (max-width: 768px) {
    width: 30%;
  }
`;
export default InputSearchStyled2;
