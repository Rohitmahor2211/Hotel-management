import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roomSchema } from "../../schemas/roomSchema";
import { RoomContext } from "../../context/RoomContext";
import { BookmarkX, X } from 'lucide-react'

const AddRoomModal = ({ isOpen, onClose, editData }) => {
    const { addRoom, updateRoom } = useContext(RoomContext);
    const isEdit = !!editData;

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(roomSchema),
        defaultValues: {
            room_no: "",
            title: "",
            price: "",
            description: "",
            capacity: "",
            status: "available",
            images: [],
        }
    });

    const selectedImages = watch("images") || [];
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (editData) {
            setValue("room_no", editData.room_no);
            setValue("title", editData.title);
            setValue("price", editData.price);
            setValue("description", editData.description);
            setValue("capacity", editData.capacity);
            setValue("status", editData.status || "available");
            setPreviews(editData.images || []);
        } else {
            reset();
            setPreviews([]);
        }
    }, [editData, setValue, reset]);

    useEffect(() => {
        if (!selectedImages || selectedImages.length === 0) return;

        const files = Array.from(selectedImages).slice(0, 10);
        const objectUrls = files.map(file => URL.createObjectURL(file));

        setPreviews((prev) => {
            const existing = isEdit ? prev.filter(p => typeof p === "string" && p.startsWith("http")) : [];
            return [...existing, ...objectUrls];
        });

        return () => {
            objectUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [selectedImages, isEdit]);

    const removeImage = (index) => {
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("room_no", data.room_no);
        formData.append("title", data.title);
        formData.append("price", data.price);
        formData.append("description", data.description);
        formData.append("capacity", data.capacity);
        if (!isEdit) {
            formData.append("status", data.status || "available");
        }

        if (data.images?.length) {
            Array.from(data.images).forEach((file) => {
                formData.append("images", file);
            });
        }

        if (isEdit) {
            previews
                .filter((p) => typeof p === "string" && p.startsWith("http"))
                .forEach((url) => formData.append("existingImages", url));
        }
        
        onClose();
        if (isEdit) {
            await updateRoom(editData._id, formData);
        } else {
            await addRoom(formData);
        }
        reset();
        setPreviews([]);
    };

    const clearForm = () => {
        reset();
        setPreviews([]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
            <div className="bg-white w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-hidden rounded-t-3xl sm:rounded-3xl shadow-xl flex flex-col">
                <div className="sticky top-0 z-10 bg-white border-b border-[#eee7dc] px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#4b3425]">
                            {isEdit ? "Edit Room" : "Add Room"}
                        </h2>
                        <p className="text-sm text-[#8c735d] mt-1">
                            {isEdit ? "Update room details and photos" : "Create a new room listing"}
                        </p>
                    </div>
                    <button type="button" onClick={clearForm} className="w-10 h-10 rounded-xl bg-[#f7efe5] text-[#6d4c35] flex items-center justify-center hover:bg-[#eadbc8] transition shrink-0">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#5c4332] mb-2">Room No.</label>
                            <input {...register("room_no")} placeholder="Room No." className="w-full p-3 border border-[#eadfce] rounded-xl bg-[#fffaf4] focus:outline-none focus:ring-2 focus:ring-[#d6bfa7]" />
                            {errors.room_no && <p className="text-red-500 text-sm mt-1">{errors.room_no.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#5c4332] mb-2">Room Title</label>
                            <input {...register("title")} placeholder="Room Title" className="w-full p-3 border border-[#eadfce] rounded-xl bg-[#fffaf4] focus:outline-none focus:ring-2 focus:ring-[#d6bfa7]" />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#5c4332] mb-2">Price</label>
                            <input {...register("price")} placeholder="Price" className="w-full p-3 border border-[#eadfce] rounded-xl bg-[#fffaf4] focus:outline-none focus:ring-2 focus:ring-[#d6bfa7]" />
                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#5c4332] mb-2">Capacity</label>
                            <input {...register("capacity")} placeholder="Capacity" className="w-full p-3 border border-[#eadfce] rounded-xl bg-[#fffaf4] focus:outline-none focus:ring-2 focus:ring-[#d6bfa7]" />
                            {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#5c4332] mb-2">Status</label>
                            <select {...register("status")} className="w-full p-3 border border-[#eadfce] rounded-xl bg-[#fffaf4] focus:outline-none focus:ring-2 focus:ring-[#d6bfa7]">
                                <option value="available">Available</option>
                                <option value="booked">Booked (Offline)</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-[#5c4332] mb-2">Description</label>
                            <textarea {...register("description")} placeholder="Description" className="w-full p-3 border border-[#eadfce] rounded-xl min-h-[120px] bg-[#fffaf4] focus:outline-none focus:ring-2 focus:ring-[#d6bfa7]" />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                        </div>
                    </div>

                    <div>
                        <input type="file" multiple accept="image/*" id="roomImages" className="hidden" {...register("images")} />
                        <label htmlFor="roomImages" className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition">
                            <p className="text-lg font-medium text-[#4b3425]">Upload Room Images</p>
                            <p className="text-sm text-[#8c735d] mt-1">Maximum 10 images allowed</p>
                            {selectedImages?.length > 0 && (
                                <p className="mt-3 text-blue-600 font-medium">
                                    {Math.min(selectedImages.length, 10)} Images Selected
                                </p>
                            )}
                        </label>
                        {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>}

                        {previews.length > 0 && (
                            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
                                {previews.slice(0, 10).map((src, index) => (
                                    <div key={index} className="relative group shadow-sm rounded-xl overflow-hidden border border-[#eee7dc]">
                                        <img src={src} className="w-full aspect-square object-cover" alt="Preview" />
                                        <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-black/50 text-white w-7 h-7 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition">
                                            <BookmarkX size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="sticky bottom-0 -mx-4 sm:-mx-6 -mb-5 px-4 sm:px-6 py-4 bg-white border-t border-[#eee7dc] flex flex-col-reverse sm:flex-row sm:justify-end gap-3 z-10">
                        <button type="button" onClick={clearForm} className="w-full sm:w-auto px-6 py-3 bg-[#f7efe5] text-[#6d4c35] rounded-xl font-medium hover:bg-[#eadbc8] transition">
                            Cancel
                        </button>
                        <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-[#2563eb] text-white rounded-xl font-medium hover:bg-[#1d4ed8] transition shadow-lg">
                            {isEdit ? "Update Changes" : "Save Room"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRoomModal;
