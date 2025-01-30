import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import {
  calculatePermissionst,
  ClearImage,
  formatDate2,
  getActive,
  getGender,
  handleIamge,
  readPermissionsToSet,
  uploadImages,
} from "../../utils/helpers";
import { useEffect, useRef, useState } from "react";
import Heading from "../../ui/Heading";
import { useUpdateUser } from "./useUpdateUser";
import UserFields from "./UserFields";
import { FAMEL_PICTURE_URL, MALE_PICTURE_URL } from "../../utils/constants";

function UpdateUser({ userToEdit = {}, onCloseModal }) {
  const { isUpdating, updateUser } = useUpdateUser();

  const [selectedOption, setSelectedOption] = useState("male");
  const [upload, setUpload] = useState(null);

  const fileImageRef = useRef();
  const oldImageRef = useRef();

  const { register, handleSubmit, reset, getValues, formState, setValue } =
    useForm();

  useEffect(() => {
    uploadUserDataforUpdate();
  }, []);

  const { errors } = formState;
  const isWorking = isUpdating;

  function onSubmit(data) {
    data.gender = getGender(data.gender);
    data.isActive = getActive(data.isActive);
    const Permission = calculatePermissionst(0, getValues);
    if (!data.image) data.image = "";
    const oldImageUrl = oldImageRef.current;

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
      personID = userToEdit.personID,
      UserID = userToEdit.userID,
    } = data;

    updateUser(
      {
        updateUser: {
          UserID,
          personID,
          UserName,
          Password,
          Permission,
          IsActive,
        },
        UserID,
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
      <Heading as="h2">{`Update User With ID= ${userToEdit.UserID}`}</Heading>
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
        isEditSession={true}
        onCloseModal={onCloseModal}
      />
    </Form>
  );

  function uploadUserDataforUpdate() {
    const {
      userName,
      password,
      permission,
      isActive,
      name,
      address,
      phone,
      dateOfBirth,
      gender,
      email,
      image,
    } = userToEdit;

    oldImageRef.current = image ? image : "no_image";

    setValue("password", password.trim());
    setValue("confirmPassword", password.trim());
    setValue("userName", userName);
    setValue("isActive", isActive);
    setValue("name", name);
    setValue("address", address);
    setValue("phone", phone);
    setValue("dateOfBirth", formatDate2(dateOfBirth));
    setValue("gender", gender === 1 ? "male" : "female");
    setSelectedOption((value) => (value = gender === 1 ? "male" : "female"));
    setValue("email", email);
    readPermissionsToSet(permission, setValue);

    const ImagePath = handleIamge(image, gender);

    ImagePath === MALE_PICTURE_URL || ImagePath === FAMEL_PICTURE_URL
      ? setValue("image", "")
      : setValue("image", ImagePath);
    setUpload((value) => (value = ImagePath));
  }
}

export default UpdateUser;
