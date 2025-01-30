import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import {
  ClearImage,
  formatDate2,
  getGender,
  handleIamge,
  uploadImages,
} from "../../utils/helpers";
import { useEffect, useRef, useState } from "react";
import Heading from "../../ui/Heading";
import { useUpdateInstructor } from "./useUpdateInstructor";
import InstructorFields from "./InstructorFields";
import { FAMEL_PICTURE_URL, MALE_PICTURE_URL } from "../../utils/constants";

function UpdateInstructor({ instructorToEdit = {}, onCloseModal }) {
  const { isUpdating, updateInstructor } = useUpdateInstructor();

  const [selectedOption, setSelectedOption] = useState("male");
  const [upload, setUpload] = useState(null);

  const fileImageRef = useRef();
  const oldImageRef = useRef();

  const { register, handleSubmit, reset, getValues, formState, setValue } =
    useForm();

  useEffect(() => {
    uploadInstructorDataforUpdate();
  }, []);

  const { errors } = formState;
  const isWorking = isUpdating;

  function onSubmit(data) {
    data.gender = getGender(data.gender);
    if (!data.image) data.image = "";
    const oldImageUrl = oldImageRef.current;
    const {
      qualifiction: qualification,
      name,
      address,
      phone,
      dateOfBirth,
      gender,
      email,
      image: imagePath,
      personID = instructorToEdit.personID,
      InstructorID = instructorToEdit.instructorID,
    } = data;

    updateInstructor(
      {
        updateInstructor: {
          InstructorID,
          personID,
          qualification,
        },
        InstructorID,
        oldImageUrl,
        updatePerson: {
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
      <Heading as="h2">{`Update Member With ID= ${instructorToEdit.instructorID}`}</Heading>
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
        isEditSession={true}
        onCloseModal={onCloseModal}
      />
    </Form>
  );

  function uploadInstructorDataforUpdate() {
    const {
      qualification,
      name,
      address,
      phone,
      dateOfBirth,
      gender,
      email,
      image,
    } = instructorToEdit;

    oldImageRef.current = image ? image : "no_image";
    console.log(dateOfBirth);
    setValue("qualifiction", qualification);
    setValue("name", name);
    setValue("address", address);
    setValue("phone", phone);
    setValue("dateOfBirth", formatDate2(dateOfBirth));
    setValue("gender", gender === 1 ? "male" : "female");
    setSelectedOption((value) => (value = gender === 1 ? "male" : "female"));
    setValue("email", email);

    const ImagePath = handleIamge(image, gender);

    ImagePath === MALE_PICTURE_URL || ImagePath === FAMEL_PICTURE_URL
      ? setValue("image", "")
      : setValue("image", ImagePath);

    setUpload((value) => (value = ImagePath));
  }
}
export default UpdateInstructor;
