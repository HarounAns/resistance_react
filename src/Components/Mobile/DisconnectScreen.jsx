import React, { Component } from 'react'

export default class DisconnectScreen extends Component {
    render() {
        return (
            <div className='centered'>
                <div style={{marginTop: '40vh' }}>
                    YOU HAVE BEEN DISCONNECTED
                </div>
                <button style={{ width: '50vw', marginTop: '5vh' }} className="button6" onClick={() => window.location.reload()}>RELOAD</button>
            </div>
        )
    }
}
