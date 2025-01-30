import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import Pagination2 from "../../ui/Pagination2";
import Button from "../../ui/Button";
import ButtonCancle from "../../ui/ButtonCancle";
import { useMemberTrainedByInstructor } from "./useMemberTrainedByInstructor";
import MembersRowforTrained from "./MembersRowforTrained";

function ShowAllMembersTrainedByInstructor({ InstructorID, onCloseModal }) {
  const { isLoading, members, count } =
    useMemberTrainedByInstructor(InstructorID);

  if (isLoading) return <Spinner />;
  if (!members.length) return <Empty resourceName="members" />;

  return (
    <Menus>
      <Heading as="h2">
        Members trained by instructor with ID= {InstructorID}
      </Heading>
      <Table columns="80px 150px 180px 60px 110px 100px 70px ;">
        <Table.Header>
          <div>Member ID</div>
          <div>Name</div>
          <div>Rank Name</div>
          <div>Gender</div>
          <div>Date of Birth</div>
          <div>Phone</div>
          <div>is Active</div>
        </Table.Header>
        <Table.Body
          data={members}
          render={(member) => (
            <MembersRowforTrained member={member} key={member.memberID} />
          )}
        />
        <Table.Footer>
          <Pagination2 count={count} />
        </Table.Footer>
      </Table>
      <ButtonCancle>
        <Button
          variation="danger"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Close
        </Button>
      </ButtonCancle>
    </Menus>
  );
}

export default ShowAllMembersTrainedByInstructor;
