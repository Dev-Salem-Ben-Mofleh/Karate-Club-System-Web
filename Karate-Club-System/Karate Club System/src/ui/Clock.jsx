import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Header = styled.div`
  font-size: 1.5rem;
  color: #ffffff;
  background-color: #ff6600;
  padding: 10px 20px;
  border-radius: 8px;
  font-family: "Arial", sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: inline-block;
  position: absolute;
  left: 20%;

  @media (max-width: 1240px) {
    display: none;
  }
`;

const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const isPM = hours >= 12;
      const ampm = isPM ? "PM" : "AM";

      hours = hours % 12 || 12;

      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;
      setTime(formattedTime);
    };

    const timerId = setInterval(updateClock, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <Header>
      <div>{time}</div>
    </Header>
  );
};

export default Clock;
