import { Button, Form, FormProps, Input, InputNumber } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios';
import { Project } from '../../../types';
import { useModalContext } from '../../../context/modal-context';
import { useAuth } from '../../../context/auth-context';
import useProject from '../../../hooks/use-project';
import { openNotificationWithIcon } from '../../../utils/notification';

interface INewGroupModal {
    project: Project;
}

interface FieldType {
    title: string;
    hourly_rate?: number;
    description?: string;
}

const NewGroupModal: React.FC<INewGroupModal> = ({ project }) => {
    const { hideModal } = useModalContext();
    const { userToken, role } = useAuth();
    const { refetch } = useProject(project.id)

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        axios.post(`${process.env.REACT_APP_API_URL}/groups`, {
            data: {
                title: values.title,
                description: values.description,
                status: "Новый",
                hourly_rate: values.hourly_rate,
                project: {
                    id: project.id
                }
            }
        }, {
            headers: {
                Authorization: "Bearer " + userToken,
            },
        }).then(() => {
            refetch();
            hideModal();
            openNotificationWithIcon('success', `Группа создана`, '')
        }).catch(error => {
            console.error(error)
            openNotificationWithIcon('error', 'Ошибка создания группы', '');
        });
    }
    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item name="title" label="Название">
                <Input className="w-full" />
            </Form.Item>
            {role === 'admin' &&
                (<Form.Item name="hourly_rate" label="Ставка в час">
                    <InputNumber className="w-full" />
                </Form.Item>)}
            <Form.Item name="description" label="Описание">
                <TextArea className="w-full" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="ml-auto">Создать</Button>
        </Form>
    )
}

export default NewGroupModal