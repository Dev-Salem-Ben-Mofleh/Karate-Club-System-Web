import styled from "styled-components";
import { FAMEL_PICTURE_URL, MALE_PICTURE_URL } from "../utils/constants";

const RadioButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const CustomRadio = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #007bff;
  background-color: white;
  margin-right: 10px;
  position: relative;
  cursor: pointer;

  &:checked {
    background-color: #007bff;
    border-color: #007bff;
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: white;
  }

  &:hover {
    border-color: #0056b3;
  }
`;

function RadioButton({
  options,
  id,
  register,
  onGenderChange,
  imageFile,
  setSelectedOption,
  selectedOption,
  disabled,
  setValue,
  setUpload,
}) {
  function handleChange(value) {
    setSelectedOption((gender) => (gender = value));
    if (
      imageFile === MALE_PICTURE_URL ||
      imageFile === FAMEL_PICTURE_URL ||
      imageFile === ""
    )
      onGenderChange(null, "", value, setUpload, setValue);
  }

  return (
    <RadioButtonContainer>
      {options.map((option) => (
        <RadioLabel>
          <CustomRadio
            key={option.value}
            type="radio"
            name="gender"
            value={option.value}
            {...register(id)}
            checked={selectedOption === option.value}
            onClick={(e) => handleChange(e.target.value)}
            disabled={disabled}
          />
          {option.label}
        </RadioLabel>
      ))}
    </RadioButtonContainer>
  );
}
export default RadioButton;
