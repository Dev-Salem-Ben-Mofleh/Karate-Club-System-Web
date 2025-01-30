import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import { useCreateMembre } from "./useCreateMember";
import Spinner from "../../ui/Spinner";
import {
  ClearImage,
  getActive,
  getBeltRankNumber,
  getGender,
  uploadImages,
} from "../../utils/helpers";
import { useRef, useState } from "react";
import MemberFields from "./MemberFields";
import Heading from "../../ui/Heading";
import { useAllBeltRankForMembers } from "../BeltRanks/useAllBeltRankForMembers";
import { MALE_PICTURE_URL } from "../../utils/constants";

function CreateMemberForm({ onCloseModal }) {
  const { isCreating, createMember } = useCreateMembre();
  const { isLoading, beltRanks } = useAllBeltRankForMembers();

  const [selectedOption, setSelectedOption] = useState("male");
  const [upload, setUpload] = useState(MALE_PICTURE_URL);

  const fileImageRef = useRef();

  const { register, handleSubmit, reset, getValues, formState, setValue } =
    useForm();

  const { errors } = formState;
  const isWorking = isCreating;

  if (isLoading) return <Spinner />;

  function onSubmit(data) {
    data.gender = getGender(data.gender);
    data.isActive = getActive(data.isActive);
    data.lastBeltRank = getBeltRankNumber(data.lastBeltRank, beltRanks);
    if (!data.image) data.image = "";

    const {
      emeragencyContact: EmergencyContactInfo,
      lastBeltRank: LastBeltRankID,
      isActive: IsActive,
      name,
      address,
      phone,
      dateOfBirth,
      gender,
      email,
      image: imagePath,
      personID = 0,
      MemberID = 0,
    } = data;
    createMember(
      {
        newMember: {
          MemberID,
          personID,
          EmergencyContactInfo,
          LastBeltRankID,
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
      <Heading as="h2">{"Add New Member"}</Heading>
      <MemberFields
        errors={errors}
        isWorking={isWorking}
        register={register}
        getValues={getValues}
        setValue={setValue}
        uploadImageMamber={uploadImages}
        upload={upload}
        setUpload={setUpload}
        ClearImage={ClearImage}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        beltRanks={beltRanks}
        fileImageRef={fileImageRef}
        isEditSession={false}
        onCloseModal={onCloseModal}
      />
    </Form>
  );
}

export default CreateMemberForm;
