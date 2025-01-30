import {
  HiAcademicCap,
  HiCalendar,
  HiClipboard,
  HiCreditCard,
  HiLogout,
  HiUser,
  HiUserGroup,
  HiUsers,
  HiViewGrid,
} from "react-icons/hi";
import { HiTrophy } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useLogout } from "../features/Authentication/useLogout";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: white;
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 1rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: white;
    background-color: rgb(39, 48, 87);
    border-radius: var(--border-radius-sm);
    border-left: 8px solid orange;
    transition: all 0.3s;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: white;
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: orange;
  }
  @media (max-width: 768px) {
    &:link,
    &:visited {
      padding: 1rem 1rem;
      font-size: 1rem;
    }
    & svg {
      width: 15px;
      height: 15px;
    }
  }

  @media (max-width: 769px) and(max-width: 992px) {
    font-size: 1.6rem;
  }
`;

function MainNav() {
  const { logout, isLoading } = useLogout();

  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiViewGrid />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/members">
            <HiUser />
            <span>Members</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/instructors">
            <HiAcademicCap />
            <span>Instructors</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/memberInstructor">
            <HiUserGroup />
            <span>Member Instructor</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/beltRanks">
            <HiTrophy />
            <span>Belt Ranks</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/subscriptionPireod">
            <HiCalendar />
            <span>subscription Pireod</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/beltTest">
            <HiClipboard />
            <span>Belt Test</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/payment">
            <HiCreditCard />
            <span>Payment</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink aria-disabled={isLoading} onClick={logout} to="/login">
            <HiLogout />
            <span>Log Out</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
