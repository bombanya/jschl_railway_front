import React from "react";
import {AppContext} from "./context";
import RunSearchPage from "./pages/RunSearchPage";

function App() {

    const serverUrl = "http://localhost:8080/javaschool_railway-1.0-SNAPSHOT";

    return (
        <AppContext.Provider value={{
            serverUrl
        }}>
            <div className="App">
                <RunSearchPage/>
            </div>
        </AppContext.Provider>
    );
}

export default App;
