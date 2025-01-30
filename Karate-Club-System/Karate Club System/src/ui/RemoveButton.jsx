import styled from "styled-components";

const RemoveButton = styled.button`
  background-color: #cc0f0f;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  position: relative;
  left: 7%;

  &:hover {
    background-color: #880606;
  }
  @media (max-width: 768px) {
    left: 20%;
  }
`;
export default RemoveButton;
