import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:3001";
axios.defaults.baseURL = API_URL;

interface IChargePoint {
  id?: string;
  serialNumber: string;
}

function App() {
  const [chargePoints, setChargePoints] = useState<IChargePoint[]>([]);
  const [serialNumber, setSerialNumber] = useState<string>("");

  useEffect(() => {
    axios.get("charge-point").then((response) => {
      setChargePoints(response.data);
    });
  }, []);

  const createChargePoint = (serialNumber: string) => {
    axios.post<IChargePoint>("charge-point", { serialNumber }).then((response) => {
      setChargePoints(chargePoints.concat([response.data]));
      setSerialNumber("");
    });
  };

  const deleteChargePoint = (id: string) => {
    axios.delete<IChargePoint>(`charge-point/${id}`).then(() => {
      setChargePoints(chargePoints.filter((chargePoint) => chargePoint.id !== id));
    });
  };

  return (
    <div className="App">
      <div className="banner">
        <img
          src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='108' height='33' viewBox='0 0 108 33'%3e %3cg fill='%23FFF' fill-rule='nonzero'%3e %3cpath d='M64.649 26.913c-5.415.018-9.263-3.974-9.773-9.823 0 0-.067-1.161-.03-2.293.037-1.177.22-2.081.22-2.081.909-5.177 4.038-7.896 8.9-7.911 5.105-.016 8.316 3.114 8.7 7.857l-10.053.031c-2.413.007-4.364 1.971-4.356 4.386l20.328-.063c.06-.556.119-1.541.116-2.342C78.676 6.79 73.548-.03 63.95 0c-9.537.03-14.93 7.192-14.903 15.876.027 8.623 6.019 16.18 15.618 16.15 7.63-.024 13.215-4.23 14.304-10.638l-5.97.019c-.85 3.513-3.797 5.492-8.35 5.506zM101.379.436l-8.094 23.508-7.058-20.241C85.556 1.778 83.74.492 81.704.498l-3.09.01L90.07 31.452l6.248-.019L107.52.417l-6.14.02zm-69.525 26.58c-5.414.017-9.262-3.975-9.773-9.824 0 0-.066-1.161-.03-2.293.038-1.177.221-2.08.221-2.08.909-5.177 4.038-7.897 8.899-7.911 5.106-.016 8.316 3.114 8.7 7.856l-10.053.031c-2.413.008-4.363 1.971-4.355 4.387l20.328-.063c.06-.556.118-1.541.116-2.342C45.883 6.893 40.755.073 31.156.103c-9.538.03-14.93 7.191-14.903 15.875.027 8.623 6.02 16.18 15.618 16.15 7.63-.024 13.216-4.23 14.303-10.638l-5.968.019c-.851 3.513-3.797 5.493-8.352 5.506zM17.78 1.315l-.002-.678-3.566.011c-4.369.014-6.823 1.869-8.226 6L5.967.674 0 .694l.096 31.04 5.968-.017-.044-14.043c-.021-6.776 1.77-10.457 7.472-11.85 2.41-.588 4.296-2.025 4.288-4.509z' transform='translate(-134 -49) translate(134 49)'/%3e %3c/g%3e %3c/svg%3e"
          alt=""
        />
      </div>

      <h1 className="title">Charge Point Installation Form</h1>
      <div className="container">
        <div className="container-title">
          <label htmlFor="input-serial-number">Serial Number: </label>
          <div>
            <input value={serialNumber} onChange={(event) => setSerialNumber(event.target.value)} name="input-serial-number" type="text" />
            <button className="addButton" onClick={() => createChargePoint(serialNumber)}>
              Add
            </button>
          </div>
        </div>

        <ul className="list">
          {chargePoints.map((chargePoint) => {
            return (
              <li key={chargePoint.id}>
                <div className="list-text">{chargePoint.serialNumber}</div>

                <button className="list-button" onClick={() => deleteChargePoint(chargePoint.id!)}>
                  X
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
