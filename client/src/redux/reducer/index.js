const initialState = {
    recipes: [],
    recipesCopy: [],
    details: [],
    diets: [],
    page: 1,
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                recipesCopy: action.payload,
            }
        case 'GET_ALL_DIETS':
            return {
                ...state,
                diets: action.payload
            }
        case 'GET_RECIPES_BY_NAME':
            return {
                ...state,
                recipes: action.payload,
                recipesCopy: action.payload
            }
        case 'ORDER_BY_NAME':
            const recipeSorted = action.payload === 'A-Z' ?
                state.recipes.sort((a, b) => {
                    if (a.title > b.title) return 1;
                    if (a.title < b.title) return -1;
                    return 0
                }) :
                state.recipes.sort((a, b) => {
                    if (a.title < b.title) return 1;
                    if (a.title > b.title) return -1;
                    return 0
                })
            return {
                ...state,
                recipes: recipeSorted
            }
        case 'ORDER_BY_SCORE':
            let recipeScoreSorted
            if (action.payload === 'HealthScore Higher') {
                recipeScoreSorted = state.recipes.sort((a, b) => {
                    if (a.healthScore < b.healthScore) return 1;
                    if (a.healthScore > b.healthScore) return -1;
                    return 0
                })
            } else {
                recipeScoreSorted = state.recipes.sort((a, b) => {
                    if (a.healthScore > b.healthScore) return 1;
                    if (a.healthScore < b.healthScore) return -1;
                    return 0
                })
            }
            return {
                ...state,
                recipes: recipeScoreSorted
            }
        case 'FILTER_BY_DIET':
            const recipes = state.recipesCopy
            const filteredRecipes = action.payload === 'default' ? recipes : recipes.filter((el) => el.diets.includes(action.payload))
            return {
                ...state,
                recipes: filteredRecipes
            }
        case 'GET_RECIPE_DETAILS':
            return {
                ...state,
                details: action.payload
            }
        case 'CLEAR_DETAILS':
            return {
                ...state,
                details: []
            }
        case 'POST_RECIPE':
            return {
                ...state
            }
        case 'SET_PAGE':
            return {
                ...state,
                page: action.payload
            }
        default:
            return state
    }
}

export default rootReducer