import { useParams } from "react-router-dom"
import useProject from "../../hooks/use-project";
import { Button, Spin } from "antd";
import GroupsList from "../../components/groups-list/groups-list";
import { useModalContext } from "../../context/modal-context";

const ProjectPage = () => {
    const params = useParams();
    const { data, isFetching } = useProject(params.id ? parseInt(params.id) : 0);
    const { showModal } = useModalContext();

    if (!data) {
        return null;
    }

    const handleCreateGroup = () => {
        showModal('NewGroupModal', { project: data }, {
            title: `Новая группа задач для проекта "${data.title}"`
        });
    }

    return (
        <Spin tip="Loading..." spinning={isFetching} className="flex justify-center items-center">
            <div>
                <h1 className="mb-6">{data?.title}</h1>
                <Button type="primary" onClick={handleCreateGroup}>Создать группу задач</Button>
                <div className="mt-4">
                    {data?.groups.length === 0 ?
                        <p>Группы задач еще не созданы</p> :
                        <>
                            <GroupsList data={data} />
                            <Button type="primary" onClick={handleCreateGroup} className="mt-4">Создать группу задач</Button>
                        </>
                    }
                </div>

            </div>
        </Spin>
    )
}

export default ProjectPage