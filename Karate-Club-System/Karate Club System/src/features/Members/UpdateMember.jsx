import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import { useUpdateMember } from "./useUpdateMember";
import Spinner from "../../ui/Spinner";
import {
  ClearImage,
  formatDate2,
  getActive,
  getBeltRankNumber,
  getGender,
  handleIamge,
  uploadImages,
} from "../../utils/helpers";
import { useEffect, useRef, useState } from "react";
import MemberFields from "./MemberFields";
import Heading from "../../ui/Heading";
import { useAllBeltRankForMembers } from "../BeltRanks/useAllBeltRankForMembers";
import { FAMEL_PICTURE_URL, MALE_PICTURE_URL } from "../../utils/constants";

function UpdateMember({ memberToEdit = {}, onCloseModal }) {
  const { isUpdating, updatMember } = useUpdateMember();
  const { isLoading, beltRanks } = useAllBeltRankForMembers();

  const [selectedOption, setSelectedOption] = useState("male");
  const [upload, setUpload] = useState(null);

  const fileImageRef = useRef();
  const oldImageRef = useRef();

  const { register, handleSubmit, reset, getValues, formState, setValue } =
    useForm();

  useEffect(() => {
    uploadMemberDataforUpdate();
  }, []);

  const { errors } = formState;
  const isWorking = isUpdating;

  if (isLoading) return <Spinner />;

  function onSubmit(data) {
    data.gender = getGender(data.gender);
    data.isActive = getActive(data.isActive);
    data.lastBeltRank = getBeltRankNumber(data.lastBeltRank, beltRanks);
    if (!data.image) data.image = "";
    const oldImageUrl = oldImageRef.current;

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
      personID = memberToEdit.personID,
      MemberID = memberToEdit.memberID,
    } = data;

    updatMember(
      {
        updatMember: {
          MemberID,
          personID,
          EmergencyContactInfo,
          LastBeltRankID,
          IsActive,
        },
        MemberID,
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
      <Heading as="h2">{`Update Member With ID= ${memberToEdit.memberID}`}</Heading>
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
        isEditSession={true}
        onCloseModal={onCloseModal}
      />
    </Form>
  );

  function uploadMemberDataforUpdate() {
    const {
      emeragencyContact,
      lastBeltRank,
      isActive,
      name,
      address,
      phone,
      dateOfBirth,
      gender,
      email,
      image,
    } = memberToEdit;
    const RankMember = beltRanks.filter(
      (beltRank) => beltRank.rankID === lastBeltRank
    );

    oldImageRef.current = image ? image : "no_image";
    setValue("emeragencyContact", emeragencyContact);
    setValue(
      "lastBeltRank",
      RankMember.at(0).rankName.replace(" ", "-").toLowerCase()
    );
    setValue("isActive", isActive);
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
export default UpdateMember;
