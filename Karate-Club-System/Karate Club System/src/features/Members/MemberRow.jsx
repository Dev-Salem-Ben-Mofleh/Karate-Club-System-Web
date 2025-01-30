import { fetchMemberDetails, formatDate } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import CreateMemberForm from "./CreateMemberForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Spinner from "../../ui/Spinner";
import { useRef, useState } from "react";
import { useDeleteMember } from "./useDeleteMember";
import ShowMemberDetails from "./ShowMemberDetails";
import ShowPeriodHistory from "../Subscription Period/ShowPeriodHistory";
import ShowTestHistory from "../Belt Tests/ShowTestHistory";
import ShowPaymentHistory from "../Payments/ShowPaymentsHistory";
import IsTrue from "../../ui/IsTrue";
import FieldMainTable from "../../ui/FieldMainTable";
import ImageIcone from "../../ui/ImageIcone";
import { useNavigate } from "react-router-dom";
import UpdateMember from "./UpdateMember";

function MemberRow({ member }) {
  const { isDeleting, deleteMember } = useDeleteMember();
  const [Fetch, setFetch] = useState(false);
  const memberDetialsRef = useRef();
  const navigate = useNavigate();

  const {
    memberID,
    name,
    beltRankName: rankName,
    gneder,
    dateOfBirth,
    phone,
    isActive,
  } = member;

  return (
    <Table.Row>
      <FieldMainTable>{memberID}</FieldMainTable>
      <FieldMainTable>{name}</FieldMainTable>
      <FieldMainTable>{rankName}</FieldMainTable>
      <FieldMainTable>{gneder}</FieldMainTable>
      <FieldMainTable>{formatDate(dateOfBirth)}</FieldMainTable>
      <FieldMainTable>{phone}</FieldMainTable>
      <IsTrue as={isActive ? "true" : "false"}>
        {isActive ? "true" : "false"}
      </IsTrue>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={memberID} />
            <Menus.List id={memberID}>
              <Modal.Open opens="show">
                <Menus.Button
                  icon={<ImageIcone src="./PersonDetails 32.png" />}
                  onFetch={() => handleFetch(memberID)}
                >
                  Show Member Informations
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="add">
                <Menus.Button icon={<ImageIcone src="./AddPerson 32.png" />}>
                  Add Member
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="update">
                <Menus.Button
                  icon={<ImageIcone src="./edit 32.png" />}
                  onFetch={() => handleFetch(memberID)}
                >
                  Update Member
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button icon={<ImageIcone src="./Delete 32.png" />}>
                  Delete Member
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="takeTest">
                <Menus.Button
                  icon={<ImageIcone src="./New Application 64.png" />}
                  onFetch={() => handleFetch(memberID, true)}
                  disabled={!isActive}
                >
                  Take Next Belt Test
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="period">
                <Menus.Button icon={<ImageIcone src="./Subscriptions.png" />}>
                  Show Period History
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="test">
                <Menus.Button icon={<ImageIcone src="./Notes 32.png" />}>
                  Show Test History
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="payment">
                <Menus.Button icon={<ImageIcone src="./payment.png" />}>
                  Show Payment History
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="show">
              {Fetch ? (
                <Spinner />
              ) : (
                <ShowMemberDetails memberDetails={memberDetialsRef.current} />
              )}
            </Modal.Window>
            <Modal.Window name="add">
              <CreateMemberForm />
            </Modal.Window>
            <Modal.Window name="update">
              {Fetch ? (
                <Spinner />
              ) : (
                <UpdateMember memberToEdit={memberDetialsRef.current} />
              )}
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="member"
                disabled={isDeleting}
                onConfirm={() => deleteMember(memberID)}
              />
            </Modal.Window>
            <Modal.Window name="period">
              <ShowPeriodHistory memberID={memberID} />
            </Modal.Window>
            <Modal.Window name="test">
              <ShowTestHistory memberID={memberID} />
            </Modal.Window>
            <Modal.Window name="payment">
              <ShowPaymentHistory memberID={memberID} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );

  async function handleFetch(memberID, isTake = false) {
    setFetch((value) => (value = true));
    memberDetialsRef.current = await fetchMemberDetails(memberID);
    if (isTake) navigatePage(memberID);
    setFetch((value) => (value = false));
  }
  function navigatePage(memberID) {
    if (!Fetch) {
      navigate(`/take-next-belt-test`, {
        state: memberID,
      });
    }
  }
}

export default MemberRow;
