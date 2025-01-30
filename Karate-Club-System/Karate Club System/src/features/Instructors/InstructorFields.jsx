import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { calculateDateRange } from "../../utils/dateUtils";
import { validateTextRule } from "../../utils/validationRules";
import AddFormStyled from "../../ui/AddFormStyled";
import AddCancleButtons from "../../ui/AddCancleButtons";
import PersonFields from "../Persons/PersonFields";
import PersonImage from "../Persons/PersonImage";

function InstructorFields({
  errors,
  isWorking,
  register,
  getValues,
  setValue,
  uploadImageInstructor,
  upload,
  setUpload,
  ClearImage,
  selectedOption,
  setSelectedOption,
  fileImageRef,
  isEditSession,
  onCloseModal,
}) {
  const { minDate, maxDate } = calculateDateRange(40, 20);

  return (
    <>
      <AddFormStyled>
        <div>
          <PersonFields
            typeName={"Instructor"}
            errors={errors}
            register={register}
            setValue={setValue}
            isWorking={isWorking}
            uploadImage={uploadImageInstructor}
            upload={upload}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            setUpload={setUpload}
            isEditSession={isEditSession}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
        <div>
          <FormRow label="Qualifiction" error={errors?.qualifiction?.message}>
            <Input
              type="text"
              id="qualifiction"
              disabled={isWorking}
              {...register("qualifiction", validateTextRule("Qualifiction"))}
              placeholder="Certificate"
            />
          </FormRow>

          <PersonImage
            register={register}
            getValues={getValues}
            setValue={setValue}
            uploadImage={uploadImageInstructor}
            fileImageRef={fileImageRef}
            setUpload={setUpload}
            upload={upload}
            ClearImage={ClearImage}
            isWorking={isWorking}
          />
        </div>
      </AddFormStyled>

      <AddCancleButtons>
        <Button
          variation="danger"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isWorking}
        >
          Cancel
        </Button>
        <Button disabled={isWorking} variation="add">
          {isEditSession ? "Update instructor" : "Add instructor"}
        </Button>
      </AddCancleButtons>
    </>
  );
}

export default InstructorFields;
