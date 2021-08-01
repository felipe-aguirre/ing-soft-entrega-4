'use strict';
//http://ec2-184-72-113-92.compute-1.amazonaws.com:3000/assistant/manager-range?rut_manager={rut_manager}&range={range}")
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


    let result = await strapi.query('Ayudante').find({rut: entradaRut})
    console.log(result)
    let result_t = {
      "nombre":result.nombre,
      "rango":result.rango
    }
    return result
  },

  async range(ctx){
    let entradaRange = ctx.req._parsedUrl.query.match(reSingle)[2]

    let result = await strapi.query('Ayudante').find({rango: entradaRange})
    console.log(result)
    let result_t = {
      "nombre":result.nombre,
      "rango":result.rango
    }
    return result
  },
  async manager(ctx){
    let entradaManager = ctx.req._parsedUrl.query.match(reSingle)[2]
    console.log(entradaManager)

    let result = await strapi.query('Ayudante').find({rut_gestor: entradaManager})
    console.log(result)
    let result_t = {
      "nombre":result.nombre,
      "rango":result.rango
    }
    return result
  },
  async managerRange(ctx){
    let entradaManager = ctx.req._parsedUrl.query.match(reDoble)[2]
    let entradaRange = ctx.req._parsedUrl.query.match(reDoble)[5]

    console.log(entradaManager, entradaRange)

    let usersManager = await strapi.query('Ayudante').find({rut_gestor: entradaManager})
    console.log(usersManager)

    let result = []
    for(let i = 0; i < usersManager.length; i++){
      if(usersManager[i]['rango'] == entradaRange){
        result.push(usersManager[i])
      }
      else{
        continue
      }
    }

    return result
  }

};
