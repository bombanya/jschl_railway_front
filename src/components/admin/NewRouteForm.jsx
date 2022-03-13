import React, {useState} from 'react';
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import StationChooser from "../searching/StationChooser";
import {InputNumber} from "primereact/inputnumber";

const NewRouteForm = () => {

    const [rootStations, setRootStations] = useState([]);
    let [serialNumber, setSerialNumber] = useState(0);

    const incrementSerial = () => {
        const res = serialNumber;
        setSerialNumber(res + 1);
        return res;
    }

    const decrementSerial = () => {
        setSerialNumber(serialNumber - 1);
    }

    console.log(serialNumber);

    const leftToolbarTemplate = () => {
      return (
          <React.Fragment>
              <Button label="New station"
                      icon="pi pi-plus"
                      className="p-button-success mr-2"
                      onClick={() => {
                          setRootStations([...rootStations,
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
                          if (rootStations.length > 0){
                              const updatedRootStations = [...rootStations];
                              updatedRootStations.pop();
                              setRootStations(updatedRootStations);
                              decrementSerial();
                          }
                      }}
              />
              <Button label="Test" onClick={() => console.log(rootStations)}
              />
          </React.Fragment>
      )
    }

    const createStationChooser = (data) => {
        return (
            <StationChooser selectedStation={data.station}
                            setSelectedStation={station => {
                                const updatedRootStations = [...rootStations];
                                updatedRootStations[data.serialNumberOnTheRoute].station = station;
                                setRootStations(updatedRootStations);
                            }}
                            invalid={data.invalid}
                            placeholder="Station"
                            setInvalid={invalid => {
                                const updatedRootStations = [...rootStations];
                                updatedRootStations[data.serialNumberOnTheRoute].invalid = invalid;
                                setRootStations(updatedRootStations);
                            }}
            />
        )
    }

    const numbersEditor = (options) => {
        return <InputNumber min={0}
                            value={options.rowData[options.field]}
                            onValueChange={e => {
                                const updatedRootStations = [...rootStations];
                                updatedRootStations[options.rowData.serialNumberOnTheRoute][options.field]
                                    = e.value;
                                setRootStations(updatedRootStations);
                            }}
        />
    }

    return (
        <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate}/>

            <DataTable value={rootStations}
                       responsiveLayout="scroll"
                       dataKey="serialNumberOnTheRoute"
                       editMode="cell"

            >
                <Column field="serialNumberOnTheRoute" header="Serial number"/>
                <Column field="station" header="Station" body={createStationChooser}/>
                <Column field="stagePrice" header="Stage price" editor={options => numbersEditor(options)} />
                <Column field="stageDistance" header="Stage distance" editor={options => numbersEditor(options)} />
                <Column field="stageDeparture" header="Stage departure" editor={options => numbersEditor(options)} />
                <Column field="stageArrival" header="Stage arrival" editor={options => numbersEditor(options)} />

            </DataTable>
        </div>
    );
};

export default NewRouteForm;