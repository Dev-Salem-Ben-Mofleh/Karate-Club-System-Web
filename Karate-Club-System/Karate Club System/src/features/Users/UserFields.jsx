import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import { calculateDateRange } from "../../utils/dateUtils";
import {
  validateConfirmPasswordRule,
  required,
  validateUserNameRule,
} from "../../utils/validationRules";
import Permission from "../../ui/Permission";
import AddFormStyled from "../../ui/AddFormStyled";
import AddCancleButtons from "../../ui/AddCancleButtons";
import PersonFields from "../Persons/PersonFields";
import PersonImage from "../Persons/PersonImage";
import { CheckUsername } from "../../services/apiUsers";
import { useRef, useState } from "react";

function UserFields({
  errors,
  isWorking,
  register,
  getValues,
  setValue,
  uploadImageUser,
  upload,
  setUpload,
  ClearImage,
  selectedOption,
  setSelectedOption,
  fileImageRef,
  isEditSession,
  onCloseModal,
}) {
  const [isFetch, setIsFetch] = useState(false);
  const { minDate, maxDate } = calculateDateRange(30, 15);
  const isSameRef = useRef();

  return (
    <>
      <AddFormStyled>
        <div>
          <PersonFields
            typeName={"User"}
            errors={errors}
            register={register}
            setValue={setValue}
            isWorking={isWorking}
            uploadImage={uploadImageUser}
            upload={upload}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            setUpload={setUpload}
            isEditSession={isEditSession}
            minDate={minDate}
            maxDate={maxDate}
          />
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
        </div>
        <div>
          <FormRow label="UserName" error={errors?.userName?.message}>
            <Input
              type="text"
              id="userName"
              disabled={isEditSession ? isEditSession : isWorking}
              {...register("userName", validateUserNameRule(isSameRef.current))}
              onChange={(e) => handleFetch(e.target.value)}
              placeholder="Sal123"
            />
          </FormRow>

          <FormRow label="Password" error={errors?.password?.message}>
            <Input
              type="password"
              id="password"
              disabled={isWorking}
              {...register("password", required("Password"))}
              placeholder="1as32"
            />
          </FormRow>

          <FormRow
            label="Confirm Password"
            error={errors?.confirmPassword?.message}
          >
            <Input
              type="password"
              id="confirmPassword"
              disabled={isWorking}
              {...register(
                "confirmPassword",
                validateConfirmPasswordRule(getValues)
              )}
              placeholder="1as32"
            />
          </FormRow>

          <PersonImage
            register={register}
            getValues={getValues}
            setValue={setValue}
            uploadImage={uploadImageUser}
            fileImageRef={fileImageRef}
            setUpload={setUpload}
            upload={upload}
            ClearImage={ClearImage}
            isWorking={isWorking}
          />
        </div>
        <div>
          <Permission register={register} getValues={getValues} />
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
        <Button disabled={isWorking || isFetch} variation="add">
          {isEditSession ? "Update user" : "Add user"}
        </Button>
      </AddCancleButtons>
    </>
  );
  async function handleFetch(userName) {
    setIsFetch((value) => (value = true));
    isSameRef.current = await CheckUsername(userName);
    setIsFetch((value) => (value = false));
  }
}

export default UserFields;
