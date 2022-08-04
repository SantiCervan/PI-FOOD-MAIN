import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetails } from '../redux/actions'
import { useParams, Link } from 'react-router-dom'
import s from './styles/RecipeDetails.module.css'
import Navbar from './Navbar';

const RecipeDetails = () => {
    const dispatch = useDispatch()
    const details = useSelector(state => state.details)
    const { id } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [dispatch])

    useEffect(() => {
        if (typeof id === 'number') {
            dispatch(getRecipeDetails(parseInt(id))).then(() => {
                setLoading(false)
            })
        } else {
            dispatch(getRecipeDetails(id)).then(() => {
                setLoading(false)
            })
        }
    }, [dispatch, id])


    return (
        <div className={s.padre}>
            <Navbar />
            <div className={s.container}>
                {loading ? (<div className={s.containerl}><p className={s.loading}>Loading...</p></div>) : (
                    <div className={s.border}>
                        <div className={s.buttoncontainer}>
                            <Link to={'/recipes'}>
                                <button className={s.button}>X</button>
                            </Link>
                        </div>
                        <div className={s.container2}>
                            <img src={details.image} alt='recipe' className={s.image} />
                            <div className={s.container3}>
                                <h1 className={s.title}>{details.title}</h1>
                                <div className={s.healthScore}>
                                    <h3 className={s.title}>Health Score:</h3>
                                    <p>{details.healthScore}</p>
                                </div>
                                <h3 className={s.title}>Dish Types:</h3>
                                {typeof details.dishTypes === 'string' ? <li>{details.dishTypes}</li> : details.dishTypes && details.dishTypes.map((e, i) => { return <li key={i}>{e},</li> })}
                                <h3 className={s.title}>Diet Types:</h3>
                                {details.diets && details.diets.map((e, i) => { return <li key={i}>{e},</li> })}
                            </div>
                        </div>
                        <h3 className={s.title2}>Summary:</h3>
                        {details.summary && <p className={s.p}>{details.summary.replace(/<\/?[^>]+(>|$)/g, ' ')}</p>}
                        <h3 className={s.title2}>Instructions:</h3>
                        {details.instructions && <p className={s.p}>{details.instructions.replace(/<\/?[^>]+(>|$)/g, ' ')}</p>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecipeDetails
