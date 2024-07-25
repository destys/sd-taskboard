import axios from "axios";
import { User } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/auth-context";

const getData = async (token: string | null, role?: string): Promise<User[]> => {
    const query = role ? `&filters[role]=${role}` : '';
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users?populate=deep${query}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    console.log('response: ', response);
    return response.data.data;
}

const useUsers = (role?: string) => {
    const { userToken } = useAuth();
    return useQuery({ queryKey: ['users'], queryFn: () => getData(userToken, role) })
}

export default useUsers