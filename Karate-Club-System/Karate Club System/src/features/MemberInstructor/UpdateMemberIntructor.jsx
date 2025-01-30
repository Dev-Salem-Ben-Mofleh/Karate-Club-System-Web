import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Heading from "../../ui/Heading";
import { useUpdateMemebreIstructor } from "./useUpdateMemberInstructor";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MemberInstructorFields from "./MemberInstructorFields";

function UpdateMemberIntructor() {
  const { id: sendMemberInstructorID } = useParams();
  const location = useLocation();
  let memberInstructorToEdit = location.state;

  const { isUpdating, updateMemberInstructor } = useUpdateMemebreIstructor();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, getValues, setValue } = useForm();

  useEffect(() => {
    uploadMemberInstructorDataforUpdate();
  }, []);
  const isWorking = isUpdating;

  function onSubmit(data) {
    const {
      instructorID,
      memberID,
      memberInstructorID = memberInstructorToEdit.memberInstructorID,
      assignDate = memberInstructorToEdit.assignDate,
    } = data;

    updateMemberInstructor(
      {
        updateMemberInstructor: {
          memberInstructorID,
          instructorID,
          memberID,
          assignDate,
        },
      },
      {
        onSuccess: (data) => {
          reset();
          navigate(-1);
        },
      }
    );
  }

  function onError(errors) {
    if (typeof errors.memberID !== "undefined")
      toast.error(errors.memberID.message);
    if (typeof errors.instructorID !== "undefined")
      toast.error(errors.instructorID.message);
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Heading as="h2">
        {`Update Member_Instructor With ID= ${sendMemberInstructorID}`}
      </Heading>
      <MemberInstructorFields
        isEditSession={true}
        updateAssignDate={memberInstructorToEdit.assignDate}
        register={register}
        getValues={getValues}
        isWorking={isWorking}
        navigate={navigate}
      />
    </Form>
  );

  function uploadMemberInstructorDataforUpdate() {
    const { instructorID, memberID } = memberInstructorToEdit;
    setValue("memberID", memberID);
    setValue("instructorID", instructorID);
  }
}

export default UpdateMemberIntructor;
