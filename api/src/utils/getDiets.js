const { dietasArray } = require('./dietsTypes');
const { Diet } = require('../db');

const getDiets = () => {
    const diet = dietasArray.map(name => (Diet.create({ name: name })))

    Promise.all(diet)
        .then(() => console.log('Dietas agregadas correctamente'))
        .catch(err => console.log(err))
}

module.exports = {
    getDiets,
}