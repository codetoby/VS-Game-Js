import React from 'react'
import styled from 'styled-components'

const TableContainer = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
`;

const StyledTable = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  font-size: 0.9rem;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 1rem;
    text-align: left;
  }

  thead {
    background-color: #7289da;
    color: white;

    th {
      border-bottom: 2px solid #dee2e6;
      font-size: 1rem;
    }
  }

  tbody {
    tr:nth-child(odd) {
      background-color: #e9ecef;
    }

    tr:hover {
      background-color: #dee2e6;
      transition: background-color 0.3s ease;
    }

    td {
      border-bottom: 1px solid #dee2e6;
      font-size: 0.9rem;
    }

    td:first-child, th:first-child {
      border-left: 1px solid #dee2e6;
    }

    td:last-child, th:last-child {
      border-right: 1px solid #dee2e6;
    }
  }
`;

export default function Portfolio({ portfolio}) {
    return (
        <TableContainer>
            <StyledTable className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ticker</th>
                        <th scope="col">Current Price $</th>
                        <th scope="col">Change $</th>
                        <th scope="col">Change %</th>
                        <th scope="col">Prev Day Close</th>
                        <th scope="col">Buy Date</th>
                        <th scope="col">Shares</th>
                        <th scope="col">Buy Price $</th>
                        <th scope="col">Total Spend $</th>
                        <th scope="col">P/L</th>
                        <th scope="col">Change $</th>
                        <th scope="col">Change %</th>
                    </tr>
                </thead>
                <tbody>
                    
                    { portfolio.stocks.length > 0 ? portfolio.stocks.map((stock, index) => (
                        <tr key={stock.ticker.toUpperCase()}>
                            <th scope="row">{index + 1}</th>
                            <td>{stock.ticker.toUpperCase()}</td>
                            <td>{stock.data.c}</td>
                            <td>{stock.data.d}</td>
                            <td>{stock.data.dp}</td>
                            <td>{stock.data.pc}</td>
                            <td>{new Date(stock.timestamp).toLocaleDateString()}</td>
                            <td>{stock.shares}</td>
                            <td>{stock.price}</td>
                            <td>{(stock.price * stock.shares)}</td>
                            <td>{stock.profit.profit}</td>
                            <td>{stock.profit.profit}</td>
                            <td>{stock.profit.percentage}</td>
                        </tr>
                    )) :
                    <tr>
                        <td colSpan="14">You do not own any stocks.</td>
                    </tr>
                }
                </tbody>
            </StyledTable>
        </TableContainer>
    )
}
