import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001'

export function getAllRecipes() {
    return async function (dispatch) {
        const recipe = await axios.get('/recipes')
        recipe.data = recipe.data.map(r => {
            if (r.id.toString().includes("-")) {
                r.diets = r.diets.map((d) => {
                    return d.name;
                });
            }
            return r
        })
        return dispatch({
            type: 'GET_ALL_RECIPES',
            payload: recipe.data
        })
    }
}

export function getRecipesByName(title) {
    return async function (dispatch) {
        const recipe = await axios.get(`/recipes?title=${title}`)
        if (recipe.data === "The required recipe doesn't exist.") {
            return alert("The required recipe doesn't exist.")
        } else {
            recipe.data = recipe.data.map(r => {
                if (r.id.toString().includes("-")) {
                    r.diets = r.diets.map((d) => {
                        return d.name;
                    });
                }
                return r
            })
        }
        return dispatch({
            type: 'GET_RECIPES_BY_NAME',
            payload: recipe.data
        })
    }
}

export function getRecipeDetails(payload) {
    return async function (dispatch) {
        const { data } = await axios.get(`/recipes/${payload}`)
        if (data.id.toString().includes("-")) {
            data.diets = data.diets.map((d) => {
                return d.name;
            })
        }
        return dispatch({
            type: 'GET_RECIPE_DETAILS',
            payload: data
        })
    }
}

export function getAllDiets() {
    return async function (dispatch) {
        let json = await axios.get('/diets');
        return dispatch({
            type: 'GET_ALL_DIETS',
            payload: json.data
        })
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByScore(payload) {
    return {
        type: 'ORDER_BY_SCORE',
        payload
    }
}

export function filterByDiet(payload) {
    return {
        type: 'FILTER_BY_DIET',
        payload
    }
}

export function clearDetails() {
    return {
        type: 'CLEAR_DETAILS',
    }
}



export function postRecipe(payload) {
    return async function () {
        let json = await axios.post('/recipes', payload)
        return json
    }
}

