import axios from "axios";

export async function getItem(){
    const response=await axios.get(
        "http://localhost:9000/api/product/products"
    );
    return response.data;
}
