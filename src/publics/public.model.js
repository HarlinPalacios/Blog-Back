import { referrerPolicy } from "helmet";
import mongoose from "mongoose";

const publiSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "curso",
        required: true
    },
    comentarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],
    creationdate:{
        type: Date,
        default: Date.now,

    }
})

export default mongoose.model("publi", publiSchema)