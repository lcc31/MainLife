import React from 'react'
import './style.css'
import Logo from '../Logo'
import Navbar from '../Navbar'
import Card from '../Ui/Card'

const Hero = (props) => {
    return (
        <div>
            <Card>
                <div style={{ padding: '10px 0' }}>
                    <Logo />
                </div>
                <Navbar />
            </Card>
        </div >
    )
}

export default Hero