import React from 'react';
import RunInfo from "./RunInfo";
import {ProgressSpinner} from "primereact/progressspinner";

const RunsList = ({runs, loading, emptyList}) => {
    return (
        <div className="grid">
            <div className="col-12 flex justify-content-center">
                {loading && <ProgressSpinner/>}
                {emptyList && <h2>No tickets found</h2>}
            </div>

            {runs.map(run =>
                <div key={run.runId} className="col-12">
                    <RunInfo run={run}
                    />
                </div>)
            }
        </div>
    );
};

export default RunsList;