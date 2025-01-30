import FormRow from "../../ui/FormRow";
import Image from "../../ui/Image";
import FileUpload from "../../ui/FileInput";
import RemoveButton from "../../ui/RemoveButton";
import UploadRemoveButtons from "../../ui/UploadRemoveButtons";

function PersonImage({
  register,
  getValues,
  setValue,
  uploadImage,
  fileImageRef,
  setUpload,
  upload,
  ClearImage,
  isWorking,
}) {
  return (
    <div>
      <FormRow lable="photo">
        <Image id="photo" src={upload} alt="Member Image" />
      </FormRow>
      <UploadRemoveButtons>
        <FormRow lable="Upload Image">
          <FileUpload
            id="image"
            register={register}
            onChange={uploadImage}
            fileImageRef={fileImageRef}
            setValue={setValue}
            setUpload={setUpload}
            disabled={isWorking}
          />
        </FormRow>
        <RemoveButton
          variation="danger"
          disabled={isWorking}
          onClick={(e) =>
            ClearImage(e, getValues().gender, fileImageRef, setUpload, setValue)
          }
        >
          Remove Image
        </RemoveButton>
      </UploadRemoveButtons>
    </div>
  );
}

export default PersonImage;
