import Field from "../../ui/Field";
import Icon from "../../ui/Icon";
import ImageIcone from "../../ui/ImageIcone";
import Text from "../../ui/Text";
import CardSearch from "../../ui/CardSearch";
import ImageField from "../Persons/ImageField";
import PersonCardSearch from "../Persons/PersonCardSearch";

function MemberCardSearch({ memberDetials, RankMember, ImagePath }) {
  return (
    <CardSearch>
      {Boolean(memberDetials.current) ? (
        <div>
          <Field>
            <Text>Member ID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>{memberDetials.current.memberID}</Text>
          </Field>
          <PersonCardSearch personDetials={memberDetials.current} />
          <Field>
            <Text>Last Belt Rank </Text>
            <Icon>{<ImageIcone src="/belt.png" />}</Icon>
            <Text> {RankMember.at(0).rankName}</Text>
          </Field>
          <Field>
            <Text>Emergency Info: </Text>
            <Icon>{<ImageIcone src="/call 32.png" />}</Icon>
            <Text> {memberDetials.current.emeragencyContact}</Text>
          </Field>
          <Field>
            <Text>Active: </Text>
            <Icon>
              {memberDetials.current.isActive ? (
                <Icon>{<ImageIcone src="/active-user.png" />}</Icon>
              ) : (
                <Icon>{<ImageIcone src="/inactive-user.png" />}</Icon>
              )}
            </Icon>
            <Text>
              {memberDetials.current.isActive ? "Active" : "Not-Active"}
            </Text>
          </Field>
          <ImageField ImagePath={ImagePath} TypeName={"Member"} />
        </div>
      ) : (
        <div>
          <Field>
            <Text>Member ID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <PersonCardSearch memberDetials={memberDetials.current} />
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
            <Icon>{<ImageIcone src="/Question 32.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <ImageField ImagePath={ImagePath} TypeName={"Member"} />
        </div>
      )}
    </CardSearch>
  );
}

export default MemberCardSearch;
