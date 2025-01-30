import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import SelectOption from "../../ui/SelectOption";
import Checkbox from "../../ui/Checkbox";
import { calculateDateRange } from "../../utils/dateUtils";
import { validatePhoneRule } from "../../utils/validationRules";
import AddFormStyled from "../../ui/AddFormStyled";
import AddCancleButtons from "../../ui/AddCancleButtons";
import PersonFields from "../Persons/PersonFields";
import PersonImage from "../Persons/PersonImage";

function MemberFields({
  errors,
  isWorking,
  register,
  getValues,
  setValue,
  uploadImageMamber,
  upload,
  setUpload,
  ClearImage,
  selectedOption,
  setSelectedOption,
  beltRanks,
  fileImageRef,
  isEditSession,
  onCloseModal,
}) {
  const { minDate, maxDate } = calculateDateRange(26, 18);
  return (
    <>
      <AddFormStyled>
        <div>
          <PersonFields
            typeName={"Member"}
            errors={errors}
            register={register}
            setValue={setValue}
            isWorking={isWorking}
            uploadImage={uploadImageMamber}
            upload={upload}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            setUpload={setUpload}
            isEditSession={isEditSession}
            minDate={minDate}
            maxDate={maxDate}
          />
          <FormRow label="Last Belt Rank" error={errors?.lastBeltRank?.message}>
            <SelectOption
              id="lastBeltRank"
              disabled={isWorking}
              register={register}
              options={beltRanks.map((beltRank) => ({
                value: beltRank.rankName.replace(" ", "-").toLowerCase(),
                label: beltRank.rankName,
              }))}
              type="white"
            />
          </FormRow>
        </div>
        <div>
          <FormRow
            label="Emeragency contact"
            error={errors?.emeragencyContact?.message}
          >
            <Input
              type="text"
              id="emeragencyContact"
              disabled={isWorking}
              {...register(
                "emeragencyContact",
                validatePhoneRule("Emeragency contact")
              )}
              placeholder="774279865"
            />
          </FormRow>

          <FormRow label="Is Active" error={errors?.isActive?.message}>
            <Checkbox
              id="isActive"
              disabled={isWorking}
              register={register}
              options={[
                {
                  value: "is-active",
                  lable: "is Active",
                },
              ]}
            />
          </FormRow>

          <PersonImage
            register={register}
            getValues={getValues}
            setValue={setValue}
            uploadImage={uploadImageMamber}
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
          {isEditSession ? "Update member" : "Add member"}
        </Button>
      </AddCancleButtons>
    </>
  );
}

export default MemberFields;
