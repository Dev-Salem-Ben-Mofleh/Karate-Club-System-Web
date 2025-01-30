import styled, { css } from "styled-components";

const RowTableOperations = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      @media (max-width: 768px) {
        flex-direction: column;
      }
    `}
`;

RowTableOperations.defaultProps = {
  type: "horizontal",
};
export default RowTableOperations;
