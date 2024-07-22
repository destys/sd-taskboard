import axios from "axios";
import { Project } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/auth-context";

const getData = async (projectId: number | null, token: string | null): Promise<Project> => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${projectId}?populate=deep`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.data.data;
}

const useProject = (id: number | 0) => {
    const { userToken } = useAuth();
    return useQuery({ queryKey: ['project', id], queryFn: () => getData(id, userToken) })
}

export default useProject