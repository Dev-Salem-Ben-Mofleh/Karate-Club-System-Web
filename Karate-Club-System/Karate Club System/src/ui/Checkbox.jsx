import { useState } from "react";
import styled from "styled-components";

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type="checkbox"] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  & input[type="checkbox"]:disabled {
    accent-color: var(--color-brand-600);
  }

  & label {
    flex: 1;

    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

function Checkbox({ options, id, register, disabled }) {
  const [selectedchecked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked((check) => (check === false ? true : false));
  };
  return (
    <StyledCheckbox>
      {options.map((option) => (
        <>
          <input
            id={id}
            key={option.value}
            type="checkbox"
            value={selectedchecked}
            onClick={handleChange}
            {...register(id)}
            disabled={disabled}
          />
          <label htmlFor={option.value}>{option.lable}</label>
        </>
      ))}
    </StyledCheckbox>
  );
}

export default Checkbox;
