import Button from "../../ui/Button";
import { handleIamge } from "../../utils/helpers";
import ImageIcone from "../../ui/ImageIcone";
import Icon from "../../ui/Icon";
import Text from "../../ui/Text";
import Field from "../../ui/Field";
import Card from "../../ui/Card";
import ButtonCancle from "../../ui/ButtonCancle";
import Heading from "../../ui/Heading";
import { useAllBeltRankForMembers } from "../BeltRanks/useAllBeltRankForMembers";
import { MALE_PICTURE_URL } from "../../utils/constants";
import PersonDetails from "../Persons/PersonDetails";
import ImageField from "../Persons/ImageField";

function ShowMemberDetails({
  memberDetails,
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
  return memberDetails ? (
    <>
      <Heading as="h2">
        Show Member Details With ID= {`${memberDetails.memberID}`}
      </Heading>

      <Card>
        <div>
          <Field>
            <Text>Member ID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>{memberDetails.memberID}</Text>
          </Field>
          <PersonDetails personDetails={memberDetails} />
        </div>
        <div>
          <Field>
            <Text>Last Belt Rank </Text>
            <Icon>{<ImageIcone src="/belt.png" />}</Icon>
            <Text> {RankMember.at(0).rankName}</Text>
          </Field>
          <Field>
            <Text>Emergency Info: </Text>
            <Icon>{<ImageIcone src="/call 32.png" />}</Icon>
            <Text> {memberDetails.emeragencyContact}</Text>
          </Field>
          <Field>
            <Text>Active: </Text>
            <Icon>
              {memberDetails.isActive ? (
                <Icon>{<ImageIcone src="/active-user.png" />}</Icon>
              ) : (
                <Icon>{<ImageIcone src="/inactive-user.png" />}</Icon>
              )}
            </Icon>
            <Text> {memberDetails.isActive ? "Active" : "Not-Active"}</Text>
          </Field>
          <ImageField ImagePath={ImagePath} TypeName={"Member"} />
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
            <Text>Member ID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <PersonDetails personDetails={memberDetails} />
        </div>
        <div>
          <Field>
            <Text>Last Belt Rank </Text>
            <Icon>{<ImageIcone src="/belt.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Emergency Info: </Text>
            <Icon>{<ImageIcone src="/call 32.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Active: </Text>
            <Icon>
              <Icon>{<ImageIcone src="/Question 32.png" />}</Icon>
            </Icon>
            <Text>???</Text>
          </Field>
          <ImageField ImagePath={MALE_PICTURE_URL} TypeName={"Member"} />
        </div>
      </Card>
    </>
  );
}

export default ShowMemberDetails;
