import { Button, Popconfirm } from 'antd'
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { MouseEvent } from "react";
import { Group } from '../../../types';
import { useModalContext } from '../../../context/modal-context';
import { useAuth } from '../../../context/auth-context';
import useProject from '../../../hooks/use-project';
import axios from 'axios';
import { openNotificationWithIcon } from '../../../utils/notification';

interface IExtra {
    group: Group;
}

const Extra: React.FC<IExtra> = ({ group }) => {
    const { showModal } = useModalContext();
    const { userToken, role } = useAuth();
    const { refetch } = useProject(group.project.id)

    const handleAddTask = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
        e.stopPropagation()
        showModal('NewTaskModal', { group: group }, { title: `Новая задача для группы "${group.title}"` });
    };

    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/groups/${group.id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }).then(() => {
            refetch();
            openNotificationWithIcon('success', 'Группа удалена', ``);
        }).catch(error => {
            console.error(error);
            openNotificationWithIcon('error', 'Ошибка удаления группы', error.message);
        })
    }


    return (
        <div className="flex gap-2 items-center">
            <div>Cтавка/час: <span className="font-medium">{group.hourly_rate} {group.currency}</span></div>
            <Button icon={<PlusCircleOutlined />} onClick={(e) => handleAddTask(e)}>Задача</Button>
            {role === 'admin' && (
                <Popconfirm
                    title="Подтверждение!"
                    description={`Вы действительно хотите удалить группу "${group.title}"?`}
                    onConfirm={handleDelete}
                    cancelText="Нет"
                    okText="Да"
                >
                    <DeleteOutlined className="text-red-500 cursor-pointer p-1 rounded hover:bg-gray-200" onClick={(e) => e.stopPropagation()} />
                </Popconfirm>
            )
            }
        </div >
    )
}

export default Extra