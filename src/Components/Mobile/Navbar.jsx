import React, { Component } from 'react';
import { BsFillHouseDoorFill, BsFillAspectRatioFill } from "react-icons/bs";
import { screens } from "./Screens";
import { MobileContext } from './MobileContext';


class Navbar extends Component {
    static contextType = MobileContext;

    render() {
        const { setScreen, screen } = this.context;

        return (
            <nav className="bottom-nav">
                <div style={{ display: "flex" }}>
                    {/* a little unintuitive but the gray color is for making the btn look inactive */}
                    <div className="navbtn" style={{ width: "20vw", color: screen !== screens.home && 'gray' }} onClick={() => setScreen(screens.home)}>
                        <BsFillHouseDoorFill size={25} />
                    </div>
                    <div className="navbtn" style={{ width: "20vw", color: screen !== screens.board && 'gray' }} onClick={() => setScreen(screens.board)}>
                        <BsFillAspectRatioFill size={25} />
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;