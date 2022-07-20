const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', async (req, res) => {
    const { name } = req.query
    try {
        if (name) {
            let { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${process.env.APIKEY}&addRecipeInformation=true`)
            if (data.totalResults === 0) {
                res.send("The required recipe doesn't exist.")
            }
            const map = data.results.map((r) => {
                let dietType = []
                if (r.vegetarian === true) dietType.push('vegetarian')
                let recipe = {
                    id: r.id,
                    title: r.title,
                    diets: r.diets.concat(dietType),
                    summary: r.summary,
                    healthScore: r.healthScore,
                    analyzedInstructions: r.analyzedInstructions,
                    image: r.image,
                }
                return recipe
            })
            res.json(map)
        } else {
            let { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.APIKEY}&addRecipeInformation=true`)
            const map = data.results.map((r) => {
                let dietType = []
                if (r.vegetarian === true) dietType.push('vegetarian')
                let recipe = {
                    id: r.id,
                    title: r.title,
                    summary: r.summary,
                    healthScore: r.healthScore,
                    analyzedInstructions: r.analyzedInstructions,
                    image: r.image,
                }
                return recipe
            })
            res.json(map)
        }
    } catch (err) {
        console.error(err)
    }
})

// [ ] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer (imagen, nombre, tipo de plato y tipo de dieta)
// [ ] Resumen del plato
// [ ] Nivel de "comida saludable" (health score)
// [ ] Paso a paso
// Incluir los tipos de dieta asociados

router.get('/recipes/:id', async (req, res) => {
    const { id } = req.params
    try {
        let { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.APIKEY}`)
        const info = {
            id: data.id,
            image: data.image,
            title: data.title,
            dishTypes: data.dishTypes,
            diets: data.diets,
            summary: data.summary,
            healthScore: data.healthScore,
            instructions: data.instructions,
        }
        res.json(info)
    } catch (err) {
        console.log(err)
    }
})


// [ ] POST /recipes:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos relacionada con sus tipos de dietas.
router.post('/recipes', async (req, res) => {

})

// [ ] GET /diets:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá

module.exports = router;
