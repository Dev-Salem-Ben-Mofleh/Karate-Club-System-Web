import styled from "styled-components";

const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    padding: 10px;
    width: 240px;
    grid-template-columns: 1fr;
    height: 550px;
    overflow: auto;
  }
  @media (min-width: 769px) and (max-width: 1240px) {
    padding: 10px;
    width: 700px;
    overflow: auto;
  }
`;
export default Card;
