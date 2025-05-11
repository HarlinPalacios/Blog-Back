// controllers/publicationController.js
import Publication from '../publics/public.model.js';
import Comment from '../comments/comment.model.js'; // Asegúrate de tener este modelo definido correctamente
import Curso from '../cuorses/course.model.js'; // Asegúrate de tener este modelo definido correctamente

// Agregar una publicación
export const createPubli = async (req, res) => {
    const { title, description, curso } = req.body;

    if (!title || !description || !curso) {
        return res.status(400).json({
            success: false,
            message: 'Todos los campos son requeridos',
        });
    }

    try {
        // Verificar que el curso exista por su nombre (insensible a mayúsculas/minúsculas)
        const cursoExists = await Curso.findOne({ name: new RegExp(`^${curso}$`, 'i') });
        if (!cursoExists) {
            return res.status(404).json({
                success: false,
                message: 'Curso no encontrado',
            });
        }

        // Crear la nueva publicación asociada al curso encontrado
        const newPublication = new Publication({
            title,
            description,
            curso: cursoExists._id, // Asociar el ID del curso encontrado
        });
        await newPublication.save();

        res.status(201).json({
            success: true,
            message: 'Publicación creada con éxito',
            publication: newPublication,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear la publicación',
            error: error.message,
        });
    }
};

// Listar publicaciones con curso y comentarios
export const getPublic = async (req, res) => {
    try {
        // Obtener todas las publicaciones
        const publications = await Publication.find().sort({ creationdate: -1 });

        // Obtener los datos relacionados manualmente
        const publicationsWithDetails = await Promise.all(
            publications.map(async (publication) => {
                // Obtener el curso relacionado
                const curso = await Curso.findById(publication.curso).select('name'); // Ajusta "name" según el campo que necesites

                // Obtener los comentarios relacionados
                const comentarios = await Comment.find({ publication: publication._id }).select('usuario comment commentdate');

                return {
                    ...publication.toObject(),
                    curso, // Agregar los datos del curso
                    comentarios, // Agregar los comentarios
                };
            })
        );

        res.status(200).json({
            success: true,
            message: 'Publicaciones obtenidas con éxito',
            total: publicationsWithDetails.length,
            publications: publicationsWithDetails,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener publicaciones',
            error: error.message,
        });
    }
};

export const filtrar = async (req, res) => {
    const { curso } = req.params;

    if (!curso) {
        return res.status(400).json({
            success: false,
            message: 'El nombre del curso es requerido',
        });
    }

    try {
        // Verificar que el curso exista por su nombre (insensible a mayúsculas/minúsculas)
        const cursoExists = await Curso.findOne({ name: new RegExp(`^${curso}$`, 'i') });
        if (!cursoExists) {
            return res.status(404).json({
                success: false,
                message: 'Curso no encontrado',
            });
        }

        // Obtener las publicaciones asociadas al curso
        const publications = await Publication.find({ curso: cursoExists._id }).sort({ creationdate: -1 });

        res.status(200).json({
            success: true,
            message: `Publicaciones del curso "${curso}" obtenidas con éxito`,
            total: publications.length,
            publications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener publicaciones por curso',
            error: error.message,
        });
    }
};

export const courseDef = async () => {
    try {
        const defaultCourses = [
            { name: "Taller", description: "Curso de Taller práctico" },
            { name: "Tecnologia", description: "Curso sobre avances tecnológicos" },
            { name: "Practicas Supervisadas", description: "Curso de prácticas supervisadas en el campo" },
        ];

        for (const course of defaultCourses) {
            // Verificar si el curso ya existe
            const courseExists = await Curso.findOne({ name: course.name });

            if (courseExists) {
                console.log(`El curso 
                    "${course.name}" ya existe, no se puede crear otro.`);
                continue;
            }

            // Crear el curso si no existe
            const newCourse = new Curso(course);
            await newCourse.save();
            console.log(`Curso "${course.name}" creado exitosamente.`);
        }
    } catch (error) {
        console.error("Error al verificar o crear los cursos predeterminados:", error.message);
    }
};
