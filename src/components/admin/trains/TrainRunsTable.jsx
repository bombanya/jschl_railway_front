import React from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const TrainRunsTable = ({runs}) => {
    return (
        <div>
            <h4>Train schedule</h4>
            <DataTable value={runs}
                       responsiveLayout="scroll"
            >
                <Column field="runId" header="Run Id"/>
                <Column field="startStation.name" header="Start station"/>
                <Column field="finishStation.name" header="Finish station"/>
                <Column field="startTime" header="Start time (UTC)"
                        body={data => new Date(data.startTime * 1000).toUTCString()}/>
                <Column field="finishTime" header="Finish time (UTC)"
                        body={data => new Date(data.finishTime * 1000).toUTCString()}/>
            </DataTable>
        </div>
    );
};

export default TrainRunsTable;