import styled from "styled-components";
import Button from "../../ui/Button";
import ShowMemberDetails from "../Members/ShowMemberDetails";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import RadioButton from "../../ui/RadioButton";
import {
  validateFeesRule,
  validateRule,
  validDateRule,
} from "../../utils/validationRules";
import ButtonSearch from "../../ui/ButtonSearch";

const StyeldPage = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: flex-start;
  gap: 15px;
`;
const AddCancleButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  padding-top: 10px;
`;
const InputSearchStyled2 = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  margin: 15px 10px 20px;
  width: 25%;
  @media (max-width: 768px) {
    margin: 0px 5px;
    width: 50%;
  }
`;

function PeriodFields({
  register,
  errors,
  getValues,
  handleFetch,
  memberDetials,
  payment,
  defaultStartDate,
  defaultEndDate,
  setSelectedOption,
  selectedOption,
  isEditSession,
  isWorking,
  isSearch,
  isMemberActive,
  hasActivePeriod,
  isNotPaid,
  startDate,
  navigate,
}) {
  return (
    <>
      <StyeldPage>
        <div>
          <InputSearchStyled2
            id="memberID"
            disabled={isEditSession ? isEditSession : isWorking}
            {...register(
              "memberID",
              !isEditSession
                ? validateRule({
                    isMemberActive,
                    hasActivePeriod,
                    isNotPaid,
                    context: "validatePeriodRule",
                  })
                : validateRule({
                    isMemberActive: true,
                    hasActivePeriod: false,
                    isNotPaid: false,
                    context: "validatePeriodRule",
                  })
            )}
            placeholder="MemberID"
          />
          <ButtonSearch
            onClick={(e) => handleFetch(e, getValues("memberID"))}
            size={"large"}
            disabled={isEditSession ? isEditSession : isWorking}
          >
            Search
          </ButtonSearch>
          <ShowMemberDetails
            memberDetails={memberDetials || null}
            isShowCancle={false}
          />
        </div>
        <div>
          <FormRow label="Payment ID">
            <Input
              type="text"
              id="paymentID"
              disabled={true}
              {...register("paymentID")}
              placeholder="ID"
            />
          </FormRow>
          <FormRow label="Start Date">
            <Input
              type="date"
              id="startDate"
              disabled={true}
              defaultValue={defaultStartDate}
              {...register("startDate")}
            />
          </FormRow>
          <FormRow label="End Date" error={errors?.endDate?.message}>
            <Input
              type="date"
              id="endDate"
              disabled={isWorking}
              defaultValue={defaultEndDate}
              {...register(
                "endDate",
                validDateRule(isEditSession ? startDate : defaultStartDate)
              )}
            />
          </FormRow>
          <FormRow label="Fees" error={errors?.fees?.message}>
            <Input
              type="text"
              id="fees"
              disabled={isEditSession ? getValues("paid") === "yes" : isWorking}
              {...register("fees", validateFeesRule(getValues("fees")))}
              placeholder="$100"
            />
          </FormRow>
          <FormRow label="Is Paid">
            <RadioButton
              type="radio"
              id="paid"
              register={register}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              setSelectedOption={setSelectedOption}
              selectedOption={
                isEditSession ? getValues("paid") : selectedOption
              }
              disabled={isEditSession ? Number(payment) !== 0 : false}
            />
          </FormRow>
        </div>
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
        <Button disabled={isSearch || isWorking} variation="add">
          {isEditSession
            ? "Update subscription_period"
            : "Add subscription_period"}
        </Button>
      </AddCancleButtons>
    </>
  );
}

export default PeriodFields;
