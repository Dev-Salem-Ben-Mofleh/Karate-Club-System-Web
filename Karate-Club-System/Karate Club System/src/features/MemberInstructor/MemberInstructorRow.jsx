import { formatDate } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useRef, useState } from "react";
import FieldMainTable from "../../ui/FieldMainTable";
import ImageIcone from "../../ui/ImageIcone";
import { getMemberInstructorByID } from "../../services/apiMemberInstructor";
import { useNavigate } from "react-router-dom";
import { useDeleteMemberInstuctor } from "./useDeleteMemberInstructor";

function MemberInstructorRow({ memberInstructor }) {
  const { isDeleting, deleteMemberInstructor } = useDeleteMemberInstuctor();
  const [Fetch, setFetch] = useState(false);
  const memberInstructorDetialsRef = useRef();
  const navigate = useNavigate();
  const { memberInstructorID, assignDate, instructorName, memberName } =
    memberInstructor;

  return (
    <Table.Row>
      <FieldMainTable>{memberInstructorID}</FieldMainTable>
      <FieldMainTable>{instructorName}</FieldMainTable>
      <FieldMainTable>{memberName}</FieldMainTable>
      <FieldMainTable>{formatDate(assignDate)}</FieldMainTable>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={memberInstructorID} />
            <Menus.List id={memberInstructorID}>
              <Modal.Open opens="show">
                <Menus.Button
                  icon={<ImageIcone src="./PersonDetails 32.png" />}
                  onFetch={() => handleFetch(memberInstructorID, "show")}
                >
                  Show Member_Instructor Informations
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="add">
                <Menus.Button
                  onFetch={() => navigatePage("add")}
                  icon={<ImageIcone src="./AddPerson 32.png" />}
                >
                  Add Member_Instructor
                </Menus.Button>
              </Modal.Open>
              <Menus.Button
                icon={<ImageIcone src="./edit 32.png" />}
                onFetch={() => handleFetch(memberInstructorID, "update")}
              >
                Update Member_Instructor
              </Menus.Button>
              <Modal.Open opens="delete">
                <Menus.Button icon={<ImageIcone src="./Delete 32.png" />}>
                  Delete Member_Instructor
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="member_nstructor"
                disabled={isDeleting}
                onConfirm={() => deleteMemberInstructor(memberInstructorID)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );

  async function handleFetch(memberInstructorID, pageName) {
    setFetch((value) => (value = true));
    memberInstructorDetialsRef.current = await getMemberInstructorByID(
      memberInstructorID
    );
    setFetch((value) => (value = false));
    navigatePage(pageName);
  }

  function navigatePage(pageName) {
    if (!Fetch) {
      switch (pageName) {
        case "show":
          navigate(`/show-member-instructor`, {
            state: memberInstructorDetialsRef.current,
          });
          break;
        case "add":
          navigate(`/add-member-instructor/${0}`);
          break;
        case "update":
          navigate(`/update-member-instructor/${memberInstructorID}`, {
            state: memberInstructorDetialsRef.current,
          });
          break;

        default:
          navigate(`/show-member-instructor`, {
            state: memberInstructorDetialsRef.current,
          });
          break;
      }
    }
  }
}

export default MemberInstructorRow;
