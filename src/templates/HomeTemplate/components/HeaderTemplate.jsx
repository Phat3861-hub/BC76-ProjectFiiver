import React, { useEffect, useMemo, useState } from "react";
import Icons from "../../../components/Icons";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../../common/path";
import DropdownHeader from "../../../components/dropdown/DropdownHeader";
import {
  ButtonGhost,
  ButtonOutLine,
} from "../../../components/button/ButtonCustom";
import { GlobalOutlined, SmileOutlined } from "@ant-design/icons";
import InputSearch from "../../../components/input/inputSearch/InputSearch";
import { useSelector } from "react-redux";
import { congViecService } from "../../../service/congViec.service";
import { useDebounce } from "use-debounce";
import { Dropdown } from "antd";
import "./headerTemplate.scss";
import useViewPort from "../../../hooks/useViewPort";

const HeaderTemplate = () => {
  const { width } = useViewPort();
  const [keyword, setKeyword] = useState("");
  const [value] = useDebounce(keyword, 1000);
  const [openDropdown, setOpenDropDown] = useState(false);
  const [listSearch, setListSearch] = useState([]);
  const { user } = useSelector((state) => {
    return state.userSlice;
  });
  console.log(user);

  const navigate = useNavigate();

  const handleChangeKeyword = (event) => {
    setKeyword(event.target.value);
  };

  const handleClickInputSearch = () => {
    setOpenDropDown(true);
  };

  // useMemo : cứ mỗi lần setState ==> re-render ==> cập nhật chạy mới toàn bộ các biến cũng như là các function bên trong ==>useMemo quản lý các biến giúp kiểm tra khi nào nên tạo mới
  // useCallBack: ==> quản lý các function

  useEffect(() => {
    if (value) {
      congViecService
        .getCongViecTheoTen(value)
        .then((res) => {
          console.log(res);
          setListSearch(res.data.content);
          setOpenDropDown(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [value]);

  const itemListSearch = useMemo(() => {
    return listSearch.slice(0, 4).map((item, index) => {
      return {
        key: item.id,
        label: (
          <div className="flex items-center">
            <img
              src={item.congViec.hinhAnh}
              className="w-16 h-16 mr-3"
              alt=""
            />
            <div>
              <h4 className="text-lg font-semibold">
                {item.congViec.tenCongViec}
              </h4>
              <p className="mt-2">Đánh giá:{item.congViec.danhGia}</p>
            </div>
          </div>
        ),
      };
    });
  }, [listSearch]);

  return width > 576 ? (
    <header className="py-4 border-b border-b-gray-200">
      <div className="container">
        <div className="header_content flex items-center justify-between">
          <div className="flex flex-1 space-x-2 items-center">
            {/* logo */}
            <Link to={pathDefault.homePage}>
              <Icons.logo />
            </Link>
            <Dropdown
              trigger={["click"]}
              overlayClassName="dropdown-suggest"
              open={openDropdown}
              menu={{
                items: itemListSearch,
                onMouseLeave: () => {
                  setOpenDropDown(false);
                },
              }}
            >
              <div className="w-full">
                <InputSearch
                  handleClick={handleClickInputSearch}
                  handleChange={handleChangeKeyword}
                  value={keyword}
                  placeholder={"What are you looking for today?"}
                />
              </div>
            </Dropdown>
          </div>
          <div className="header_action space-x-3">
            <DropdownHeader buttonContent="Fiverr Pro" />
            <DropdownHeader buttonContent="Explore" />
            <ButtonGhost content={"English"} icon={<GlobalOutlined />} />
            <ButtonGhost content={"Become Seller"} />
            {!user ? (
              <>
                <ButtonGhost content={"Sign In"} />
                <ButtonOutLine
                  onClick={() => {
                    navigate(pathDefault.signIn);
                  }}
                  content={"Join"}
                />
              </>
            ) : (
              <p className="w-max inline-block">{user.name}</p>
            )}
          </div>
          <Link to={pathDefault.admin}>chuyển hướng</Link>
        </div>
      </div>
    </header>
  ) : (
    <div>abc</div>
  );
};

export default HeaderTemplate;
