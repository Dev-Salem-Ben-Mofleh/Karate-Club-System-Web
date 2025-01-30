import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import {
  validateFeesRule,
  validateTextRule,
} from "../../utils/validationRules";
import AddFormStyled from "../../ui/AddFormStyled";
import AddCancleButtons from "../../ui/AddCancleButtons";

function BeltRankFeilds({
  errors,
  isWorking,
  register,
  getValues,
  onCloseModal,
}) {
  return (
    <>
      <AddFormStyled>
        <div>
          <FormRow label=" Rank name" error={errors?.rankName?.message}>
            <Input
              type="text"
              id="rankName"
              disabled={isWorking}
              {...register("rankName", validateTextRule("Rank Name"))}
              placeholder="White Belt"
            />
          </FormRow>

          <FormRow label="Test Fees" error={errors?.testFees?.message}>
            <Input
              type="text"
              id="testFees"
              disabled={isWorking}
              {...register("testFees", validateFeesRule(getValues("testFees")))}
              placeholder="100"
            />
          </FormRow>
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
          {"Update Belt_Rank"}
        </Button>
      </AddCancleButtons>
    </>
  );
}

export default BeltRankFeilds;
