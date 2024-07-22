import axios from "axios";
import { Button, Form, FormProps, Input } from "antd"
import TextArea from "antd/es/input/TextArea";
import { Group } from "../../../types";
import { useAuth } from "../../../context/auth-context";
import useProject from "../../../hooks/use-project";
import { useModalContext } from "../../../context/modal-context";

interface INewTaskModal {
    group: Group;
}

type FieldType = {
    title: string;
    description?: string;
};

const NewTaskModal: React.FC<INewTaskModal> = ({ group }) => {
    console.log('group: ', group);
    const { hideModal } = useModalContext();
    const { userToken } = useAuth();
    const { refetch } = useProject(group.project.id);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        axios.post(`${process.env.REACT_APP_API_URL}/tasks`, {
            data: {
                title: values.title,
                description: values.description,
                status: "Новый",
                group: {
                    id: group.id
                }
            }
        }, {
            headers: {
                Authorization: "Bearer " + userToken,
            },
        }).then(() => {
            refetch();
            hideModal();
        }).catch(error => console.error(error));
    }
    return (
        <Form
            layout="horizontal"
            onFinish={onFinish}
        >
            <Form.Item name="title">
                <Input className="w-full" />
            </Form.Item>
            <Form.Item name="description">
                <TextArea className="w-full" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="ml-auto">Создать</Button>
        </Form>
    )
}

export default NewTaskModal