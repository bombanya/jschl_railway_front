import React, {useContext, useState} from 'react';
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import StationChooser from "../searching/StationChooser";
import {InputNumber} from "primereact/inputnumber";
import {AppContext} from "../../context";

const NewRouteForm = ({fetchRoute}) => {

    const {serverUrl} = useContext(AppContext);
    const [routeStations, setRouteStations] = useState([]);
    let [serialNumber, setSerialNumber] = useState(0);
    const [invalid, setInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const incrementSerial = () => {
        const res = serialNumber;
        setSerialNumber(res + 1);
        return res;
    }

    const decrementSerial = () => {
        setSerialNumber(serialNumber - 1);
    }

    const createNewRoute = () => {
        setInvalid(false);
        if (routeStations.length < 2) {
            setInvalid(true);
            setErrorMessage("The route must consist of at least two stations");
            return;
        }
        let flag = true;
        routeStations.forEach(station => {
            if (station.station == null){
                const updatedRootStations = [...routeStations];
                updatedRootStations[station.serialNumberOnTheRoute].invalid = true;
                setRouteStations(updatedRootStations);
                flag = false;
            }
        });
        if (flag) {
            fetch(`${serverUrl}/api/routes/route/new`, {
                method: 'POST'
            })
                .then(response => response.json())
                .then(data => {
                    const stationsForRequest = [];
                    routeStations.forEach(station => {
                        stationsForRequest.push({
                            "route": {
                                "id": data.serviceResult.id
                            },
                            "station": {
                                "id": station.station.id
                            },
                            "serialNumberOnTheRoute": station.serialNumberOnTheRoute,
                            "stagePrice": station.stagePrice,
                            "stageDistance": station.stageDistance,
                            "stageDeparture": station.stageDeparture,
                            "stageArrival": station.stageArrival
                        });
                    });
                    fetch(`${serverUrl}/api/routes/routestation/new/list`, {
                        method: "POST",
                        body: JSON.stringify(stationsForRequest),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(fetchRoute(data.serviceResult.id));
                });
        }
    }

    
    const leftToolbarTemplate = () => {
      return (
          <React.Fragment>
              <Button label="New station"
                      icon="pi pi-plus"
                      className="p-button-success mr-2"
                      onClick={() => {
                          setInvalid(false);
                          setRouteStations([...routeStations,
                              {
                                  "station": null,
                                  "serialNumberOnTheRoute": incrementSerial(),
                                  "stagePrice": 0,
                                  "stageDistance": 0,
                                  "stageDeparture": 0,
                                  "stageArrival": 0,
                                  "invalid": false
                              }])
                      }}
              />
              <Button label="Remove last station"
                      icon="pi pi-trash"
                      className="p-button-danger mr-2"
                      onClick={() => {
                          if (routeStations.length > 0){
                              const updatedRootStations = [...routeStations];
                              updatedRootStations.pop();
                              setRouteStations(updatedRootStations);
                              decrementSerial();
                          }
                      }}
              />
          </React.Fragment>
      )
    }

    const rightToolbarTemplate = () => {
      return (
          <React.Fragment>
              <div>
                  <div>
                      <Button label="Create new route"
                              icon="pi pi-check"
                              className={invalid ? "p-button-success mr-2 p-invalid" : "p-button-success mr-2"}
                              onClick={createNewRoute}
                      />
                  </div>
                  <div>
                      {invalid && <small className="p-error">{errorMessage}</small>}
                  </div>
              </div>

          </React.Fragment>
      )
    }

    const createStationChooser = (data) => {
        return (
            <StationChooser selectedStation={data.station}
                            setSelectedStation={station => {
                                const updatedRootStations = [...routeStations];
                                updatedRootStations[data.serialNumberOnTheRoute].station = station;
                                setRouteStations(updatedRootStations);
                            }}
                            invalid={data.invalid}
                            placeholder="Station"
                            setInvalid={invalid => {
                                const updatedRootStations = [...routeStations];
                                updatedRootStations[data.serialNumberOnTheRoute].invalid = invalid;
                                setRouteStations(updatedRootStations);
                            }}
            />
        )
    }

    const numbersEditor = (options) => {
        return <InputNumber min={0}
                            value={options.rowData[options.field]}
                            onValueChange={e => {
                                const updatedRootStations = [...routeStations];
                                updatedRootStations[options.rowData.serialNumberOnTheRoute][options.field]
                                    = e.value;
                                setRouteStations(updatedRootStations);
                            }}
        />
    }

    return (
        <div className="card">
            <Toolbar className="mb-4"
                     left={leftToolbarTemplate}
                     right={rightToolbarTemplate}
            />

            <DataTable value={routeStations}
                       responsiveLayout="scroll"
                       dataKey="serialNumberOnTheRoute"
                       editMode="cell"

            >
                <Column field="serialNumberOnTheRoute" header="Serial number"/>
                <Column field="station" header="Station" body={createStationChooser}/>
                <Column field="stagePrice" header="Stage price" editor={options => numbersEditor(options)} />
                <Column field="stageDistance" header="Stage distance" editor={options => numbersEditor(options)} />
                <Column field="stageArrival" header="Stage arrival" editor={options => numbersEditor(options)} />
                <Column field="stageDeparture" header="Stage departure" editor={options => numbersEditor(options)} />

            </DataTable>
        </div>
    );
};

export default NewRouteForm;