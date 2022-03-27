import React, {useContext, useEffect, useRef, useState} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {AppContext} from "../../../context";
import {OverlayPanel} from "primereact/overlaypanel";
import TrainRunsTable from "./TrainRunsTable";

const TrainsTable = ({trains}) => {

    const [expandedRows, setExpandedRows] = useState([]);
    const [wagons, setWagons] = useState([]);
    const [trainsRuns, setTrainsRuns] = useState([]);
    const [filteredRuns, setFilteredRuns] = useState([]);
    const op = useRef(null);
    const {serverUrl, token} = useContext(AppContext);

    useEffect(() => {
        const wagonsForTable = [];
        trains.forEach(train => {
            train.wagons.forEach(wagon => {
                wagonsForTable.push({
                    trainId: train.id,
                    wagon: wagon
                });
            });
        });
        setWagons(wagonsForTable);
    }, [trains]);

    const headerTemplate = (data) => {
        return (
            <React.Fragment>
                <span className="mr-8">{`Train ${data.trainId}`}</span>
                {getTrainRunsButton(data)}
            </React.Fragment>
        )
    }

    const findTrainRuns = (data) => {
        if (trainsRuns.find(trainRuns => trainRuns.train === data.trainId) == null){
            fetch(`${serverUrl}/api/routes/run/trainschedule/${data.trainId}`,
                {headers: {"Authorization": token}})
                .then(response => response.json())
                .then(result => {
                    setTrainsRuns([...trainsRuns, {
                        train: data.trainId,
                        runs: result.serviceResult
                    }]);
                    setFilteredRuns(result.serviceResult);
                });
        }
        else{
            setFilteredRuns(trainsRuns.find(trainRuns => trainRuns.train === data.trainId).runs);
        }
    }

    const getTrainRunsButton = (data) => {
        return (
            <Button label="Train schedule"
                    onClick={(e) => {
                        findTrainRuns(data);
                        op.current.toggle(e);
                    }}
                    aria-haspopup
                    aria-controls="train_schedule"
            />
        )
    }

    return (
        <div>
            <DataTable value={wagons}
                       rowGroupMode="subheader"
                       groupRowsBy="trainId"
                       sortMode="single"
                       sortField="trainId"
                       sortOrder={1}
                       responsiveLayout="scroll"
                       expandableRowGroups
                       expandedRows={expandedRows}
                       onRowToggle={e => setExpandedRows(e.data)}
                       rowGroupHeaderTemplate={headerTemplate}
            >
                <Column field="wagon.id" header="Id"/>
                <Column field="wagon.wagonType.name" header="Wagon type" />
            </DataTable>

            <OverlayPanel ref={op}
                          id="train_schedule"
            >
                <TrainRunsTable runs={filteredRuns} />
            </OverlayPanel>
        </div>
    );
};

export default TrainsTable;