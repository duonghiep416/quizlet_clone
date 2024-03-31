"use client";
import DataTable from "@/components/Tables/Table";
import Action from "@/components/User/Action/Action";
import {
  Pagination,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { get } from "@/utils/request";
import { toast } from "sonner";
import debounce from "lodash.debounce";
const columns = ["Name", "Email", "Role", "Status", "Action"];

const UserTable = () => {
  const [user, setUser] = useState({
    data: [],
    count: 0,
  });
  const [page, setPage] = useState(1);
  const searchUser = debounce(async (e: any) => {
    await fetch(`http://localhost:3000/api/users?q=${e.target.value}`)
      .then((response) => response.json())
      .then(({ data, count }) => {
        setUser({ data, count });
      });
  }, 500);
  useEffect(() => {
    const fetchUser = async () => {
      const data = await get(`${process.env.NEXT_PUBLIC_API}/users`, { page });
      return data;
    };
    toast.promise(fetchUser(), {
      loading: "Đang cập nhật...",
      success: (data) => {
        if (data.status === 200) {
          setUser({
            data: data.data,
            count: data.count,
          });
          return "Cập nhật thành công";
        }
      },
      error: "Có lỗi xảy ra, vui lòng thử lại sau",
    });
  }, [page]);
  return (
    <>
      <div className="flex">
        <Input placeholder="Search user" onChange={searchUser} />
        <Dropdown
          classNames={{
            base: "basis-10",
          }}
        >
          <DropdownTrigger>
            <Input placeholder="Filter" />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection title="Role">
              <DropdownItem>Admin</DropdownItem>
              <DropdownItem>Teacher</DropdownItem>
              <DropdownItem>Student</DropdownItem>
            </DropdownSection>
            <DropdownSection title="Status">
              <DropdownItem>Active</DropdownItem>
              <DropdownItem>Inactive</DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
      <DataTable columns={columns} data={user.data} action={<Action />} />;
      <Pagination
        initialPage={page}
        total={Math.ceil(user.count / 10)}
        onChange={(pageNumber) => {
          setPage(pageNumber);
        }}
      />
    </>
  );
};

export default UserTable;
