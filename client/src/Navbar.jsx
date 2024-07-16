import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #7289da;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const Username = styled.div`
  font-size: 1rem;
  color: #fff;
  margin-right: 1rem;
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const Navbar = ({ username, avatarUrl, onLogout }) => {
  return (
    <NavbarContainer>
      <Logo>Virtual Stock Game</Logo>
      <UserContainer>
        <Avatar src={avatarUrl} alt="User Avatar" />
        <Username>{username}</Username>
        <LogoutButton onClick={onLogout}>Logout</LogoutButton>
      </UserContainer>
    </NavbarContainer>
  );
};

export default Navbar;