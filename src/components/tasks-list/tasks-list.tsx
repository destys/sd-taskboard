import { Table, TableColumnsType } from "antd";
import { CommentOutlined } from '@ant-design/icons';
import { Group } from "../../types";
import SpentTime from "../spent-time/spent-time";
import StatusSelect from "../ui/status-select";
import { taskStatusOptions } from "../../constants";
import Actions from "./components/actions";

interface ITasksList {
    group: Group;
}

interface DataTask {
    key: React.Key;
    title: string;
    comments: number;
    status: JSX.Element;
    deadline: string;
    spent_time: JSX.Element;
    cost: string;
    edit: JSX.Element;
}

const TasksList: React.FC<ITasksList> = ({ group }) => {

    const columns: TableColumnsType<DataTask> = [
        {
            title: 'Название',
            width: 150,
            dataIndex: 'title',
            key: 'title',
            fixed: 'left',
        },
        {
            title: <CommentOutlined />,
            width: 15,
            dataIndex: 'comments',
            key: 'comments',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            width: 50,
        },
        {
            title: 'Дата сдачи',
            dataIndex: 'deadline',
            key: 'deadline',
            width: 50,
        },
        {
            title: 'Контроль времени',
            dataIndex: 'spent_time',
            key: 'spent_time',
            width: 50,
        },
        {
            title: 'Стоимость',
            dataIndex: 'cost',
            key: 'cost',
            width: 50,
        },
        {
            title: '',
            key: 'edit',
            dataIndex: 'edit',
            fixed: 'right',
            width: 25,
        },
    ];

    const totalCost = group.tasks
        .filter(task => task.status !== 'Завершен') // Не учитываем завершенные задачи
        .reduce((accumulator, task) => {
            const cost = (task.spent_time * group.hourly_rate / 3600).toFixed(2);
            return (accumulator + parseFloat(cost));
        }, 0);

    const tasks: DataTask[] = [];
    group.tasks.forEach(task => {
        tasks.push({
            key: task.id,
            title: task.title,
            comments: 0,
            status: <StatusSelect defaultValue={task.status} options={taskStatusOptions} taskId={task.id} projectId={group.project.id} />,
            deadline: task.deadline,
            spent_time: <SpentTime initialSeconds={task.spent_time} taskId={task.id} projectId={group.project.id} />,
            cost: `${(task.spent_time * group.hourly_rate / 3600).toFixed(2)} ${group.currency}`,
            edit: <Actions task={task} />,
        });
    });


    return (
        <div>
            <Table columns={columns} dataSource={tasks} scroll={{ x: 1100, y: 600 }} />
            <div className="mt-4 text-right">
                <span>Итого к оплате: </span>
                <span className="font-bold">{totalCost.toFixed(2)} {group.currency}</span>
            </div>
        </div>
    )
}

export default TasksList