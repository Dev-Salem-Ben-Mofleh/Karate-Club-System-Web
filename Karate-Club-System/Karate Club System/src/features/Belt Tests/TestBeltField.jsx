import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import RadioButton from "../../ui/RadioButton";
import { required } from "../../utils/validationRules";
import FindInstructor from "../Instructors/FindInstructor";
import Button from "../../ui/Button";
import FindMember from "../Members/FindMember";
import styled from "styled-components";

const StyeldPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (max-width: 1240px) {
    grid-template-columns: 1fr;
  }
`;
const AddCancleButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  padding-top: 10px;
`;

function TestBeltField({
  register,
  getValues,
  setValue,
  isWorking,
  sendMemberID,
  defaultStartDate,
  errors,
  setSelectedOption,
  selectedOption,
  navigate,
}) {
  return (
    <>
      <StyeldPage>
        <FindMember
          register={register}
          getValues={getValues}
          setValue={setValue}
          isWorking={isWorking}
          isEditSession={sendMemberID > 0}
          isTest={true}
        />
        <FindInstructor
          register={register}
          getValues={getValues}
          isWorking={isWorking}
          isTest={true}
        />
        <FormRow label="Rank ID">
          <Input
            type="text"
            id="rankID"
            disabled={true}
            {...register("rankID")}
          />
        </FormRow>
        <FormRow label="Belt Rank Name">
          <Input
            type="text"
            id="beltRankName"
            disabled={true}
            {...register("beltRankName", required("Belt Rank Name"))}
          />
        </FormRow>
        <FormRow label="Test Date">
          <Input
            type="date"
            id="testDate"
            disabled={true}
            defaultValue={defaultStartDate}
            {...register("testDate")}
          />
        </FormRow>
        <FormRow label="Fees" error={errors?.fees?.message}>
          <Input
            type="text"
            id="fees"
            disabled={true}
            {...register("fees", required("Test Fees"))}
          />
        </FormRow>
        <FormRow label="Result">
          <RadioButton
            type="radio"
            id="result"
            register={register}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
          />
        </FormRow>
      </StyeldPage>
      <AddCancleButtons>
        <Button
          variation="danger"
          type="reset"
          onClick={() => navigate(-1)}
          disabled={isWorking}
        >
          Return
        </Button>
        <Button disabled={isWorking} variation="add">
          Take next belt test
        </Button>
      </AddCancleButtons>
    </>
  );
}

export default TestBeltField;
