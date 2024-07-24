import axios from "axios";
import { StrapiResponse, User } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/auth-context";

const getData = async (token: string | null, role?: string): Promise<StrapiResponse<User[] | null>> => {
    const query = role ? `&filters[role]=${role}` : '';
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users?populate=deep${query}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    console.log('response: ', response);
    return response.data;
}

const useUsers = (role?: string) => {
    const { userToken } = useAuth();
    return useQuery({ queryKey: ['users'], queryFn: () => getData(userToken, role) })
}

export default useUsers