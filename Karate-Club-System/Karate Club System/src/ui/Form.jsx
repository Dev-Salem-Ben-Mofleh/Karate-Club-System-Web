import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
      @media (max-width: 768px) {
        height: 550px;
        padding: 10px;
        overflow: auto;
      }
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      max-width: 100%;
      @media (max-width: 768px) {
        height: 550px;
        padding: 10px;
        overflow: auto;
      }
    `}

  ${(props) =>
    props.type === "login" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
      max-width: 100%;
      @media (max-width: 768px) {
        height: 285px;
        padding: 10px;
        overflow: auto;
        width: 80%;
        position: relative;
        left: 12%;
      }
    `}

  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
