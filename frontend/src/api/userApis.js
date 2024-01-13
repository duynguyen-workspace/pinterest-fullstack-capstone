import fetcher from "./fetcher"

export const registerApi = async (payload) => {
    // payload: {email: ..., password: ..., etc}
    try {
        const response = await fetcher.post("/user/register", payload)
        console.log("response: ", response)
        return response.data;
    }
    catch(error) {
        throw error.response.data
    }
}

export const loginApi = async (payload) => {
    // payload: {fullName: ..., age: ..., email: ..., password: ...}
    try {
        const response = await fetcher.post("/user/login", payload)
        console.log("response: ", response)
        return response.data;
    }
    catch(error) {
        console.log("error: ", error.response.data)
        throw error.response.data
    }
}