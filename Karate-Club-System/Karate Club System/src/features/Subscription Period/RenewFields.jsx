import { validateFeesRule, validateRule } from "../../utils/validationRules";
import ShowPeriodDetails from "./ShowPeriodDetails";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import styled from "styled-components";

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
`;

function RenewFields({
  register,
  getValues,
  errors,
  handleFetch,
  memberDetials,
  periofDetials,
  isSearch,
  isWorking,
  isMemberActive,
  hasActivePeriod,
  isNotPaid,
  navigate,
}) {
  return (
    <>
      <StyeldPage>
        <div>
          <InputSearchStyled2
            id="periodID"
            disabled={isWorking}
            {...register(
              "periodID",
              validateRule({
                isMemberActive,
                hasActivePeriod,
                isNotPaid,
                context: "validateRenewPeriodRule",
              })
            )}
            placeholder="periodID"
          />
          <Button
            onClick={(e) => handleFetch(e, getValues("periodID"))}
            size={"large"}
            disabled={isWorking}
          >
            Search
          </Button>
          {isSearch ? (
            <Spinner />
          ) : (
            <ShowPeriodDetails
              memberDetails={memberDetials || null}
              periodDetails={periofDetials || null}
              isShowCancle={false}
            />
          )}
        </div>
        <div>
          <FormRow label="Fees" error={errors?.fees?.message}>
            <Input
              type="text"
              id="fees"
              disabled={isWorking}
              {...register("fees", validateFeesRule(getValues("fees")))}
              placeholder="$100"
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
        <Button disabled={isWorking || isSearch} variation="add">
          {"renew subscription_period"}
        </Button>
      </AddCancleButtons>
    </>
  );
}

export default RenewFields;
