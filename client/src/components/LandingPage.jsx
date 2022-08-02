import React from 'react'
import { Link } from "react-router-dom";
import s from './styles/LandingPage.module.css'

const LandingPage = () => {
    return (
        <div className={s.principal}>
            <Link to={'/recipes'}>
                <div className={s.container}>
                    <h1 className={s.title}>Welcome to the Henry food app!</h1>
                    <h2 className={s.by}>Developed by: Santiago Cervan</h2>
                    <p className={s.click}>Click here to start!</p>
                </div>
            </Link>
        </div>
    )
}

export default LandingPage


