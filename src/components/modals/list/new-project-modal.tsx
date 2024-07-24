import { Button, Form, Input, FormProps, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { openNotificationWithIcon } from "../../../utils/notification";
import axios from "axios";
import { useModalContext } from "../../../context/modal-context";
import { useAuth } from "../../../context/auth-context";
import useProjects from "../../../hooks/use-projects";
import useUsers from "../../../hooks/use-users";

interface FieldType {
    title: string;
    hourly_rate?: number;
    description?: string;
}

const NewProjectModal = () => {
    const { hideModal } = useModalContext();
    const { userToken } = useAuth();
    const { refetch } = useProjects();

    const { data } = useUsers();
    console.log('data: ', data);


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        axios.post(`${process.env.REACT_APP_API_URL}/projects`, {
            data: {
                title: values.title,
                description: values.description,
            }
        }, {
            headers: {
                Authorization: "Bearer " + userToken,
            },
        }).then(() => {
            refetch();
            hideModal();
            openNotificationWithIcon('success', `Проект создан`, '')
        }).catch(error => {
            console.error(error);
            openNotificationWithIcon('error', 'Ошибка создания проекта', error.message);
        });
    }
    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item name="title" label="Название проекта">
                <Input className="w-full" />
            </Form.Item>
            <Form.Item name="contrator" label="Ответственный">
                <Select className="w-full" />
            </Form.Item>
            <Form.Item name="description" label="Описание проекта">
                <TextArea className="w-full" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="ml-auto">Создать проект</Button>
        </Form>
    )
}

export default NewProjectModal