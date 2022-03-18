import React, {useState} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import TrainWagonsList from "../admin/routesAndRuns/TrainWagonsList";

const TrainChooser = ({trains, selectedTrain, setSelectedTrain, wagonTypes}) => {

    const [expandedRows, setExpandedRows] = useState(null);

    return (
        <div>
            <h4>Available trains</h4>
            <DataTable value={trains}
                       responsiveLayout="scroll"
                       selectionMode="single"
                       selection={selectedTrain}
                       onSelectionChange={e => setSelectedTrain(e.value)}
                       expandedRows={expandedRows}
                       onRowToggle={e => setExpandedRows(e.data)}
                       rowExpansionTemplate={data => <TrainWagonsList
                           wagonTypes={wagonTypes}
                           wagons={data.wagons}
                       />}
                       scrollable
                       scrollHeight="400px"
            >
                <Column expander style={{width: '3em'}}/>
                <Column field="id" header="Train Id"/>
            </DataTable>
        </div>
    );
};

export default TrainChooser;