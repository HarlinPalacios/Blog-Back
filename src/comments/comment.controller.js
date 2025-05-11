// controllers/commentController.js
import Comment from '../comments/comment.model.js';
import Publication from '../publics/public.model.js';

// Agregar comentario a una publicación
export const createComment = async (req, res) => {
    const { usuario, comment, publication } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!usuario || !comment || !publication) {
        return res.status(400).json({
            success: false,
            message: 'Todos los campos son requeridos',
        });
    }

    try {
        // Verificar que la publicación exista
        const publicationExists = await Publication.findById(publication);
        if (!publicationExists) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada',
            });
        }

        // Crear el nuevo comentario
        const newComment = new Comment({ usuario, comment, publication });
        await newComment.save();

        res.status(201).json({
            success: true,
            message: 'Comentario creado con éxito',
            comment: newComment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el comentario',
            error: error.message,
        });
    }
};

// Listar todos los comentarios (opcional)
export const getComment = async (req, res) => {
    try {
        // Obtener todos los comentarios
        const comments = await Comment.find();

        // Obtener los datos relacionados manualmente
        const commentsWithDetails = await Promise.all(
            comments.map(async (comment) => {
                // Obtener los datos de la publicación relacionada
                const publication = await Publication.findById(comment.publication).select('title');
                
                return {
                    ...comment.toObject(),
                    publication, // Agregar los datos de la publicación
                };
            })
        );

        res.status(200).json({
            success: true,
            message: 'Comentarios obtenidos con éxito',
            total: commentsWithDetails.length,
            comments: commentsWithDetails,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener comentarios',
            error: error.message,
        });
    }
};