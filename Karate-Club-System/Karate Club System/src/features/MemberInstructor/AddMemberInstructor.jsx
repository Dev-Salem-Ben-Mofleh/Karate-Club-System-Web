import StyledNavLinke from "../../ui/StyledNavLinke";

function AddMemberInstructor() {
  return (
    <StyledNavLinke to={`/add-member-instructor/${0}`}>
      <span>Add new member_Instructor</span>
    </StyledNavLinke>
  );
}

export default AddMemberInstructor;
