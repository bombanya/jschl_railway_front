import React, {useState} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {ToggleButton} from "primereact/togglebutton";

const SeatsTable = ({seats}) => {

    const [expandedRows, setExpandedRows] = useState([]);

    const headerTemplate = (data) => {
        return (
            <React.Fragment>
                <span>{`${data.wagonType.name} \| Toilets: ${data.wagonType.toilets}`}</span>
            </React.Fragment>
        )
    }

    const getToggleForSeat = (data, column) => {
        return (
            <ToggleButton checked={data[column]}
                          onIcon="pi pi-check"
                          offIcon="pi pi-times"

            />
        )
    }

    return (
        <div>
            <DataTable value={seats}
                       rowGroupMode="subheader"
                       groupRowsBy="wagonType.id"
                       sortMode="single"
                       sortOrder={1}
                       responsiveLayout="scroll"
                       expandableRowGroups
                       expandedRows={expandedRows}
                       onRowToggle={e => setExpandedRows(e.data)}
                       rowGroupHeaderTemplate={headerTemplate}
            >
                <Column field="id" header="Seat id"/>
                <Column field="insideWagonId" header="Inside wagon id"/>
                <Column field="seatClass" header="Seat class"/>
                <Column field="powerSocket" header="Power socket"
                        body={data => getToggleForSeat(data, "powerSocket")}/>
                <Column field="lying" header="Lying"
                        body={data => getToggleForSeat(data, "lying")}/>
                <Column field="upper" header="Upper"
                        body={data => getToggleForSeat(data, "upper")}/>
                <Column field="nextToTable" header="Next to table"
                        body={data => getToggleForSeat(data, "nextToTable")}/>
            </DataTable>
        </div>
    );
};

export default SeatsTable;