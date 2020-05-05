const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer.'
}

const completado = {
    demand: true,
    default: true,
    alias: 'c',
    desc: 'Flag del estado de la tarea, completado (true).'
}

const completado2 = {
    demand: false,
    default: 2,
    alias: 'c',
    desc: 'Flag que indica el estado de las tareas que se buscan (0 = false, 1 = true, 2 = todas).'
}

const argv = require('yargs')
    .command('crear', 'Crea una tarea nueva en la lista por hacer.', {
        descripcion
        // descripcion: {
        //     demand: true,
        //     alias: 'd',
        //     desc: 'Descripción de la nueva tarea por hacer.'
        // }
    })
    .command('actualizar', 'Actualiza el estado de una tarea por hacer.', {
        descripcion,
        completado
    })
    .command('listar', 'Muestra el listado de tareas por hacer, así como su estado.', {
        completado2
    })
    .command('borrar', 'Elimina la tarea de la lista que contiene la descripción indicada', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}