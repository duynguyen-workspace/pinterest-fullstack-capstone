import axios from "axios";

const fetcher = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        // TokenCyberSoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MyIsIkhldEhhblN0cmluZyI6IjMwLzA0LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNDQzNTIwMDAwMCIsIm5iZiI6MTY4Njc2MjAwMCwiZXhwIjoxNzE0NTgyODAwfQ.vnuwKd2yPstVSFqQxog9sPBbe9pu5_XdZksPn83M0Hs",
    }
})

fetcher.interceptors.request.use((config) => {
    // console.log("config", config)

    const user = JSON.parse(localStorage.getItem("CURRENT_USER"));
    
    if (user) {
        // add authorization token to header
        config.headers.Authorization = user.accessToken;
    }
    
    // console.log("user", user)
    
    return config;
})

export default fetcher