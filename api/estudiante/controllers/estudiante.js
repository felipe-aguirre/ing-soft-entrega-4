'use strict';
const _ = require('lodash');

// http://ec2-184-72-113-92.compute-1.amazonaws.com:3000/student/campus-career?campus={campus}&career={career}")
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
let reSingle = new RegExp('(=)(.*)');
let reDoble = new RegExp('(=)(.*)&(.*)(=)(.*)');
module.exports = {

  async rut(ctx){
    let entradaRut = ctx.req._parsedUrl.query.match(reSingle)[2]
    console.log(entradaRut)


    let result = await strapi.query('Estudiante').find({rut: entradaRut})
    console.log(result)
    let result_t = {
      "nombre":result.nombre,
      "campus":result.rut
    }
    return result
  },

  async campus(ctx){
    let entradaCampus = ctx.req._parsedUrl.query.match(reSingle)[2]
    console.log(entradaCampus)


  let result = await strapi.query('Estudiante').find({campus: entradaCampus})
  console.log(result)
  let result_t = {
    "nombre":result.nombre,
    "campus":result.campus
  }
  return result

  },
  async career(ctx){
    let entradaCareer = ctx.req._parsedUrl.query.match(reSingle)[2]
    console.log(entradaCareer)

    let result = await strapi.query('Estudiante').find({career: entradaRut})
    console.log(result)
    let result_t = {
      "nombre":result.nombre,
      "campus":result.career
    }
    return result

  },
  async campusCareer(ctx){
    const knex = strapi.connections.default;

    let entradaCampus = ctx.req._parsedUrl.query.match(reDoble)[2]
    let entradaCareer = ctx.req._parsedUrl.query.match(reDoble)[5]

    console.log(entradaCampus, entradaCareer)

    let userCampus = await strapi.query('Estudiante').find({campus: entradaCampus})
    console.log(userCampus)

    let result = []
    for(let i = 0; i < userCampus.length; i++){
      if(userCampus[i]['carrera'] == entradaCareer){
        result.push(userCampus[i])
      }
      else{
        continue
      }
    }

    return result

  }
};
