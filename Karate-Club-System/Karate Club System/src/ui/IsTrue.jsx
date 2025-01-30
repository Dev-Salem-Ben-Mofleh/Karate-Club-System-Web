import styled, { css } from "styled-components";

const IsTrue = styled.div`
  font-size: 14px;
  font-weight: 600;
  ${(props) =>
    props.as === "true" &&
    css`
      color: green;
    `}
  ${(props) =>
    props.as === "false" &&
    css`
      color: red;
    `}
      @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export default IsTrue;
