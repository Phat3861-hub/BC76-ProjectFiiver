import React, { useContext, useEffect, useState } from "react";
import { nguoiDungService } from "../../service/nguoiDung.service";
import {
  Avatar,
  Button,
  DatePicker,
  Input,
  Modal,
  Popconfirm,
  Table,
  Tag,
} from "antd";
import { NotificationContext } from "../../App";
import InputCustom from "../../components/input/inputCustom/InputCustom";
import SelectCustom from "../../components/select/SelectCustom/SelectCustom";
import { Value } from "sass";
import { skillService } from "../../service/skill.service";
import FormAddUser from "./components/FormAddUser/FormAddUser";

const ManageUser = () => {
  const handleNotification = useContext(NotificationContext);
  const [listNguoiDung, setListNguoiDung] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const layDanhSachNguoiDung = () => {
    nguoiDungService
      .layDanhSachNguoiDung()
      .then((res) => {
        console.log(res);
        setListNguoiDung(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "ảnh đại diện",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record, index) => {
        return text ? (
          <img src={text} className="h-10 w-10" alt="" />
        ) : (
          <Avatar size={40}>{record.name[0]}</Avatar>
        );
      },
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
      key: "role",
      render: (text, record, index) => {
        return text == "ADMIN" ? (
          <Tag color="magenta">{text}</Tag>
        ) : text == "USER" ? (
          <Tag color="blue">{text}</Tag>
        ) : (
          <Tag color="purple">CHƯA XÁC ĐỊNH</Tag>
        );
      },
    },
    {
      title: "Hành động",
      key: "hanhDong",
      render: (text, record, index) => {
        return (
          <div className="space-x-2">
            <Popconfirm
              title="Xóa người dùng"
              description="Bạn có chắc chắn muốn xóa"
              onCancel={() => {}}
              onConfirm={() => {
                nguoiDungService
                  .xoaNguoiDung(record.id)
                  .then((res) => {
                    console.log(res);
                    layDanhSachNguoiDung();
                    handleNotification("success", res.data.message);
                  })
                  .catch((err) => {
                    console.log(err);
                    layDanhSachNguoiDung();
                    handleNotification("error", err.response.data.message);
                  });
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
            <Button className="border border-yellow-500 text-yellow-500">
              Sửa
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    layDanhSachNguoiDung();
  }, []);
  return (
    <div>
      <h1 className="font-bold text-4xl mb-5">
        Danh sách người dùng trong hệ thống
      </h1>
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="bg-green-600 text-white"
        size="large"
        variant="solid"
      >
        Thêm người dùng
      </Button>
      <Table dataSource={listNguoiDung} columns={columns} />;
      <Modal
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
        title="Thêm người dùng"
        open={isModalOpen}
      >
        <FormAddUser
          handleCloseModal={() => {
            setIsModalOpen(false);
          }}
          layDanhSachNguoiDung={layDanhSachNguoiDung}
        />
      </Modal>
    </div>
  );
};

export default ManageUser;
