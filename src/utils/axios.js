import axios from "axios";

export default axios.create({
    baseURL: "https://ability-tree-api-pk2020.herokuapp.com/api",
    //baseURL: 'http://localhost:5000/api',
    headers: {
        "Content-Type": 'application/json'
    }
});