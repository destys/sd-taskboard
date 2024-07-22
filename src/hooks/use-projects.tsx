import axios from "axios";
import { Project, StrapiResponse } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/auth-context";

const getData = async (userId: number | null, token: string | null, role: string): Promise<StrapiResponse<Project>> => {
    const query = role !== 'admin' ? `&filters[$or][0][owner][id]=${userId}&filters[$or][1][contractor][id]=${userId}` : '';
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects?populate=deep${query}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data;
}

const useProjects = () => {
    const { userId, userToken, role } = useAuth();
    return useQuery({ queryKey: ['projects'], queryFn: () => getData(userId, userToken, role) })
}

export default useProjects