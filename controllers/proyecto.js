const { request, response} = require('express')
const Cliente = require('../models/cliente')
const TipoProyecto = require('../models/tipoProyecto')
const Universidad = require('../models/universidad')
const Etapa = require('../models/etapa')
const Proyecto = require('../models/proyecto')

// crear
const createProyecto= async (req = request, 
    res = response) => {
    try{
        const { numero, titulo, fechaInicio, fechaEntrega, valor, cliente, tipoProyecto, universidad, etapa } = req.body;
        //validando usuario
        const clienteDB = await Cliente.findById(cliente);
        if(!clienteDB){
            return res.status(400).json({msg: 'Cliente invalido'})
        }

        const tipoProyectoDB = await TipoProyecto.findById(tipoProyecto);
        if(!tipoProyectoDB){
            return res.status(400).json({msg: 'TipoProyecto invalido'})
        }

        const universidadDB = await Universidad.findById(universidad);
        if(!universidadDB){
            return res.status(400).json({msg: 'Universidad invalida'})
        }

        const etapaDB = await Etapa.findById(etapa);
        if(!etapaDB){
            return res.status(400).json({msg: 'Etapa invalida'})
        }

        const proyecto = new Proyecto({ numero, titulo, fechaInicio, fechaEntrega, valor, cliente: clienteDB, tipoProyecto: tipoProyectoDB, universidad: universidadDB, etapa: etapaDB });

        await proyecto.save()
        
        return res.status(201).json(proyecto)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

//listar todos
const getProyectos = async (req = request, 
    res = response) => {
        try{
            const proyectosDB = await Proyecto.find()//select * from inventarios
                .populate({
                    path: 'cliente'
                })
                .populate({
                    path: 'tipoProyecto'
                })
                .populate({
                    path: 'universidad'
                })
                .populate({
                    path: 'etapa'
                })
            return res.json(proyectosDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

const getProyecto = async (req = request, 
    res = response) => {
        try{
            const {id} = req.params;
            const proyectoDB = await Proyecto.findById(id)//select * from inventarios
                .populate({
                    path: 'cliente'
                })
                .populate({
                    path: 'tipoProyecto'
                })
                .populate({
                    path: 'universidad'
                })
                .populate({
                    path: 'etapa'
                })
            return res.json(proyectoDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

const updateProyecto= async (req = request, 
    res = response) => {
    try{
        const {id} = req.params;
        const fechaActualizacion = Date.now();
        const { numero, titulo, fechaInicio, fechaEntrega, valor, cliente, tipoProyecto, universidad, etapa } = req.body;
        //validando usuario
        const clienteDB = await Cliente.findById(cliente);
        if(!clienteDB){
            return res.status(400).json({msg: 'Cliente invalido'})
        }

        const tipoProyectoDB = await TipoProyecto.findById(tipoProyecto);
        if(!tipoProyectoDB){
            return res.status(400).json({msg: 'TipoProyecto invalido'})
        }

        const universidadDB = await Universidad.findById(universidad);
        if(!universidadDB){
            return res.status(400).json({msg: 'Universidad invalida'})
        }

        const etapaDB = await Etapa.findById(etapa);
        if(!etapaDB){
            return res.status(400).json({msg: 'Etapa invalida'})
        }
        

        const proyecto = await Proyecto.findByIdAndUpdate(id, { numero, titulo, fechaInicio, fechaEntrega, fechaActualizacion, valor, cliente: clienteDB, tipoProyecto: tipoProyectoDB, universidad: universidadDB, etapa: etapaDB }, { new: true });
        await proyecto.save()
        
        return res.status(201).json(proyecto)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}



module.exports = { createProyecto, getProyectos, getProyecto, updateProyecto }