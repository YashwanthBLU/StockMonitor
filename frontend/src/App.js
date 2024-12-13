import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onmessage = (event) => {
      const updatedStocks = JSON.parse(event.data);
      setStocks(updatedStocks);
    };
    return () => socket.close();
  }, []);
  return (
    <div className="App">
      <h1>Real-Time Stock Prices</h1>
      <table>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.name}>
              <td>{stock.name}</td>
              <td>{stock.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
