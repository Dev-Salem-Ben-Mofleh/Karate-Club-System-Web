import Field from "../../ui/Field";
import Icon from "../../ui/Icon";
import ImageIcone from "../../ui/ImageIcone";
import Text from "../../ui/Text";
import CardSearch from "../../ui/CardSearch";
import PersonCardSearch from "../Persons/PersonCardSearch";
import ImageField from "../Persons/ImageField";

function InstructorCardSearch({ instructorDetials, ImagePath }) {
  console.log(instructorDetials.current);
  return (
    <CardSearch>
      {Boolean(instructorDetials.current) ? (
        <div>
          <Field>
            <Text>Instructor ID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>{instructorDetials.current.instructorID}</Text>
          </Field>
          <PersonCardSearch personDetials={instructorDetials.current} />
          <Field>
            <Text>Qualifiction: </Text>
            <Icon>{<ImageIcone src="/qualification.png" />}</Icon>
            <Text>
              {instructorDetials.current.qualification
                ? instructorDetials.current.qualification
                : "no qualification"}
            </Text>
          </Field>
          <ImageField ImagePath={ImagePath} TypeName={"Instructor"} />
        </div>
      ) : (
        <div>
          <Field>
            <Text>Instructor ID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <PersonCardSearch personDetials={instructorDetials.current} />

          <Field>
            <Text>Qualifiction: </Text>
            <Icon>{<ImageIcone src="/qualification.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <ImageField ImagePath={ImagePath} TypeName={"Instructor"} />
        </div>
      )}
    </CardSearch>
  );
}

export default InstructorCardSearch;
