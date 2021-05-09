import axios from "axios";

export async function getItem(){
    const response=await axios.get(
        "http://ec2-13-125-253-137.ap-northeast-2.compute.amazonaws.com/product/api"
    );
    return response.data;
}
