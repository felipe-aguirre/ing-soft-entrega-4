'use strict';
const _ = require('lodash');
const axios = require('axios');

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

    const res = await axios.get('https://jesus-oyanedel.com/api/maquinas');

    let result = await strapi.query('Estudiante').find({campus: entradaCampus})
    console.log(result)
    return result

  },
  async career(ctx){
    let entradaCareer = ctx.req._parsedUrl.query.match(reSingle)[2]
    console.log(entradaCareer)

    let result = await strapi.query('Estudiante').find({carrera: entradaCareer})
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

  },
  async createUser(ctx){
    let entradaRut = ctx.query['rut']

    let usuario = await strapi.query('Estudiante').find({rut: entradaRut})
    let mail = usuario[0].contacto

    console.log(mail)
    
    let dataUser = {
      "email": mail,
      "password": entradaRut
    }

    console.log(dataUser)
    //Register
    const createUser = await axios.post('http://ec2-3-142-133-232.us-east-2.compute.amazonaws.com/create/register', dataUser)
    console.log(createUser)
    return createUser.data
  },

  async registrarProyecto(ctx){
    let entradaRut = ctx.query['rut']
    let entradaProyecto = ctx.query['proyecto']

    let usuario = await strapi.query('Estudiante').find({rut: entradaRut})
    let mail = usuario[0].contacto

    console.log(mail)
    
    let dataUser = {
      "email": mail,
      "password": entradaRut
    }

    //Login
    const tokenUser = await axios.post('http://ec2-3-142-133-232.us-east-2.compute.amazonaws.com/auth/login',dataUser)

    console.log(tokenUser.data['access_token'])
    let data = {
      "id_maker":entradaRut,
      "nombre": entradaProyecto,
      "descripcion": "Prueba de integracion de persona-proyecto6"
    }

    let token = 'Bearer ' + tokenUser.data['access_token']
    const options = {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    }

    const createProject = await axios.post('http://ec2-3-142-133-232.us-east-2.compute.amazonaws.com/api/proyectos',data, options)

    let result = {}
    if (createProject.status == 200 || createProject.status == 201){
      result = {
        "status": createProject.status,
        "message": "Proyecto creado con éxito",
        "project_id": createProject.data['id'],
        "project_name": createProject.data['nombre']
      }
    } else {
      result = {
        "status": 500,
        "message": "El proyecto no ha sido creado"
      }
    }
    return result;
  },

  async reservarMaquina(ctx){
    let entradaRut = ctx.query['rut']
    let finish = true
    let maquina_id = ctx.request.body['maquina_id']
    let usuario = await strapi.query('Estudiante').find({rut: entradaRut})
    let mail = usuario[0].contacto

    console.log(mail)
    
    let dataUser = {
      "email": mail,
      "password": entradaRut
    }

    //Login
    const tokenUser = await axios.post('http://ec2-3-142-133-232.us-east-2.compute.amazonaws.com/auth/login',dataUser)

    let token = 'Bearer ' + tokenUser.data['access_token']
    const options = {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    }

    //Crear session
    const projects = await axios.get('https://ing-soft-entrega-4-production.up.railway.app/student/buscar-proyectos?rut=' + entradaRut)
    let projectsUserId = projects.data[0].id

    let bodySession = {
      "id_proyecto":projectsUserId,
      "cumplida":finish
    }

    const session = await axios.post('http://ec2-3-142-133-232.us-east-2.compute.amazonaws.com/api/sesiones',bodySession ,options)

    //listar todas las maquinas existentes
    //const maquinas = await axios.get('https://jesus-oyanedel.com/api/maquinas')

    //Resevar una maquina usando una sesion asociada a un proyecto y un estudiante
    let reserva = {
      "id_sesion": session.data.id,
      "timestamp": "2021-08-17T02:33:58.453Z",
      "id_maquina": maquina_id
    }

    const crearReserva = await axios.post('http://ec2-3-142-133-232.us-east-2.compute.amazonaws.com/api/reservas',reserva,options)

    return crearReserva.data
  },

  async buscarProyectos(ctx){
    let entradaRut = ctx.query['rut']

    let usuario = await strapi.query('Estudiante').find({rut: entradaRut})
    let mail = usuario[0].contacto

    console.log(mail)
    
    let dataUser = {
      "email": mail,
      "password": entradaRut
    }

    //Login
    const tokenUser = await axios.post('http://ec2-3-142-133-232.us-east-2.compute.amazonaws.com/auth/login',dataUser)

    let token = 'Bearer ' + tokenUser.data['access_token']
    const options = {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    }

    const allProjectsRequest = await axios.get('http://ec2-3-142-133-232.us-east-2.compute.amazonaws.com/api/proyectos', options)

    let userProjects = []
    const allProjectsData = allProjectsRequest.data

    for(let i in allProjectsData){
        if(allProjectsData[i].id_maker == entradaRut){
            userProjects.push(allProjectsData[i])
        }
    }

    return userProjects

  },
  async obtenerMaquinas(ctx){
    const maquinas = await axios.get('https://jesus-oyanedel.com/api/maquinas')
    return maquinas.data
  }
};




/*
**Crear un proyecto en gestión con el rut de un usuario de api personas (LISTO) 
**Mostrar proyectos de una persona (LISTO)
** listar las maquinas (LISTO)
** reservar maquina (LISTO)
** crear sesion (LISTO)

*/
