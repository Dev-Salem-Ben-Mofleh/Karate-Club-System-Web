import React from "react";
import styled from "styled-components";

const FileUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;

function FileUpload({
  id,
  register,
  onChange,
  fileImageRef,
  setValue,
  setUpload,
  disabled,
}) {
  return (
    <FileUploadWrapper>
      <UploadButton htmlFor={id}>Upload Image</UploadButton>
      <FileInput
        type="file"
        id={id}
        accept="image/*"
        {...register(id)}
        onChange={(e) =>
          onChange(
            e,
            e.target.files[0],
            e.target.files[0].name,
            setUpload,
            setValue
          )
        }
        ref={fileImageRef}
        disabled={disabled}
      />
    </FileUploadWrapper>
  );
}

export default FileUpload;
