import { fetchInstructorDetails, formatDate } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Spinner from "../../ui/Spinner";
import { useRef, useState } from "react";
import FieldMainTable from "../../ui/FieldMainTable";
import ImageIcone from "../../ui/ImageIcone";
import CreateInstructor from "./CreateInstructor";
import ShowInstructorDetails from "./ShowInstructorDetails";
import { useDeleteInstuctor } from "./useDeleteInstructor";
import ShowAllMembersTrainedByInstructor from "../Members/ShowAllMembersTrainedByInstructor";
import UpdateInstructor from "./UpdateInstructor";

function InstructorRow({ Instructor }) {
  const { isDeleting, deleteInstructor } = useDeleteInstuctor();
  const [Fetch, setFetch] = useState(false);
  const instructorDetialsRef = useRef();

  const { instructorID, name, gneder, dateOfBirth, phone, qualification } =
    Instructor;

  return (
    <Table.Row>
      <FieldMainTable>{instructorID}</FieldMainTable>
      <FieldMainTable>{name}</FieldMainTable>
      <FieldMainTable>{phone}</FieldMainTable>
      <FieldMainTable>{formatDate(dateOfBirth)}</FieldMainTable>
      <FieldMainTable>{gneder}</FieldMainTable>
      <FieldMainTable>
        {qualification ? qualification : "No Qualification"}
      </FieldMainTable>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={instructorID} />
            <Menus.List id={instructorID}>
              <Modal.Open opens="show">
                <Menus.Button
                  icon={<ImageIcone src="./PersonDetails 32.png" />}
                  onFetch={() => handleFetch(instructorID)}
                >
                  Show Instructor Informations
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="add">
                <Menus.Button icon={<ImageIcone src="./AddPerson 32.png" />}>
                  Add Instructor
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="update">
                <Menus.Button
                  icon={<ImageIcone src="./edit 32.png" />}
                  onFetch={() => handleFetch(instructorID)}
                >
                  Update Instructor
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button icon={<ImageIcone src="./Delete 32.png" />}>
                  Delete Instructor
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="memberList">
                <Menus.Button
                  icon={<ImageIcone src="./Instructors.png" />}
                  onFetch={() => handleFetch(instructorID)}
                >
                  Show Member Trianed By Instructor
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="show">
              {Fetch ? (
                <Spinner />
              ) : (
                <ShowInstructorDetails
                  instructorDetails={instructorDetialsRef.current}
                />
              )}
            </Modal.Window>
            <Modal.Window name="add">
              <CreateInstructor />
            </Modal.Window>
            <Modal.Window name="update">
              {Fetch ? (
                <Spinner />
              ) : (
                <UpdateInstructor
                  instructorToEdit={instructorDetialsRef.current}
                />
              )}
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="instructor"
                disabled={isDeleting}
                onConfirm={() => deleteInstructor(instructorID)}
              />
            </Modal.Window>
            <Modal.Window name="memberList">
              {Fetch ? (
                <Spinner />
              ) : (
                <ShowAllMembersTrainedByInstructor
                  InstructorID={instructorID}
                />
              )}
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );

  async function handleFetch(instructorID) {
    setFetch((value) => (value = true));
    instructorDetialsRef.current = await fetchInstructorDetails(instructorID);
    setFetch((value) => (value = false));
  }
}

export default InstructorRow;
