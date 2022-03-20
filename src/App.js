import React, {useState} from "react";
import {AppContext} from "./context";
import AdminPage from "./pages/AdminPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RunSearchPage from "./pages/RunSearchPage";
import OrderPage from "./pages/OrderPage";

function App() {

    const serverUrl = "http://localhost:8080/javaschool_railway-1.0-SNAPSHOT";
    const [runForOrder, setRunForOrder] = useState(null);

    return (
        <AppContext.Provider value={{
            serverUrl,
            runForOrder,
            setRunForOrder
        }}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/admin" element={<AdminPage/>}/>
                    <Route exact path="/order" element={<OrderPage/>}/>
                    <Route exact path="/" element={<RunSearchPage />}/>
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;
