import React, { Component } from 'react';
import { BsBootstrapReboot } from "react-icons/bs";

export default class SFCardBack extends Component {
    render() {
        return (
            <div className='back'>
                <div style={{ marginTop: '2.5vh' }}></div>
                <span style={{ fontSize: '10vw', fontWeight: 'bold' }}>
                    <BsBootstrapReboot />
                </span>
            </div>
        )
    }
}
