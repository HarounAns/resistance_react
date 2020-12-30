import React, { Component } from 'react'
import { BsXCircle, BsCheckCircle } from "react-icons/bs";

export default class SFCardFront extends Component {
    createFront = () => {
        const { missionVote } = this.props;

        if (missionVote === 'S') {
            return (
                <div className='front'>
                    <div style={{ backgroundColor: 'rgb(38, 60, 100)' }}>SUCCESS</div>
                    <span style={{ fontSize: '10vw', fontWeight: 'bold', color: 'rgb(38, 60, 100)' }}>
                        <BsCheckCircle />
                    </span>
                </div>
            )
        }

        return (
            <div className='front'>
                <div style={{ backgroundColor: '#B22222' }}>FAIL</div>
                <span style={{ fontSize: '10vw', fontWeight: 'bold', color: '#B22222' }}>
                    <BsXCircle />
                </span>
            </div>
        )
    }
    
    render() {
        return (
            <div>
                {this.createFront()}
            </div>
        )
    }
}
