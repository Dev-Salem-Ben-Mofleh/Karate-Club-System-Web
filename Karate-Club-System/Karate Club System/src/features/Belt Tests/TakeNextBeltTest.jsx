import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Heading from "../../ui/Heading";
import toast from "react-hot-toast";
import { formatDate2 } from "../../utils/helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateTest } from "./useCreateTest";
import TestBeltField from "./TestBeltField";

function TakeNextBeltTest() {
  const { isCreating, createTest } = useCreateTest();

  const [selectedOption, setSelectedOption] = useState("no");

  const location = useLocation();
  let sendMemberID = location.state || 0;
  const navigate = useNavigate();

  const { register, handleSubmit, reset, getValues, formState, setValue } =
    useForm();

  if (sendMemberID > 0) {
    setValue("memberID", sendMemberID);
  }

  const { errors } = formState;
  const isWorking = isCreating;
  const defaultStartDate = formatDate2(new Date());

  function onSubmit(data) {
    const result = getValues("result") === "yes" ? true : false;
    const paymentID = 0;
    const {
      instructorID: testedByInstructorID,
      memberID,
      rankID,
      date = defaultStartDate,
      fees,
    } = data;

    createTest(
      {
        newBeltTest: {
          testID: 0,
          memberID,
          testedByInstructorID,
          rankID,
          date,
          fees,
          paymentID,
          result,
        },
        payment: {
          paymentID,
          amount: fees,
          date,
          memberID,
          paymentFor: 2,
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
      <Heading as="h2">Teke Next Belt Test</Heading>
      <TestBeltField
        register={register}
        getValues={getValues}
        setValue={setValue}
        isWorking={isWorking}
        sendMemberID={sendMemberID}
        defaultStartDate={defaultStartDate}
        errors={errors}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        navigate={navigate}
      />
    </Form>
  );
}

export default TakeNextBeltTest;
