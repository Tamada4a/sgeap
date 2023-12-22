import React from "react";
import { Routes, Route } from "react-router-dom";
import MapPage from "../MapPage/MapPage";
import InformationPage from "../InformationPage/InformationPage";
import Cabinet from "../Cabinet/Cabinet";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function Main() {
    return (
        <main>
            <Routes>
                <Route exact path="/" element={<MapPage />} />
                <Route path="/info/" element={<InformationPage />} />
                <Route path="/cabinet/:id/" element={<Cabinet />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </main>
    );
}

export default Main;