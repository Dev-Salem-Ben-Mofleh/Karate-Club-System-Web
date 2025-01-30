import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Heading from "../../ui/Heading";
import toast from "react-hot-toast";
import { useUpdatePeriod } from "./useUpdatePeriod";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  fetchCheckMember,
  fetchMemberDetails,
  formatDate2,
} from "../../utils/helpers";
import { useGetPeriodDay } from "./useGetPeriodDay";
import { addDays, differenceInDays } from "date-fns";
import { isNumber } from "../../utils/validatorUtils";
import { useAllBeltRankForMembers } from "../BeltRanks/useAllBeltRankForMembers";
import PeriodFields from "./PeriodFields";

function UpdatePeriod() {
  useAllBeltRankForMembers();
  const { isUpdating, updatPeriod } = useUpdatePeriod();
  const { periodDays } = useGetPeriodDay();

  const [isSearch, setIsSeearch] = useState();
  const [selectedOption, setSelectedOption] = useState("no");

  const { id: sendPeriodID } = useParams();
  const location = useLocation();
  let periodToEdit = location.state;

  const navigate = useNavigate();

  const memberDetialsRef = useRef();
  const memberHasPeriodActiveRef = useRef(false);
  const memberNotPaidforPeriodRef = useRef(false);
  const isFetchMemberRef = useRef(false);
  const startDateRef = useRef();

  const { register, handleSubmit, reset, getValues, formState, setValue } =
    useForm();

  useEffect(() => {
    uploadPeriodDataforUpdate();
    if (isFetchMemberRef.current && getValues("memberID") > 0) {
      handleFetch(null, getValues("memberID"));
      isFetchMemberRef.current = false;
    }
  }, []);

  const { errors } = formState;
  const isWorking = isUpdating;
  const defaultStartDate = formatDate2(new Date());
  const endDate = addDays(new Date(), periodDays);
  const defaultEndDate = formatDate2(endDate);

  function onSubmit(data) {
    const { endDate, fees, memberID, periodID = periodToEdit.periodID } = data;
    const paid = getValues("paid") === "yes" ? true : false;
    const issueReason = 1;
    const isActive = true;
    const startDate = periodToEdit.startDate;
    const subscrpitonDays = differenceInDays(endDate, startDate);
    const paymentID = periodToEdit.paymentID;

    updatPeriod(
      {
        updatePeriod: {
          periodID,
          paymentID,
          startDate,
          endDate,
          fees,
          memberID,
          isActive,
          paid,
          issueReason,
          subscrpitonDays,
        },
        payment: {
          paymentID,
          amount: fees,
          date: startDate,
          memberID: memberID,
          paymentFor: 1,
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

    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Heading as="h2">
        {`Update Subscription_Period With ID= ${sendPeriodID}`}
      </Heading>
      <PeriodFields
        register={register}
        errors={errors}
        getValues={getValues}
        handleFetch={handleFetch}
        memberDetials={memberDetialsRef.current}
        payment={periodToEdit.paymentID}
        defaultStartDate={defaultStartDate}
        defaultEndDate={defaultEndDate}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        isEditSession={true}
        isWorking={isWorking}
        isSearch={isSearch}
        isMemberActive={true}
        hasActivePeriod={false}
        isNotPaid={false}
        startDate={periodToEdit.startDate}
        navigate={navigate}
      />
    </Form>
  );

  function uploadPeriodDataforUpdate() {
    const { endDate, fees, memberID, paid, paymentID, startDate } =
      periodToEdit;
    setValue("memberID", memberID);
    setValue("endDate", formatDate2(endDate));
    setValue("fees", fees);
    setValue("paid", paid ? "yes" : "no");
    setValue("paymentID", paymentID ? paymentID : "ID");
    setValue("startDate", formatDate2(startDate));
  }

  async function handleFetch(e, memberID) {
    if (e !== null) e.preventDefault();
    if (!Number(getValues("memberID") > 0) || !isNumber(memberID)) {
      toast.error(`Please enter memberID ID Greater than > 0`);
      return;
    }
    setIsSeearch((value) => (value = true));
    memberDetialsRef.current = await fetchMemberDetails(memberID);
    if (!memberDetialsRef.current) {
      toast.error(`Member Is not found try again and enter correct ID`);
      return;
    } else {
      toast.success(`Member Is found with ID= ${memberID}`);
    }
    const { hasPeriod, isNotPaid } = await fetchCheckMember(memberID);
    memberHasPeriodActiveRef.current = hasPeriod;
    memberNotPaidforPeriodRef.current = isNotPaid;
    setIsSeearch((value) => (value = false));
  }
}

export default UpdatePeriod;
