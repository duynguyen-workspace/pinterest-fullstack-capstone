import fetcher from "./fetcher";

export const getImageListApi = async () => {
    try {
        const response = await fetcher.get("/image/getImageList")
        console.log("response: ", response)
        return response.data
    } catch(error) {
        throw new Error(error)
    }
}

export const getImageByIdApi = async (imageId) => {
    try {
        const response = await fetcher.get(`/image/getImageById/${imageId}`)
        return response.data;
    } catch(error) {
        throw Error(error)
    } 
}