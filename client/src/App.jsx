import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Chart from './Chart';
import Navbar from './Navbar';
import Portfolio from './Portfolio';
import config from './config.json';

const Container = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const Content = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const Loading = styled.h1`
  text-align: center;
  color: #007bff;
`;

const PortfolioItem = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #e9ecef;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PortfolioLabel = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const PortfolioValue = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
`;

const App = () => {
    const [isFetchingPortfolio, setIsFetchingPortfolio] = useState(true);
    const [portfolio, setPortfolio] = useState(null);
    const [isFetchingUser, setIsFetchingUser] = useState(true);
    const [user, setUser] = useState(null);
    const [firstLoad, setFirstLoad] = useState(false);

    const fetchUser = async () => {
        setIsFetchingUser(true);
        await axios.get(`${config.BACKEND_URL}/user`, { withCredentials: true })
            .then(data => {
                setUser(data.data);
                setIsFetchingUser(false);
            }).catch(err => {
                console.log(err);
            });
    };

    const fetchPortfolio = async () => {
        setIsFetchingPortfolio(true);
        await axios.get(`${config.BACKEND_URL}/portfolio/webview`, { withCredentials: true })
            .then(data => {
                setPortfolio(data.data);
                setIsFetchingPortfolio(false);
                setFirstLoad(true);
            }).catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchUser();
        fetchPortfolio();
        const comInterval = setInterval(fetchPortfolio, 20000)
        return () => clearInterval(comInterval)
    }, []);

    return (
        <Container>
            {(isFetchingUser )? (
                <Loading>Loading User Info...</Loading>
            ) : (
                <Navbar username={user.username} avatarUrl={user.avatarUrl} onLogout={() =>  window.location.href = "/login"} />
            )}
            {(isFetchingPortfolio && !firstLoad ) ? (
                <Loading>Loading Portfolio...</Loading>
            ) : (
                <Content>
                    <PortfolioItem>
                        <PortfolioLabel>Current Cash:</PortfolioLabel>
                        <PortfolioValue>${portfolio.portfolio.cash}</PortfolioValue>
                    </PortfolioItem>
                    <PortfolioItem>
                        <PortfolioLabel>Portfolio Value:</PortfolioLabel>
                        <PortfolioValue>${portfolio.portfolio.portfolioValue}</PortfolioValue>
                    </PortfolioItem>
                    <PortfolioItem>
                        <PortfolioLabel>Change:</PortfolioLabel>
                        <PortfolioValue>${portfolio.portfolio.change}</PortfolioValue>
                    </PortfolioItem>
                </Content>
            )}
            {
            (!isFetchingPortfolio || firstLoad) && (
                    <Portfolio portfolio={portfolio} />
                )
            }
            <Chart />

        </Container>
    );
}

export default App;