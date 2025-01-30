import styled from "styled-components";

const CardSearch = styled.div`
  width: 450px;
  height: 720px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;

  @media (max-width: 1240px) {
    height: 500px;
    overflow: auto;
  }
`;
export default CardSearch;
