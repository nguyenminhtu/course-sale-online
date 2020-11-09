import { Button } from "antd";
import { Link } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";

const EditButton = ({ path }) => {
  return (
    <Link to={path} className="new-category">
      <Button type="primary" icon={<PlusCircleOutlined />}>
        New
      </Button>
    </Link>
  );
};

export default EditButton;
