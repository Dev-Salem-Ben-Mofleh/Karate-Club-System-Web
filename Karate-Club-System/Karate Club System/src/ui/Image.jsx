import { styled, css } from "styled-components";

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  @media (max-width: 992px) {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }
`;
export default Image;
