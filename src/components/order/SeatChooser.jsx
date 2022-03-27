import React, {useState} from 'react';
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {ToggleButton} from "primereact/togglebutton";

const SeatChooser = ({tickets, selectedTickets, setSelectedTickets, maxNumberOfTickets}) => {

    const [expandedRows, setExpandedRows] = useState([]);

    const getToggleForSeat = (data, column) => {
        return (
            <ToggleButton checked={data.seat[column]}
                          onIcon="pi pi-check"
                          offIcon="pi pi-times"
            />
        )
    }

    const headerTemplate = (data) => {
        return (
            <React.Fragment>
              <span className="ml-3">
                  {`Wagon: ${data.wagon.id}-${data.wagon.wagonType.name} | Toilets: ${data.wagon.wagonType.toilets}`}
              </span>
            </React.Fragment>
        )
    }

    return (
        <DataTable value={tickets}
                   selection={selectedTickets}
                   onSelectionChange={e => {
                       if (selectedTickets == null){
                           setSelectedTickets(e.value);
                       }
                       else{
                           if (e.value.length > selectedTickets.length
                               && e.value.length <= maxNumberOfTickets){
                               setSelectedTickets(e.value);
                           }
                           else if (e.value.length < selectedTickets.length){
                               setSelectedTickets(e.value);
                           }
                       }
                   }}
                   responsiveLayout="scroll"
                   rowGroupMode="subheader"
                   groupRowsBy="wagon.id"
                   sortMode="single"
                   sortField="wagon.id"
                   sortOrder={1}
                   expandableRowGroups
                   expandedRows={expandedRows}
                   onRowToggle={e => setExpandedRows(e.data)}
                   rowGroupHeaderTemplate={headerTemplate}
        >
            <Column selectionMode="multiple"/>
            <Column field="seat.insideWagonId" header="Inside wagon id"/>
            <Column field="seat.seatClass" header="Seat class"/>
            <Column field="seat.lying" header="Lying"
                    body={data => getToggleForSeat(data, "lying")}/>
            <Column field="seat.nextToTable" header="Next to table"
                    body={data => getToggleForSeat(data, "nextToTable")}/>
            <Column field="seat.powerSocket" header="Power socket"
                    body={data => getToggleForSeat(data, "powerSocket")}/>
            <Column field="seat.upper" header="Upper"
                    body={data => getToggleForSeat(data, "upper")}/>
            <Column field="price" header="Price"/>
        </DataTable>
    );
};

export default SeatChooser;