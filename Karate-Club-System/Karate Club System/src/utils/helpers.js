import { getInstructorByID } from "../services/apiInstructors";
import { CheckMemberHasSameInstructor } from "../services/apiMemberInstructor";
import { getMemberByID } from "../services/apiMembers";
import {
  CheckMemberHasPeriod,
  CheckSubscriptionsIsNotPaid,
  getSubscriptionPeriodsByID,
} from "../services/apiSubScriptionPeriod";

import { format, subYears, addDays } from "date-fns";
import { getUserByID } from "../services/apiUsers";
import { getPaymentByID, GetPaymentPayForWhat } from "../services/apiPayments";
import { getBeltTestByID } from "../services/apiBeltTests";
import { FAMEL_PICTURE_URL, MALE_PICTURE_URL } from "./constants";

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const formatDate = (value) => format(value, "dd/MM/yyyy");
export const formatDate2 = (value) => format(value, "yyyy-MM-dd");
export const addDaysToDate = (date, days) => addDays(date, days);

export const formatMinDate = (value) =>
  format(subYears(value, 24), "yyyy-MM-dd");

export function setMaxLength(max, field) {
  return {
    value: max,
    message: `The length of ${field} must be ${max} characters or fewer.`,
  };
}

export function getGender(gender) {
  return gender === "male" ? 1 : 0;
}
export function getActive(isActive) {
  return isActive === "true" || isActive ? true : false;
}
export function getBeltRankNumber(lastBeltRank, beltRanks) {
  return (
    beltRanks.findIndex(
      (beltRank) =>
        beltRank.rankName.replace(" ", "-").toLowerCase() === lastBeltRank
    ) + 1
  );
}

export async function fetchMemberDetails(memberID) {
  const memberDetails = await getMemberByID(memberID);
  return memberDetails;
}

export async function fetchInstructorDetails(InstructorID) {
  const InstructorDetails = await getInstructorByID(InstructorID);
  return InstructorDetails;
}

export async function fetchUserDetails(userID) {
  const UserDetails = await getUserByID(userID);
  return UserDetails;
}

export async function fetchPaymentDetails(paymentID) {
  const PaymentDetails = await getPaymentByID(paymentID);
  return PaymentDetails;
}
export async function fetchBeltTestDetails(testID) {
  const TestDetails = await getBeltTestByID(testID);
  return TestDetails;
}

export async function fetchPeriodDetails(periodID) {
  const PeriodDetails = await getSubscriptionPeriodsByID(periodID);
  return PeriodDetails;
}

export async function fetchCheckMember(memberID) {
  const hasPeriod = await CheckMemberHasPeriod(memberID);
  const isNotPaid = await CheckSubscriptionsIsNotPaid(memberID);
  return { hasPeriod, isNotPaid };
}

export async function fetchPaymentForWhat(paymentID, paymentFor) {
  const PaymentForWhat = await GetPaymentPayForWhat(paymentID, paymentFor);
  return PaymentForWhat;
}

export async function fetchMemberInstructorTheSame(memberID, instructorID) {
  const isSame = await CheckMemberHasSameInstructor(memberID, instructorID);
  return isSame;
}

export function isValidMemberID(memberID) {
  return Number(memberID) > 0;
}

export function isValidInstructorID(instructorID) {
  return Number(instructorID) > 0;
}

//handle Images
export function handleIamge(ImagePath, gender) {
  if (ImagePath === null) {
    if (gender === 1) return MALE_PICTURE_URL;
    else return FAMEL_PICTURE_URL;
  } else return ImagePath;
}

export function uploadImages(
  e,
  imageFile,
  imageNameOrGender,
  setUpload,
  setValue
) {
  if (e !== null) e.preventDefault();
  if (
    imageNameOrGender !== "male" &&
    imageNameOrGender !== "female" &&
    imageNameOrGender !== ""
  ) {
    setUpload((value) => (value = imageNameOrGender));
    setValue("image", imageFile);
  } else {
    setUpload(
      (value) =>
        (value =
          imageNameOrGender === "male" ? MALE_PICTURE_URL : FAMEL_PICTURE_URL)
    );
  }
}

export function ClearImage(
  e,
  imageNameOrGender,
  fileImage,
  setUpload,
  setValue
) {
  e.preventDefault();
  if (fileImage) {
    fileImage.value = "";
    setValue("image", "");
  }
  setUpload(
    (value) =>
      (value =
        imageNameOrGender === "male" ? MALE_PICTURE_URL : FAMEL_PICTURE_URL)
  );
}

export function calculatePermissionst(Permissions, getValues) {
  if (!getValues().all_Permission) {
    if (getValues().manage_Members) Permissions += 1;
    if (getValues().manage_Instructors) Permissions += 2;
    if (getValues().manage_Users) Permissions += 4;
    if (getValues().manage_MembersInstructors) Permissions += 8;
    if (getValues().manage_BeltRanks) Permissions += 16;
    if (getValues().manage_SubscriptionPeriod) Permissions += 32;
    if (getValues().manage_BeltTests) Permissions += 64;
    if (getValues().manage_Payments) Permissions += 128;
  } else {
    return 255;
  }
  return Permissions;
}

export function readPermissionsToSet(Permissions, setValue) {
  if (Permissions === 0) return;

  if (Permissions === 255) {
    setValue("all_Permission", true);
    return;
  } else {
    if ((1 & Permissions) === 1) setValue("manage_Members", true);
    if ((2 & Permissions) === 2) setValue("manage_Instructors", true);
    if ((4 & Permissions) === 4) setValue("manage_Users", true);
    if ((8 & Permissions) === 8) setValue("manage_MembersInstructors", true);
    if ((16 & Permissions) === 16) setValue("manage_BeltRanks", true);
    if ((32 & Permissions) === 32) setValue("manage_SubscriptionPeriod", true);
    if ((64 & Permissions) === 64) setValue("manage_BeltTests", true);
    if ((128 & Permissions) === 128) setValue("manage_Payments", true);
  }
}
