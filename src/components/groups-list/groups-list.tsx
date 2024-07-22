import { Collapse } from "antd";
import { Project } from "../../types";
import TasksList from "../tasks-list/tasks-list";

import Extra from "./components/extra";

interface IGroupsList {
    data: Project;
}

const GroupsList: React.FC<IGroupsList> = ({ data }) => {

    const items = data?.groups.map(group => ({
        key: String(group.id),
        label: <h2>{group.title}</h2>,
        children: <TasksList group={group} />,
        extra: <Extra group={group} />,
    }));

    return (
        <>
            <Collapse items={items} defaultActiveKey={items[0].key} size="large" />
        </>
    )
}

export default GroupsList