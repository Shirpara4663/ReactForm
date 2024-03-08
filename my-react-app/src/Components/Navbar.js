import React from "react";

export default function Navbar() {
    return (
        <header className="top-0 z-10">
        <div className="container d-flex justify-content-center align-items-center">
        <div >
            <img src="./logo/rec.png" alt="logo" style={{ position: 'absolute', top: '0', left: '0' }} />
            <img src="./logo/logo.png" alt="logo" style={{ position: 'absolute', top: '12px', left: '166px' }} />
        </div>
        </div>
        </header>
    );
}
