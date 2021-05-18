import axios from "axios";

export async function getItem(){
    const response=await axios.get(
        "/api/product/products"
    );
    return response.data;
}
export async function isRegisterSuccess(){
    const response=await axios.post(
        "/api/users/register"
    );
    return response.data;
}
