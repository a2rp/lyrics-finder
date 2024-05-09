import React from "react";
import LyricsFinder from "./lyricsFinder/LyricsFinder";
import { ToastContainer } from "react-toastify";

const App = () => {
    return (
        <div>
            <LyricsFinder />

            <ToastContainer />
        </div>
    )
}

export default App

