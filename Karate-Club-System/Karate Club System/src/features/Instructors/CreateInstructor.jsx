import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import { ClearImage, getGender, uploadImages } from "../../utils/helpers";
import { useRef, useState } from "react";
import Heading from "../../ui/Heading";
import { useCreateInstructor } from "./useCreateInstructor";
import InstructorFields from "./InstructorFields";
import { MALE_PICTURE_URL } from "../../utils/constants";

function CreateInstructor({ onCloseModal }) {
  const { isCreating, createInstructor } = useCreateInstructor();

  const [selectedOption, setSelectedOption] = useState("male");
  const [upload, setUpload] = useState(MALE_PICTURE_URL);

  const fileImageRef = useRef();

  const { register, handleSubmit, reset, getValues, formState, setValue } =
    useForm();

  const { errors } = formState;
  const isWorking = isCreating;

  function onSubmit(data) {
    data.gender = getGender(data.gender);
    if (!data.image) data.image = "";
    const {
      qualifiction: qualification,
      name,
      address,
      phone,
      dateOfBirth,
      gender,
      email,
      image: imagePath,
      personID = 0,
      InstructorID = 0,
    } = data;

    createInstructor(
      {
        newInstructor: {
          InstructorID,
          qualification,
          personID,
        },
        newPerson: {
          name,
          address,
          phone,
          dateOfBirth,
          gender,
          email,
          imagePath,
        },
      },
      {
        onSuccess: (data) => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <Heading as="h2">{"Add New Member"}</Heading>
      <InstructorFields
        errors={errors}
        isWorking={isWorking}
        register={register}
        getValues={getValues}
        setValue={setValue}
        uploadImageInstructor={uploadImages}
        upload={upload}
        setUpload={setUpload}
        ClearImage={ClearImage}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        fileImageRef={fileImageRef}
        isEditSession={false}
        onCloseModal={onCloseModal}
      />
    </Form>
  );
}

export default CreateInstructor;
