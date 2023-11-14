import {z} from 'zod'

export const CreateTaskSchema = z.object({
    title: z.string({
        required_error: "Title is required"
    }),
    descripcion: z.string({
        required_error: "Descripcion is required"
    }),
    date: z.string().datetime().optional(),
});

/* export const deleteTaskSchema = z.object({
    id: z.string({
        required_error: "ID is required"
    })
}) */