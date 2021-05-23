import axios from "axios";

export async function getItem(){
    const response=await axios.get(
        "/product/products"
    );
    return response.data.productInfo;
}
