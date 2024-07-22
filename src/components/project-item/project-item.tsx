import { Card } from 'antd'
import { EyeOutlined, EditOutlined } from '@ant-design/icons'
import Meta from 'antd/es/card/Meta'
import { useNavigate } from 'react-router-dom';
import { Project } from '../../types';

interface IProjectItem {
    item: Project;
}

const ProjectItem: React.FC<IProjectItem> = ({ item }) => {
    const navigate = useNavigate();
    return (
        <Card
            cover={
                <div className="!flex justify-center items-center h-32 py-2 px-7">
                    {item.logo && <img
                        alt={`${item.title} logo`}
                        src={process.env.REACT_APP_API_UPLOAD_URL + item.logo.url}
                        width={item.logo.width}
                        height={item.logo.height}
                        className='object-contain'
                    />}
                </div>
            }
            actions={[
                <EyeOutlined key="view" onClick={() => navigate(`/project/${item.id}`)} />,
                <EditOutlined key="edit" />,
            ]}
        >
            <Meta
                title={item.title}
                description={item.description}
                className="text-center"
            />
        </Card>
    )
}

export default ProjectItem