import { useAuth } from "../../context/auth-context";
import useProjects from "../../hooks/use-projects";
import ProjectItem from '../../components/project-item/project-item';
import { Spin } from "antd";

const DashboardPage = () => {
    const { userData } = useAuth();
    console.log('userData: ', userData);
    const { data, isLoading } = useProjects();

    if (userData === null) return null;

    return (
        <div className="h-full flex flex-col justify-center items-center">
            <h1 className="mb-10 font-semibold text-3xl">Добрый день, {userData?.name || "Незнакомец"}! </h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {isLoading ? <Spin /> : (data?.data?.map(item => (
                    <ProjectItem key={item.id} item={item} />
                )))}
            </div>
        </div>
    )
}

export default DashboardPage