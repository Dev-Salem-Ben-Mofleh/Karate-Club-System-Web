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

function ShowPeriodDetails({
  memberDetails,
  periodDetails,
  onCloseModal,
  isShowCancle = true,
}) {
  const { beltRanks } = useAllBeltRankForMembers();
  let RankMember = "";
  let ImagePath = "";

  if (memberDetails !== null) {
    RankMember = beltRanks.filter(
      (beltRank) => beltRank.rankID === memberDetails.lastBeltRank
    );

    ImagePath = handleIamge(memberDetails.image, memberDetails.gender);
  }
  return periodDetails ? (
    <>
      <Heading as="h2">
        Show Period Details With ID= {`${periodDetails.periodID}`}
      </Heading>

      <Card>
        <div>
          <Field>
            <Text>Period ID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>{periodDetails.periodID}</Text>
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
            <Text> {RankMember.at(0).rankName}</Text>
          </Field>
          <Field>
            <Text>Isseu reason: </Text>
            <Icon>{<ImageIcone src="/Notes 32.png" />}</Icon>
            <Text>
              {periodDetails.issueReason === 1 ? "First Time" : "Renew period"}
            </Text>
          </Field>
          <Field>
            <Text>Satrt Date: </Text>
            <Icon>{<ImageIcone src="/Calendar 32.png" />}</Icon>
            <Text> {formatDate(periodDetails.startDate)}</Text>
          </Field>
          <Field>
            <Text>End Date: </Text>
            <Icon>{<ImageIcone src="/Calendar 32.png" />}</Icon>
            <Text> {formatDate(periodDetails.endDate)}</Text>
          </Field>
        </div>
        <div>
          <Field>
            <Text>Is Paid: </Text>

            <Icon>
              {periodDetails.paid ? (
                <Icon>{<ImageIcone src="/active-user.png" />}</Icon>
              ) : (
                <Icon>{<ImageIcone src="/inactive-user.png" />}</Icon>
              )}
            </Icon>
            <Text> {periodDetails.paid ? "Yes" : "No"}</Text>
          </Field>
          <Field>
            <Text>Is Active: </Text>
            <Icon>
              {periodDetails.isActive ? (
                <Icon>{<ImageIcone src="/active-user.png" />}</Icon>
              ) : (
                <Icon>{<ImageIcone src="/inactive-user.png" />}</Icon>
              )}
            </Icon>
            <Text> {periodDetails.isActive ? "Yes" : "No"}</Text>
          </Field>
          <Field>
            <Text>PaymentID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>
              {periodDetails.paymentID ? periodDetails.paymentID : "Not Paid"}
            </Text>
          </Field>
          <Field>
            <Text>Fees: </Text>
            <Icon>{<ImageIcone src="/money 32.png" />}</Icon>
            <Text>{formatCurrency(periodDetails.fees)}</Text>
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
            <Text>Period ID: </Text>
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
            <Text>Gender: </Text>
            <Icon>{<ImageIcone src="/Man 32.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Last Belt Rank </Text>
            <Icon>{<ImageIcone src="/belt.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Isseu reason: </Text>
            <Icon>{<ImageIcone src="/Notes 32.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Satrt Date: </Text>
            <Icon>{<ImageIcone src="/Calendar 32.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>End Date: </Text>
            <Icon>{<ImageIcone src="/Calendar 32.png" />}</Icon>
            <Text>???</Text>
          </Field>
        </div>
        <div>
          <Field>
            <Text>Is Paid: </Text>
            <Icon>{<ImageIcone src="/Question 32.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Is Active: </Text>
            <Icon>{<ImageIcone src="/Question 32.png" />}</Icon>
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
            <Image src="/DefaultMale.png" alt="Member" />
          </FieldImage>
        </div>
      </Card>
    </>
  );
}

export default ShowPeriodDetails;
