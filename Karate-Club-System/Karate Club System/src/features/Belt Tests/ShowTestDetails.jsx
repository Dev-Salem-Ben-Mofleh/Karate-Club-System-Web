import Button from "../../ui/Button";
import { formatCurrency, formatDate, handleIamge } from "../../utils/helpers";
import ImageIcone from "../../ui/ImageIcone";
import Icon from "../../ui/Icon";
import Image from "../../ui/Image";
import Text from "../../ui/Text";
import Field from "../../ui/Field";
import Card from "../../ui/Card";
import FieldImage from "../../ui/FieldImage";
import ButtonCancle from "../../ui/ButtonCancle";
import Heading from "../../ui/Heading";
import { useAllBeltRankForMembers } from "../BeltRanks/useAllBeltRankForMembers";
import { MALE_PICTURE_URL } from "../../utils/constants";

function ShowTestDetails({
  TestDatails,
  memberDetails,
  instructorDetails,
  onCloseModal,
  isShowCancle = true,
}) {
  const { beltRanks } = useAllBeltRankForMembers();
  let RankTest = "";
  let ImagePath = "";

  if (memberDetails !== null) {
    RankTest = beltRanks.filter(
      (beltRank) => beltRank.rankID === TestDatails.rankID
    );

    ImagePath = handleIamge(memberDetails.image, memberDetails.gender);
  }
  return TestDatails ? (
    <>
      <Heading as="h2">
        Show Test Details With ID= {`${TestDatails.testID}`}
      </Heading>

      <Card>
        <div>
          <Field>
            <Text>Test ID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>{TestDatails.testID}</Text>
          </Field>
          <Field>
            <Text>Member Name: </Text>
            <Icon>{<ImageIcone src="/Person 32.png" />}</Icon>
            <Text>{memberDetails.name}</Text>
          </Field>
          <Field>
            <Text>Member ID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>{memberDetails.memberID}</Text>
          </Field>
          <Field>
            <Text>Gender: </Text>
            {memberDetails.gender === 1 ? (
              <Icon>{<ImageIcone src="/Man 32.png" />}</Icon>
            ) : (
              <Icon>{<ImageIcone src="/Woman 32.png" />}</Icon>
            )}
            <Text> {memberDetails.gender === 1 ? "Male" : "Female"} </Text>
          </Field>
          <Field>
            <Text>Last Belt Rank </Text>
            <Icon>{<ImageIcone src="/belt.png" />}</Icon>
            <Text> {RankTest.at(0).rankName}</Text>
          </Field>
          <Field>
            <Text>Instructor Name: </Text>
            <Icon>{<ImageIcone src="/Person 32.png" />}</Icon>
            <Text>{instructorDetails.name}</Text>
          </Field>
        </div>
        <div>
          <Field>
            <Text>Test Date: </Text>
            <Icon>{<ImageIcone src="/Calendar 32.png" />}</Icon>
            <Text> {formatDate(TestDatails.date)}</Text>
          </Field>
          <Field>
            <Text>Result: </Text>

            <Icon>
              {TestDatails.result ? (
                <Icon>{<ImageIcone src="/active-user.png" />}</Icon>
              ) : (
                <Icon>{<ImageIcone src="/inactive-user.png" />}</Icon>
              )}
            </Icon>
            <Text> {TestDatails.result ? "Yes" : "No"}</Text>
          </Field>
          <Field>
            <Text>PaymentID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>{TestDatails.paymentID}</Text>
          </Field>
          <Field>
            <Text>Fees: </Text>
            <Icon>{<ImageIcone src="/money 32.png" />}</Icon>
            <Text>{formatCurrency(RankTest.at(0).testFees)}</Text>
          </Field>
          <FieldImage>
            <Image src={ImagePath} alt="Member" />
          </FieldImage>
        </div>
      </Card>
      {isShowCancle ? (
        <ButtonCancle>
          <Button
            variation="danger"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Close
          </Button>
        </ButtonCancle>
      ) : null}
    </>
  ) : (
    <>
      <Card>
        <div>
          <Field>
            <Text>Test ID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Member Name: </Text>
            <Icon>{<ImageIcone src="/Person 32.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Member ID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Gender: </Text>{" "}
            <Icon>{<ImageIcone src="/Man 32.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Last Belt Rank </Text>
            <Icon>{<ImageIcone src="/belt.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Instructor Name: </Text>
            <Icon>{<ImageIcone src="/Person 32.png" />}</Icon>
            <Text>???</Text>
          </Field>
        </div>
        <div>
          <Field>
            <Text>Test Date: </Text>
            <Icon>{<ImageIcone src="/Calendar 32.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Result: </Text>
            <Icon>
              <Icon>{<ImageIcone src="/active-user.png" />}</Icon>
            </Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>PaymentID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Fees: </Text>
            <Icon>{<ImageIcone src="/money 32.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <FieldImage>
            <Image src={MALE_PICTURE_URL} alt="Member" />
          </FieldImage>
        </div>
      </Card>
    </>
  );
}

export default ShowTestDetails;
