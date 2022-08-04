const { Router } = require('express');
const axios = require('axios');
const { Recipe, Diet } = require('../db')
const { Op } = require('sequelize');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', async (req, res) => {
    const { title } = req.query
    try {
        if (title) {
            let { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${title}&apiKey=${process.env.APIKEY}&addRecipeInformation=true&number=86`)
            if (data.totalResults === 0) {
                res.send("The required recipe doesn't exist.")
            }
            const map = data.results.map((r) => {
                let dietType = []
                if (r.vegetarian === true) dietType.push('vegetarian')
                let arrayDiets = r.diets.concat(dietType)
                let recipe = {
                    id: r.id,
                    title: r.title,
                    diets: arrayDiets,
                    summary: r.summary,
                    healthScore: r.healthScore,
                    analyzedInstructions: r.analyzedInstructions,
                    image: r.image,
                }
                return recipe
            })
            const recipeDb = await Recipe.findAll({
                where: {
                    title: {
                        [Op.iLike]: '%' + title + '%',
                    }
                },
                include: {
                    model: Diet,
                    atributes: ["tipo"],
                    through: {
                        attributes: [],
                    },
                },
            })
            let recipeResult = recipeDb.concat(map)
            res.status(200).json(recipeResult)
        } else {
            let { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.APIKEY}&addRecipeInformation=true&number=86`)
            const map = data.results.map((r) => {
                let dietType = []
                if (r.vegetarian === true) dietType.push('vegetarian')
                let arrayDiets = r.diets.concat(dietType)
                let recipe = {
                    id: r.id,
                    title: r.title,
                    diets: arrayDiets,
                    summary: r.summary,
                    healthScore: r.healthScore,
                    analyzedInstructions: r.analyzedInstructions,
                    image: r.image,
                }
                return recipe
            })
            const recipeDb = await Recipe.findAll({
                include: {
                    model: Diet,
                    atributes: ["tipo"],
                    through: {
                        attributes: [],
                    },
                },
            })
            let recipeResult = recipeDb.concat(map)
            res.status(200).json(recipeResult)
        }
    } catch (err) {
        console.error(err)
    }
})

router.get('/recipes/:id', async (req, res) => {
    const { id } = req.params
    let recipeInfo;
    try {
        if (id >= 0) {
            let { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.APIKEY}`)
            const apiInfo = {
                id: data.id,
                image: data.image,
                title: data.title,
                dishTypes: data.dishTypes,
                diets: data.diets,
                summary: data.summary,
                healthScore: data.healthScore,
                instructions: data.instructions,
            }
            recipeInfo = apiInfo
        } else {
            const recipeDb = await Recipe.findByPk(id, {
                include: {
                    model: Diet,
                    atributes: ["tipo"],
                    through: {
                        attributes: [],
                    },
                },
            });
            recipeInfo = recipeDb
        }
        res.json(recipeInfo)
    } catch (err) {
        console.log(err)
    }
})

router.post('/recipes', async (req, res) => {
    const { title, image, healthScore, summary, instructions, diets, dishTypes } = req.body
    try {
        let newRecipes = await Recipe.create({
            title,
            image,
            healthScore,
            summary,
            instructions,
            dishTypes,
        })
        diets.map(async d => {
            const dbDiet = await Diet.findOrCreate({
                where: {
                    name: d
                }
            })
            newRecipes.addDiet(dbDiet[0]);
        })
        res.json({ ...newRecipes.dataValues, diets })
    } catch (err) {
        console.log(err)
    }
})

router.get('/diets', async (req, res) => {
    try {
        const diets = await Diet.findAll()
        res.json(diets)
    } catch (err) {
        console.log(err)
    }
})

router.get('/recipesdatabase', async (req, res) => {
    try {
        const recipesDb = await Recipe.findAll()
        res.json(recipesDb)
    } catch (err) {
        console.log(err)
    }
})


module.exports = router;
