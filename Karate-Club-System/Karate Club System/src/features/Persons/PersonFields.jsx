import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import RadioButton from "../../ui/RadioButton";
import { formatMinDate } from "../../utils/helpers";
import {
  validateAddressRule,
  validateBirthdateRule,
  validateEmailRule,
  validatePhoneRule,
  validateTextRule,
} from "../../utils/validationRules";

function PersonFields({
  typeName,
  errors,
  register,
  setValue,
  isWorking,
  uploadImage,
  upload,
  selectedOption,
  setSelectedOption,
  setUpload,
  isEditSession,
  minDate,
  maxDate,
}) {
  const defaultDate = formatMinDate(new Date());
  return (
    <div>
      <FormRow label={`${typeName} name`} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", validateTextRule(`${typeName} Name`))}
          placeholder="Salem Berek"
        />
      </FormRow>

      <FormRow label="Gender" error={errors?.gender?.message}>
        <RadioButton
          type="radio"
          id="gender"
          register={register}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
          onGenderChange={uploadImage}
          imageFile={upload}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setValue={setValue}
          setUpload={setUpload}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          disabled={isWorking}
          {...register("email", validateEmailRule())}
          placeholder="test@gmail.com"
        />
      </FormRow>

      <FormRow label="Date of Birth" error={errors?.dateOfBirth?.message}>
        <Input
          type="date"
          id="dateOfBirth"
          disabled={isWorking}
          defaultValue={defaultDate}
          {...register(
            "dateOfBirth",
            !isEditSession
              ? validateBirthdateRule(minDate, maxDate)
              : validateBirthdateRule(0, 0)
          )}
        />
      </FormRow>

      <FormRow label="Address" error={errors?.address?.message}>
        <Input
          type="text"
          id="address"
          disabled={isWorking}
          {...register("address", validateAddressRule())}
          placeholder="Hadrmout"
        />
      </FormRow>
      <FormRow label="Phone" error={errors?.phone?.message}>
        <Input
          type="text"
          id="phone"
          disabled={isWorking}
          {...register("phone", validatePhoneRule("Phone"))}
          placeholder="774279865"
        />
      </FormRow>
    </div>
  );
}

export default PersonFields;
