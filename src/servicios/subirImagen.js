const IMGBB_API_KEY = "053b7acada637b67e60f69d341d6512a"; //👈reemplazar por la del usuario
const ENDPOINT = "https://api.imgbb.com/1/upload";

export const subirImagen = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch(`${ENDPOINT}?key=${IMGBB_API_KEY}`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error("Error al subir la imagen");
        }

        return data.data.url;
    } catch (error) {
        console.error("ImgBB error:", error);
        throw error;
    }
};