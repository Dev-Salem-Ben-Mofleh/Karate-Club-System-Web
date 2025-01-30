import styled from "styled-components";

const Field = styled.div`
  display: grid;
  grid-template-columns: 130px 50px 1fr;
  gap: 5px;
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;

  @media (max-width: 768px) {
    padding: 10px;
    width: 240px;
    grid-template-columns: 130px 50px;
  }

  @media (min-width: 769px) and (max-width: 1240px) {
    padding: 0px;
    width: 440px;
  }
`;
export default Field;
