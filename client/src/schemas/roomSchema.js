import { z } from "zod";

export const roomSchema = z.object({
    room_no: z.string().min(1, "Room No is required"),

    title: z.string().min(3, "Title is required"),

    price: z.string().min(1, "Price is required"),

    description: z.string().min(5, "Description is required"),

    capacity: z.string().min(1, "Capacity is required"),

    images: z
        .any()
        .optional()
        .refine((files) => !files || files.length <= 10, {
            message: "Maximum 10 images allowed",
        })
        .refine(
            (files) =>
                !files || files.length === 0 ||
                Array.from(files).every((file) =>
                    ["image/jpeg", "image/png", "image/webp"].includes(file.type)
                ),
            {
                message: "Only JPG, PNG, WEBP images are allowed",
            }
        )
        .refine(
            (files) =>
                !files || files.length === 0 ||
                Array.from(files).every(
                    (file) => file.size <= 5 * 1024 * 1024
                ),
            {
                message: "Each image must be less than 5MB",
            }
        ),
});