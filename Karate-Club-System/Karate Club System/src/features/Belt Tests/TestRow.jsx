import {
  fetchBeltTestDetails,
  fetchInstructorDetails,
  fetchMemberDetails,
  formatDate,
} from "../../utils/helpers";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import { useRef, useState } from "react";
import IsTrue from "../../ui/IsTrue";
import FieldMainTable from "../../ui/FieldMainTable";
import ImageIcone from "../../ui/ImageIcone";
import { useNavigate } from "react-router-dom";
import ShowTestDetails from "./ShowTestDetails";
import ShowTestHistory from "./ShowTestHistory";

function TestRow({ test }) {
  const [Fetch, setFetch] = useState(false);
  const testDetialsRef = useRef();
  const memberDetialsRef = useRef();
  const instructorDetialsRef = useRef();
  const memberIDRef = useRef();
  const instructorIDRef = useRef();
  const navigate = useNavigate();

  const {
    testID,
    memberName,
    instructorName,
    rankName,
    date,
    paymentID,
    result,
  } = test;

  return (
    <Table.Row>
      <FieldMainTable>{testID}</FieldMainTable>
      <FieldMainTable>{memberName}</FieldMainTable>
      <FieldMainTable>{instructorName}</FieldMainTable>
      <FieldMainTable>{rankName}</FieldMainTable>
      <FieldMainTable>{formatDate(date)}</FieldMainTable>
      <FieldMainTable>
        {paymentID === null ? "not Paid" : paymentID}
      </FieldMainTable>
      <IsTrue as={result ? "true" : "false"}>
        {result ? "true" : "false"}
      </IsTrue>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={testID} />
            <Menus.List id={testID}>
              <Modal.Open opens="show">
                <Menus.Button
                  icon={<ImageIcone src="./PersonDetails 32.png" />}
                  onFetch={() => handleFetch(testID, "noPage")}
                >
                  Show Test Informations
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="take">
                <Menus.Button
                  icon={<ImageIcone src="./Notes 32.png" />}
                  onFetch={() => handleFetch(testID, "take")}
                >
                  Take Next Belt Test
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="test">
                <Menus.Button
                  icon={<ImageIcone src="./Calendar 32.png" />}
                  onFetch={() => handleFetch(testID, "noPage")}
                >
                  Show Test History
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="show">
              {!Fetch ? (
                <ShowTestDetails
                  TestDatails={testDetialsRef.current}
                  memberDetails={memberDetialsRef.current}
                  instructorDetails={instructorDetialsRef.current}
                />
              ) : (
                <Spinner />
              )}
            </Modal.Window>

            <Modal.Window name="test">
              {!Fetch ? (
                <ShowTestHistory memberID={memberIDRef.current} />
              ) : (
                <Spinner />
              )}
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );

  async function handleFetch(testID, pageName) {
    setFetch((value) => (value = true));
    testDetialsRef.current = await fetchBeltTestDetails(testID);
    memberIDRef.current = testDetialsRef.current.memberID;
    instructorIDRef.current = testDetialsRef.current.testedByInstructorID;
    memberDetialsRef.current = await fetchMemberDetails(
      testDetialsRef.current.memberID
    );
    instructorDetialsRef.current = await fetchInstructorDetails(
      testDetialsRef.current.testedByInstructorID
    );

    setFetch((value) => (value = false));
    if (pageName !== "noPage") navigatePage(pageName);
  }

  function navigatePage(pageName) {
    if (!Fetch) {
      const memberID = memberIDRef.current;
      navigate(`/take-next-belt-test`, {
        state: memberID,
      });
    }
  }
}

export default TestRow;
