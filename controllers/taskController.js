import { Task } from '../models/Task.js';
import { Project } from '../models/Project.js';
export const crearTarea = async (req, res) => {
    try {
        // Quitamos las tildes a titulo 
        const { titulo, descripcion, estado, proyectoId, asignadoA, usuario } = req.body; 
        
        const nuevaTarea = new Task({ 
            titulo, 
            descripcion, 
            estado,
            usuario, 
            proyecto: proyectoId, 
            asignadoA: asignadoA || null
        });

        const tareaGuardada = await nuevaTarea.save();

        if (proyectoId) {
            await Project.findByIdAndUpdate(proyectoId, {
                $push: { tareas: tareaGuardada._id }
            });
        }

        res.status(201).json(tareaGuardada);
    } catch (error) {
        console.error("Error al crear tarea:", error);
        res.status(400).json({ 
            mensaje: "Error al crear la tarea", 
            error: error.message 
        });
    }
};