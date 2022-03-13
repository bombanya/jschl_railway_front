import React from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const RunsTable = ({runs}) => {
    return (
        <div>
            <h4>Route runs list</h4>
            <DataTable value={runs}
                       responsiveLayout="scroll"
            >
                <Column field="id" header="Run id"/>
                <Column field="startUtc" header="Start time (UTC)" body={data =>
                    (new Date(data.startUtc * 1000)).toUTCString()}/>
                <Column field="finishUtc" header="Finish time (UTC)" body={data =>
                    (new Date(data.finishUtc * 1000)).toUTCString()}/>
            </DataTable>
        </div>
    );
};

export default RunsTable;