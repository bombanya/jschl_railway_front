import React from "react";
import {AppContext} from "./context";
import AdminPage from "./pages/AdminPage";

function App() {

    const serverUrl = "http://localhost:8080/javaschool_railway-1.0-SNAPSHOT";

    return (
        <AppContext.Provider value={{
            serverUrl
        }}>
            <div className="App">
                <AdminPage />
            </div>
        </AppContext.Provider>
    );
}

export default App;
