const fs = require('fs'); //escribir archivos

let listadoPorHacer = []; //Arreglo vacío para almacenar las tareas por hacer

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer); //transformamos a json para poder escribirlo en un archivo 

    fs.writeFile('db/data.json', data, (err) => {
        if (err)
            throw new Error('No se pudo grabar', err);
    })
}

const cargarDB = () => {
    /*
    Al ser un archivo .json se puede hacer un require,
    el programa al detectar el archivo json lo serializa
    automáticamente
    */
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = []; // se pone así ya que si el archivo está vacío lanza un error
    }

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion, //es lo mismo que descripcion: descripcion
        completado: false
    }

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = (completado2) => {
    if (completado2 > 2 || completado2 < 0) {
        console.log('Número fuera de rango.');
        return -1;
    }
    cargarDB();
    if (completado2 == 0) {
        let nuevoListado = listadoPorHacer.filter(tarea => tarea.completado === false);
        listadoPorHacer = nuevoListado;
    } else if (completado2 == 1) {
        let nuevoListado = listadoPorHacer.filter(tarea => tarea.completado === true);
        listadoPorHacer = nuevoListado;
    }

    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    //La función findIndex recibe como parámetro un callback
    // let index = listadoPorHacer.findIndex(tarea => {
    //     return tarea.descripcion === descripcion;
    // })
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}