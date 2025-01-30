import styled from "styled-components";

const AddFormStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 769px) and (max-width: 1240px) {
    width: 740px;
    overflow: auto;
  }
`;

export default AddFormStyled;
