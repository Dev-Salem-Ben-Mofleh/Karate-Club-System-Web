import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  margin: 10px;
`;

const Header = styled.h3`
  background-color: #d9534f;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 3px;
  text-align: center;
  font-size: 16px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Item = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;

  input {
    margin-right: 10px;
  }
`;

function Permission({ register, getValues, watch }) {
  const [selectedchecked, setChecked] = useState(false);

  const handleChange = (value) => {
    if (value === true) return;
    if (getValues().all_Permission) {
      setChecked((check) => false);
      return;
    }

    setChecked((check) => (check === false ? true : false));
  };
  useEffect(function () {
    handleChange(getValues().all_Permission);
  }, []);
  return (
    <Container>
      <Header>Permissions</Header>
      <List>
        <Item>
          <input
            id="all_Permission"
            value={selectedchecked}
            checked={selectedchecked}
            type="checkbox"
            {...register("all_Permission")}
            onClick={handleChange}
          />
          All Permissions
        </Item>
        <Item>
          {selectedchecked ? (
            <input
              id="manage_Members"
              value={selectedchecked}
              checked={selectedchecked}
              disabled={getValues().all_Permission}
              type="checkbox"
              {...register("manage_Members")}
            />
          ) : (
            <input
              id="manage_Members"
              type="checkbox"
              {...register("manage_Members")}
            />
          )}
          Manage Members
        </Item>
        <Item>
          {selectedchecked ? (
            <input
              type="checkbox"
              id="manage_Instructors"
              value={selectedchecked}
              disabled={getValues().all_Permission}
              checked={selectedchecked}
              {...register("manage_Instructors")}
            />
          ) : (
            <input
              type="checkbox"
              id="manage_Instructors"
              {...register("manage_Instructors")}
            />
          )}
          Manage Instructors
        </Item>
        <Item>
          {selectedchecked ? (
            <input
              type="checkbox"
              id="manage_Users"
              value={selectedchecked}
              disabled={getValues().all_Permission}
              checked={selectedchecked}
              {...register("manage_Users")}
            />
          ) : (
            <input
              type="checkbox"
              id="manage_Users"
              {...register("manage_Users")}
            />
          )}
          Manage Users
        </Item>
        <Item>
          {selectedchecked ? (
            <input
              type="checkbox"
              id="manage_MembersInstructors"
              value={selectedchecked}
              disabled={getValues().all_Permission}
              checked={selectedchecked}
              {...register("manage_MembersInstructors")}
            />
          ) : (
            <input
              type="checkbox"
              id="manage_MembersInstructors"
              {...register("manage_MembersInstructors")}
            />
          )}
          Manage Members Instructors
        </Item>
        <Item>
          {selectedchecked ? (
            <input
              type="checkbox"
              id="manage_BeltRanks"
              value={selectedchecked}
              disabled={getValues().all_Permission}
              checked={selectedchecked}
              {...register("manage_BeltRanks")}
            />
          ) : (
            <input
              type="checkbox"
              id="manage_BeltRanks"
              {...register("manage_BeltRanks")}
            />
          )}
          Manage Belt Ranks
        </Item>
        <Item>
          {selectedchecked ? (
            <input
              type="checkbox"
              id="manage_SubscriptionPeriod"
              value={selectedchecked}
              disabled={getValues().all_Permission}
              checked={selectedchecked}
              {...register("manage_SubscriptionPeriod")}
            />
          ) : (
            <input
              type="checkbox"
              id="manage_SubscriptionPeriod"
              {...register("manage_SubscriptionPeriod")}
            />
          )}
          Manage Subscription Period
        </Item>
        <Item>
          {selectedchecked ? (
            <input
              type="checkbox"
              id="manage_BeltTests"
              value={selectedchecked}
              disabled={getValues().all_Permission}
              checked={selectedchecked}
              {...register("manage_BeltTests")}
            />
          ) : (
            <input
              type="checkbox"
              id="manage_BeltTests"
              {...register("manage_BeltTests")}
            />
          )}
          Manage Belt Tests
        </Item>
        <Item>
          {selectedchecked ? (
            <input
              type="checkbox"
              id="manage_Payments"
              value={selectedchecked}
              disabled={getValues().all_Permission}
              checked={selectedchecked}
              {...register("manage_Payments")}
            />
          ) : (
            <input
              type="checkbox"
              id="manage_Payments"
              {...register("manage_Payments")}
            />
          )}
          Manage Payments
        </Item>
      </List>
    </Container>
  );
}

export default Permission;
