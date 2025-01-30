import FindInstructor from "../Instructors/FindInstructor";
import Field from "../../ui/Field";
import Icon from "../../ui/Icon";
import ImageIcone from "../../ui/ImageIcone";
import { formatDate } from "../../utils/helpers";
import Text from "../../ui/Text";
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

function MemberInstructorFields({
  isEditSession,
  updateAssignDate,
  register,
  getValues,
  isWorking,
  navigate,
}) {
  return (
    <>
      <Field>
        <Text>Assign Date: </Text>
        <Icon>{<ImageIcone src="/Calendar 32.png" />}</Icon>
        <Text>
          {!isEditSession
            ? formatDate(new Date())
            : formatDate(updateAssignDate)}
        </Text>
      </Field>
      <StyeldPage>
        <FindMember
          register={register}
          getValues={getValues}
          isWorking={isWorking}
          isEditSession={isEditSession}
        />
        <FindInstructor
          register={register}
          getValues={getValues}
          isWorking={isWorking}
          isEditSession={isEditSession}
        />
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
          {isEditSession ? "Update member_instructor" : "Add member_instructor"}
        </Button>
      </AddCancleButtons>
    </>
  );
}

export default MemberInstructorFields;
