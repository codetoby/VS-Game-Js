import React from 'react';
import styled from 'styled-components';
import config from './config.json';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #72edf2 10%, #5151e5 100%);
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #fff;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.5rem;
  color: #fff;
  background: #7289da;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #5b6eae;
  }
`;

const LoginPage = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        window.location.href = `${config.BACKEND_URL}/auth/discord/login`;
    };

    return (
        <Container>
            <Title>Login with Discord</Title>
            <form onSubmit={handleSubmit}>
                <Button type="submit">Login</Button>
            </form>
        </Container>
    );
};

export default LoginPage;