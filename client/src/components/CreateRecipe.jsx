import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllDiets, postRecipe } from '../redux/actions';
import Navbar from './Navbar';
import s from './styles/CreateRecipe.module.css'

function validate(post) {
    let errors = {};
    if (!post.title) {
        errors.title = 'Enter a recipe name'
    }
    if (!post.image) {
        errors.image = 'Enter URL of some representative image'
    }
    if (!post.healthScore || post.healthScore < 0 || post.healthScore > 100) {
        errors.healthScore = 'Enter a value from 0 to 100'
    }
    if (!post.diets.length) {
        errors.diets = 'Choose at least one dish diet'
    }
    if (!post.summary) {
        errors.summary = 'Write a short summary'
    }
    if (!post.instructions) {
        errors.instructions = 'Write the instructions on how to cook the recipe'
    }
    return errors;
}

const CreateRecipe = () => {

    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getAllDiets())
    }, [dispatch])

    const [post, setPost] = useState({
        title: '',
        image: '',
        healthScore: 0,
        diets: [],
        summary: '',
        instructions: '',
    })

    function handleInputChange(e) {
        e.preventDefault();
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
        console.log(post)
        setErrors(validate({
            ...post,
            [e.target.name]: e.target.value
        }));
    }

    useEffect(() => { console.log(post) }, [post])

    function handleSubmit(e) {
        e.preventDefault();
        if (Object.values(errors).length > 0) alert('Please fill in all the fields')
        else {
            dispatch(postRecipe(post));
            window.history.back();
            alert('Recipe created successfully!')
        }
    }

    function handleSelectDiets(e) {
        if (!post.diets.includes(e.target.value))
            setPost({
                ...post,
                diets: [...post.diets, e.target.value]
            });
        setErrors(validate({
            ...post,
            diets: [...post.diets, e.target.value]
        }));
    }

    function handleDietDelete(diet) {
        setPost({
            ...post,
            diets: post.diets.filter(elemet => elemet !== diet)
        })
        setErrors(validate({
            ...post,
            diets: [...post.diets]
        }));
    }
    console.log(diets);
    return (
        <div>
            <Navbar></Navbar>
            <div className={s.container}>
                <div className={s.container2}>
                    <div className={s.titleContainer}>
                        <h1 className={s.title}>Create a recipe</h1>
                    </div>
                    <div className={s.container3}>
                        <div className={s.back}>
                            <Link to={'/recipes'}>
                                <button className={s.button2}>X</button>
                            </Link>
                        </div>
                        <form onSubmit={e => handleSubmit(e)}>
                            <div className={s.container4}>
                                <label>Name</label>
                                <input className={s.input} type="text" value={post.title} placeholder='Name your recipe' name='title' onChange={e => handleInputChange(e)} />
                                {errors.title && (
                                    <p className={s.errors}>{errors.title}</p>
                                )}
                            </div>
                            <div className={s.container4}>
                                <label>Image</label>
                                <input className={s.input} type="text" value={post.image} placeholder='Image URL' name='image' onChange={e => handleInputChange(e)} />
                                {errors.image && (
                                    <p className={s.errors}>{errors.image}</p>
                                )}
                            </div>
                            <div className={s.container4}>
                                <label>Summary</label>
                                <input className={s.input} type="text" value={post.summary} placeholder='Write a summary' name='summary' onChange={e => handleInputChange(e)} />
                                {errors.summary && (
                                    <p className={s.errors}>{errors.summary}</p>
                                )}
                            </div>
                            <div className={s.container4}>
                                <label>Instructions</label>
                                <input className={s.input} type='text' value={post.instructions} name='instructions' onChange={e => handleInputChange(e)} />
                                {errors.instructions && (
                                    <p className={s.errors}>{errors.instructions}</p>
                                )}
                            </div>
                            <div className={s.container4}>
                                <label>healthScore</label>
                                <input className={s.input} type="number" min="0" max='100' value={post.healthScore} name='healthScore' onChange={e => handleInputChange(e)} />
                                {errors.healthScore && (
                                    <p className={s.errors}>{errors.healthScore}</p>
                                )}
                            </div>
                            <div className={s.container4}>
                                <label>Pick diet types</label>
                                <select className={s.input2} onChange={e => handleSelectDiets(e)} defaultValue='default' >
                                    <option value='default' disabled>Pick diets</option>
                                    {diets && diets.map(d => (
                                        <option value={d.name} key={d.id}>{d.name}</option>
                                    ))}
                                </select>
                                {errors.diets && (
                                    <p className={s.errors}>{errors.diets}</p>
                                )}
                            </div>
                            <div className={s.diets}>
                                <label className={s.type}>Type of diet selected:</label>
                                {post.diets.map(d =>
                                    <div className={s.selected} key={d.id}>
                                        <p className={s.dietName}>{d}</p>
                                        <button className={s.button} onClick={() => handleDietDelete(d)}>X</button>
                                    </div>
                                )}
                                <button className={s.create} type='submit'>Create!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CreateRecipe