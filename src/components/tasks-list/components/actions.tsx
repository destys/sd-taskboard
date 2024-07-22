import { EditTwoTone, DeleteOutlined } from '@ant-design/icons';
import { Task } from '../../../types';
import axios from 'axios';
import { useAuth } from '../../../context/auth-context';
import useProject from '../../../hooks/use-project';
import { Popconfirm } from 'antd';

interface IActions {
    task: Task;
}

const Actions: React.FC<IActions> = ({ task }) => {
    const { userToken, role } = useAuth();
    const { refetch } = useProject(task.group.project.id)

    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }).then(() => {
            refetch();
            
        }).catch(error => console.error(error))
    }

    return (
        <div className="flex gap-2">
            <EditTwoTone className="p-1 cursor-pointer rounded hover:bg-gray-100" onClick={() => alert('edit')} />
            {role === 'admin' && (
                <Popconfirm
                    title="Подтверждение!"
                    description="Вы действительно хотите удалить задачу?"
                    onConfirm={handleDelete}
                    cancelText="Нет"
                    okText="Да"
                >
                    <DeleteOutlined className="text-red-500 cursor-pointer p-1 rounded hover:bg-gray-200" />
                </Popconfirm>
            )}

        </div>
    )
}

export default Actions