import React, { useState } from 'react'
import { getRecipesByName } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import s from './styles/Navbar.module.css'
import image from '../images/icons8-home-96.png'
import create from '../images/icons8-create-64.png'
import linkedin from '../images/icons8-linkedin-rodeado-de-círculo-90.png'
import github from '../images/icons8-github-90.png'


const Navbar = () => {
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getRecipesByName(name))

    }
    return (
        <div className={s.nav}>
            <div className={s.container}>
                <Link to={'/recipes'}>
                    <div className={s.home}>
                        <img className={s.icon} src={image} alt="Home"></img>
                        <button className={s.button}>HENRY FOOD APP</button>
                    </div>
                </Link>
                <div className={s.search}>
                    <input className={s.input} onChange={(e) => handleInputChange(e)}
                        placeholder='Search recipe or diet type:'
                        type='text'
                        name='title'
                        autoComplete='off'
                    ></input>
                    <button className={s.submit} type='submit' onClick={(e) => handleSubmit(e)}>SEARCH</button>
                </div>
                <Link to={'/createRecipe'}>
                    <div className={s.create}>
                        <img className={s.icon2} src={create} alt="Home"></img>
                        <button className={s.button}>CREATE YOUR OWN RECIPE</button>
                    </div>
                </Link>
                <div>
                    <a href='https://www.linkedin.com/in/santicervan/' target='_blank'>
                        <img className={s.icon} src={linkedin} />
                    </a>
                    <a href="https://github.com/SantiCervan" target='_blank'>
                        <img className={s.icon} src={github} />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Navbar
