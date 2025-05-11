import moongoose from 'mongoose';

export const commentSchema = new moongoose.Schema({
    usuario:{
        type: String,
        required: true,
    },
    comment:{
        type: String,
        required: true,
    },
    commentdate:{
        type: Date,
        default: Date.now,
    },
    publication:{
        type: moongoose.Schema.Types.ObjectId,
        ref: "publication",
        required: true,
    },
})

export default moongoose.model("Comment", commentSchema)