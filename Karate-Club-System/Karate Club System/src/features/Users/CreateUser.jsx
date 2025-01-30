import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import {
  calculatePermissionst,
  ClearImage,
  getActive,
  getGender,
  uploadImages,
} from "../../utils/helpers";
import { useRef, useState } from "react";
import Heading from "../../ui/Heading";
import { useCreateUser } from "./useCreateUser";
import UserFields from "./UserFields";
import { MALE_PICTURE_URL } from "../../utils/constants";

function CreateUser({ onCloseModal }) {
  const { isCreating, createUser } = useCreateUser();

  const [selectedOption, setSelectedOption] = useState("male");

  const fileImageRef = useRef();

  const [upload, setUpload] = useState(MALE_PICTURE_URL);

  const { register, handleSubmit, reset, getValues, formState, setValue } =
    useForm();

  const { errors } = formState;
  const isWorking = isCreating;

  function onSubmit(data) {
    data.gender = getGender(data.gender);
    data.isActive = getActive(data.isActive);
    const Permission = calculatePermissionst(0, getValues);
    if (!data.image) data.image = "";

    const {
      userName: UserName,
      password: Password,
      isActive: IsActive,
      name,
      address,
      phone,
      dateOfBirth,
      gender,
      email,
      image: imagePath,
      personID = 0,
      UserID = 0,
    } = data;

    createUser(
      {
        newUser: {
          UserID,
          personID,
          UserName,
          Password,
          Permission,
          IsActive,
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
      <Heading as="h2">{"Add New User"}</Heading>
      <UserFields
        errors={errors}
        isWorking={isWorking}
        register={register}
        getValues={getValues}
        setValue={setValue}
        uploadImageUser={uploadImages}
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

export default CreateUser;
