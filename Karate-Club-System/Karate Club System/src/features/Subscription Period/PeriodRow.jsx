import {
  fetchMemberDetails,
  fetchPeriodDetails,
  formatCurrency,
  formatDate,
  formatDate2,
} from "../../utils/helpers";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import { useRef, useState } from "react";
import IsTrue from "../../ui/IsTrue";
import FieldMainTable from "../../ui/FieldMainTable";
import ImageIcone from "../../ui/ImageIcone";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useNavigate } from "react-router-dom";
import { useDeletePeriod } from "./useDeletePeriod";
import ShowPaymentHistory from "../Payments/ShowPaymentsHistory";
import ShowPeriodDetails from "./ShowPeriodDetails";
import { useUpdatePeriod } from "./useUpdatePeriod";

function PeriodRow({ period }) {
  const { isDeleting, deletePeriod } = useDeletePeriod();
  const { updatPeriod } = useUpdatePeriod();

  const [Fetch, setFetch] = useState(false);

  const periodDetialsRef = useRef();
  const memberDetialsRef = useRef();
  const memberIDRef = useRef();
  const startDateRef = useRef();

  const navigate = useNavigate();

  const {
    periodID,
    name,
    fees,
    paid,
    startDate,
    endDate,
    subscrpitonDays,
    paymentID,
    isActive,
  } = period;
  startDateRef.current = formatDate2(new Date());

  return (
    <Table.Row>
      <FieldMainTable>{periodID}</FieldMainTable>
      <FieldMainTable>{name}</FieldMainTable>
      <FieldMainTable>{formatCurrency(fees)}</FieldMainTable>
      <IsTrue as={paid ? "true" : "false"}>{paid ? "true" : "false"}</IsTrue>
      <FieldMainTable>{formatDate(startDate)}</FieldMainTable>
      <FieldMainTable>{formatDate(endDate)}</FieldMainTable>
      <FieldMainTable>{subscrpitonDays}</FieldMainTable>
      <FieldMainTable>
        {paymentID === null ? "not Paid" : paymentID}
      </FieldMainTable>
      <IsTrue as={isActive ? "true" : "false"}>
        {isActive ? "true" : "false"}
      </IsTrue>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={periodID} />
            <Menus.List id={periodID}>
              <Modal.Open opens="show">
                <Menus.Button
                  icon={<ImageIcone src="./PersonDetails 32.png" />}
                  onFetch={() => handleFetch(periodID, "noPage")}
                >
                  Show Susbcription Period Informations
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="add">
                <Menus.Button
                  icon={<ImageIcone src="./AddPerson 32.png" />}
                  onFetch={() => handleFetch(periodID, "add")}
                >
                  Add Susbscription Period
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="update">
                <Menus.Button
                  icon={<ImageIcone src="./edit 32.png" />}
                  onFetch={() => handleFetch(periodID, "update")}
                >
                  Update Susbscription Period
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button icon={<ImageIcone src="./Delete 32.png" />}>
                  Delete Susbcription Period
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="pay">
                <Menus.Button
                  icon={<ImageIcone src="./money 32.png" />}
                  disabled={paid}
                >
                  Pay
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="renew">
                <Menus.Button
                  icon={<ImageIcone src="./Notes 32.png" />}
                  onFetch={() => navigatePage("renew")}
                >
                  Renew Period
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="payment">
                <Menus.Button
                  icon={<ImageIcone src="./payment.png" />}
                  onFetch={() => handleFetch(periodID, "noPage")}
                >
                  Show Payment History
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="show">
              {!Fetch ? (
                <ShowPeriodDetails
                  periodDetails={periodDetialsRef.current}
                  memberDetails={memberDetialsRef.current}
                />
              ) : (
                <Spinner />
              )}
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="subscription_period"
                disabled={isDeleting}
                onConfirm={() => deletePeriod(periodID)}
              />
            </Modal.Window>
            <Modal.Window name="payment">
              <ShowPaymentHistory memberID={memberIDRef.current} />
            </Modal.Window>
            <Modal.Window name="pay">
              <ConfirmDelete
                resourceName="Period"
                disabled={isDeleting}
                isPay={true}
                onConfirm={() => Pay(periodID)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );

  async function handleFetch(periodID, pageName) {
    setFetch((value) => (value = true));
    periodDetialsRef.current = await fetchPeriodDetails(periodID);
    memberIDRef.current = periodDetialsRef.current.memberID;
    memberDetialsRef.current = await fetchMemberDetails(
      periodDetialsRef.current.memberID
    );

    setFetch((value) => (value = false));
    if (pageName !== "noPage") navigatePage(pageName);
  }

  async function Pay(periodID) {
    setFetch((value) => (value = true));
    periodDetialsRef.current = await fetchPeriodDetails(periodID);
    memberIDRef.current = periodDetialsRef.current.memberID;
    updatPeriod({
      updatePeriod: {
        periodID: periodDetialsRef.current.periodID,
        paymentID: null,
        startDate: periodDetialsRef.current.startDate,
        endDate: periodDetialsRef.current.endDate,
        fees: periodDetialsRef.current.fees,
        memberID: memberIDRef.current,
        isActive: periodDetialsRef.current.isActive,
        paid: true,
        issueReason: periodDetialsRef.current.issueReason,
        subscrpitonDays: periodDetialsRef.current.subscrpitonDays,
      },

      payment: {
        paymentID,
        amount: fees,
        date: startDateRef.current,
        memberID: memberIDRef.current,
        paymentFor: 1,
      },
    });
    setFetch((value) => (value = false));
  }

  function navigatePage(pageName) {
    if (!Fetch) {
      switch (pageName) {
        case "add":
          navigate(`/add-subscription-Pireod/${0}`);
          break;
        case "update":
          navigate(`/update-subscription-Pireod/${periodID}`, {
            state: periodDetialsRef.current,
          });
          break;
        case "renew":
          navigate("/renew-subscription-Pireod");
          break;

        default:
          navigate(`/add-update-subscription-Pireod`, {
            state: periodDetialsRef.current,
          });
          break;
      }
    }
  }
}

export default PeriodRow;
