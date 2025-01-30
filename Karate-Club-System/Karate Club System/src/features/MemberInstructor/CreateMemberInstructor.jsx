import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import Heading from "../../ui/Heading";
import { useCreateMemebreIstructor } from "./useCreateMemberInstructor";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MemberInstructorFields from "./MemberInstructorFields";

function CreateMemberInstructor() {
  const { isCreating, createMemberInstructor } = useCreateMemebreIstructor();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, getValues } = useForm();

  const isWorking = isCreating;

  function onSubmit(data) {
    const {
      instructorID,
      memberID,
      memberInstructorID = 0,
      assignDate = new Date(),
    } = data;

    createMemberInstructor(
      {
        newMemberInstructor: {
          memberInstructorID,
          memberID,
          instructorID,
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
      <Heading as="h2">{"Add New Member_Instructor"}</Heading>
      <MemberInstructorFields
        isEditSession={false}
        updateAssignDate={"No Date"}
        register={register}
        getValues={getValues}
        isWorking={isWorking}
        navigate={navigate}
      />
    </Form>
  );
}

export default CreateMemberInstructor;
