import { fetchUserDetails, formatDate } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import { useRef, useState } from "react";
import IsTrue from "../../ui/IsTrue";
import FieldMainTable from "../../ui/FieldMainTable";
import ImageIcone from "../../ui/ImageIcone";
import ShowUserDetials from "./ShowUserDetials";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteUserr } from "./useDeleteUserr";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";

function UserRow({ user }) {
  const { isDeleting, deleteUser } = useDeleteUserr();
  const [Fetch, setFetch] = useState(false);
  const userDetialsRef = useRef();

  const { dateOfBirth, gneder, isActive, name, phone, userID, userName } = user;

  return (
    <Table.Row>
      <FieldMainTable>{userID}</FieldMainTable>
      <FieldMainTable>{name}</FieldMainTable>
      <FieldMainTable>{userName}</FieldMainTable>
      <FieldMainTable>{gneder}</FieldMainTable>
      <FieldMainTable>{formatDate(dateOfBirth)}</FieldMainTable>
      <FieldMainTable>{phone}</FieldMainTable>
      <IsTrue as={isActive ? "true" : "false"}>
        {isActive ? "true" : "false"}
      </IsTrue>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={userID} />
            <Menus.List id={userID}>
              <Modal.Open opens="show">
                <Menus.Button
                  icon={<ImageIcone src="./PersonDetails 32.png" />}
                  onFetch={() => handleFetch(userID)}
                >
                  Show User Informations
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="add">
                <Menus.Button icon={<ImageIcone src="./AddPerson 32.png" />}>
                  Add User
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="update">
                <Menus.Button
                  icon={<ImageIcone src="./edit 32.png" />}
                  onFetch={() => handleFetch(userID)}
                >
                  Update User
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button
                  icon={<ImageIcone src="./Delete 32.png" />}
                  disabled={!isActive}
                >
                  Inactive User
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="show">
              {Fetch ? (
                <Spinner />
              ) : (
                <ShowUserDetials userDetails={userDetialsRef.current} />
              )}
            </Modal.Window>
            <Modal.Window name="add">
              <CreateUser />
            </Modal.Window>
            <Modal.Window name="update">
              {Fetch ? (
                <Spinner />
              ) : (
                <UpdateUser userToEdit={userDetialsRef.current} />
              )}
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="user"
                disabled={isDeleting}
                onConfirm={() => deleteUser(userID)}
                InactivUser={false}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );

  async function handleFetch(userID) {
    setFetch((value) => (value = true));
    userDetialsRef.current = await fetchUserDetails(userID);
    setFetch((value) => (value = false));
  }
}

export default UserRow;
