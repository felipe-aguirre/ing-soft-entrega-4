'use strict';

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

    let result = {
      "rut": "20208070",
      "nombre": "Fernanda Avendano",
      "contacto": "fernanda.avendano@sansano.usm",
      "carrera": "73",
      "campus": "CCC"
  }
  return result
  },

  async campus(ctx){
    let entradaCampus = ctx.req._parsedUrl.query.match(reSingle)[2]
    console.log(entradaCampus)

    let result = {
      "rut": "20208070",
      "nombre": "Fernanda Avendano",
      "contacto": "fernanda.avendano@sansano.usm",
      "carrera": "73",
      "campus": "CCC"
  }
  return result
  },
  async career(ctx){
    let entradaCareer = ctx.req._parsedUrl.query.match(reSingle)[2]
    console.log(entradaCareer)

    let result = {
      "rut": "20208070",
      "nombre": "Fernanda Avendano",
      "contacto": "fernanda.avendano@sansano.usm",
      "carrera": "73",
      "campus": "CCC"
  }
  return result
  },
  async campusCareer(ctx){
    let entradaCampus = ctx.req._parsedUrl.query.match(reDoble)[2]
    let entradaCareer = ctx.req._parsedUrl.query.match(reDoble)[5]

    console.log(entradaCampus, entradaCareer)

    let result = {
      "rut": "20208070",
      "nombre": "Fernanda Avendano",
      "contacto": "fernanda.avendano@sansano.usm",
      "carrera": "73",
      "campus": "CCC"
  }
  return result
  }
};
