import axios from "axios";

const BASE_URL = "https://hp-api.onrender.com/api/characters";

export const getInfo = async () => {
    try {
        const result = await axios({
            url:`${BASE_URL}`,
            method:"GET"
        })
        return result.data
    } catch (error) {
        console.log(error)
    }
}