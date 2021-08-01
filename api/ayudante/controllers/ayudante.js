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

    let result = [{
      'rut': '19746913', 
      'nombre': 'Joaquin Caqueo',
      'contacto': 'joaquin.caqueo@sansano.usm.cl',
      'rango': 'B',
      'rut_gestor': '20978123'
    }]
  return result
  },

  async range(ctx){
    let entradaRange = ctx.req._parsedUrl.query.match(reSingle)[2]
    console.log(entradaRange)

    let result = [{
      'rut': '19746913', 
      'nombre': 'Joaquin Caqueo',
      'contacto': 'joaquin.caqueo@sansano.usm.cl',
      'rango': 'B',
      'rut_gestor': '20978123'
    }]
  return result
  },
  async manager(ctx){
    let entradaManager = ctx.req._parsedUrl.query.match(reSingle)[2]
    console.log(entradaManager)

    let result = [{
    'rut': '19746913', 
    'nombre': 'Joaquin Caqueo',
    'contacto': 'joaquin.caqueo@sansano.usm.cl',
    'rango': 'B',
    'rut_gestor': '20978123'
  }]
  
  return result
  },
  async managerRange(ctx){
    let entradaManager = ctx.req._parsedUrl.query.match(reDoble)[2]
    let entradaRange = ctx.req._parsedUrl.query.match(reDoble)[5]

    console.log(entradaManager, entradaRange)

    let result = [{
      'rut': '19746913', 
      'nombre': 'Joaquin Caqueo',
      'contacto': 'joaquin.caqueo@sansano.usm.cl',
      'rango': 'B',
      'rut_gestor': '20978123'
    }]
  return result
  }

};
