import { Tabs } from "antd";
import { Task } from "../../../../types"
import CommentsList from "./comments-list";

interface IComments {
    task: Task;
}

const Comments: React.FC<IComments> = ({ task }) => {
    const items = [
        {
            label: 'Комментарии',
            key: '1',
            children: <CommentsList task={task} />,
        },
        {
            label: 'Файлы',
            key: '2',
            children: 'Tab 2',
        },
        {
            label: 'Изображения',
            key: '3',
            children: 'Tab 2',
        }
    ]

    /*     if (role === 'admin') items.push({
            label: 'Журнал действий',
            key: '4',
            children: 'Tab 4',
        }) */

    return (
        <div>
            <Tabs
                defaultActiveKey="1"
                items={items}
            />
        </div>
    )
}

export default Comments