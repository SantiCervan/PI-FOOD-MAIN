import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, filterByDiet, orderByName, orderByScore, getAllDiets } from '../redux/actions';
import Navbar from "../components/Navbar";
import Paginated from './Paginated';
import s from './styles/Home.module.css'

const Home = () => {

    const dispatch = useDispatch()
    const [santi, setSanti] = useState(true)
    const diets = useSelector(state => state.diets);
    const recipes = useSelector((state) => state.recipes)

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const lastRecipe = currentPage * recipesPerPage;
    const firstRecipe = lastRecipe - recipesPerPage;
    const pagedRecipes = recipes.slice(firstRecipe, lastReciple);

    const paginate = (number) => {
        setCurrentPage(number)
    };

    useEffect(() => {
        dispatch(getAllRecipes())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllDiets())
    }, [dispatch])

    const handleOrderByName = (e) => {
        e.preventDefault()
        if (e.target.value === 'A-Z' || e.target.value === 'Z-A') {
            dispatch(orderByName(e.target.value))
            santi ? setSanti(false) : setSanti(true)
        }
        if (e.target.value === 'HealthScore Higher' || e.target.value === 'HealthScore Lower') {
            dispatch(orderByScore(e.target.value))
            santi ? setSanti(false) : setSanti(true)
        }
        setCurrentPage(1)
    }

    const handleOrderByDiet = (e) => {
        dispatch(filterByDiet(e.target.value))
        setCurrentPage(1)
    }

    return (
        <div className={s.container}>
            <Navbar />
            <div className={s.container2}>
                <div className={s.border}>
                    <div className={s.filters}>
                        <div className={s.orderby}>
                            <p className={s.p}>Order by:</p>
                            <select className={s.input} onChange={e => handleOrderByName(e)} defaultValue='default'>
                                <option value='default'>Select one</option>
                                <option value='A-Z' >A-Z</option>
                                <option value='Z-A' >Z-A</option>
                                <option value='HealthScore Higher' >HealthScore Higher</option>
                                <option value='HealthScore Lower' >HealthScore Lower</option>
                            </select>
                        </div>
                        <div className={s.orderby}>
                            <p className={s.p}>Filter by:</p>
                            <select className={s.input} onChange={e => handleOrderByDiet(e)} defaultValue='default'>
                                <option value="default" >All diets</option>
                                {
                                    diets && diets?.map((d, i) => (
                                        <option value={d.name} key={i}>{d.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <button className={s.button} onClick={() => { dispatch(getAllRecipes()); setCurrentPage(1) }}>Clear</button>
                    </div>
                </div>
                <div className={s.border2}>
                    {
                        pagedRecipes && pagedRecipes?.map((el) => {
                            return (
                                <Link className={s.card} to={`/recipes/${el.id}`} key={el.id}>
                                    <h2 className={s.title}>{el.title}</h2>
                                    <img src={el.image} alt='recipe' className={s.image} />
                                    <div className={s.diets}>
                                        {el.diets?.map((el) => (
                                            <p className={s.list} key={el}>
                                                {el}
                                            </p>
                                        ))
                                        }
                                    </div>
                                </Link>
                            )
                        }
                        )
                    }
                </div>
            </div>
            <div className={s.paginated}>
                {
                    recipes.length > 0 && <Paginated recipesPerPage={recipesPerPage}
                        recipes={recipes?.length}
                        paginate={paginate}
                    />
                }
            </div>
        </div >
    )
}

export default Home
