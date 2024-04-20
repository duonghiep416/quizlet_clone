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
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { get } from "@/utils/request";
import { toast } from "sonner";
import debounce from "lodash.debounce";
import { CheckIcon } from "@heroicons/react/24/outline";
const columns = ["Name", "Email", "Role", "Status", "Action"];
interface IFilterOptions {
  status: number | null;
  role: number | null;
  page: number;
}

interface IRole {
  id: number;
  name: string;
  description?: string;
}

const UserTable = () => {
  const [user, setUser] = useState({
    data: [],
    count: 0,
  });
  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
    status: null,
    role: 0,
    page: 1,
  });
  const [roles, setRoles] = useState<IRole[]>([]);
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
    const fetchRole = async () => {
      const data = await get(`${process.env.NEXT_PUBLIC_API}/roles`);
      return data;
    };
    toast.promise(fetchRole(), {
      loading: "Đang cập nhật...",
      success: (data) => {
        if (data.status === 200) {
          setRoles([
            {
              id: 0,
              name: "Bộ lọc",
              description: "Bộ lọc",
            },
            ...data.roles,
          ]);
          return "Cập nhật thành công";
        }
      },
      error: "Có lỗi xảy ra, vui lòng thử lại sau",
    });
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
  useEffect(() => {
    const fetchUser = async () => {
      const data = await get(`${process.env.NEXT_PUBLIC_API}/users`, {
        page,
        role: String(filterOptions.role),
      });
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
  }, [filterOptions.role]);
  return (
    <>
      <div className="flex">
        <Input placeholder="Search user" onChange={searchUser} />
        {roles.length > 1 && (
          <Dropdown
            classNames={{
              base: "basis-10",
            }}
          >
            <DropdownTrigger>
              <Button>{roles[filterOptions.role || 0].name}</Button>
            </DropdownTrigger>
            <DropdownMenu
              selectionMode="single"
              onSelectionChange={(e) => {
                const selectedItemsArray = Array.from(e);
                setFilterOptions({
                  ...filterOptions,
                  role: Number(selectedItemsArray[0]),
                });
              }}
            >
              <DropdownSection title="Role">
                {roles.map((role) => (
                  <DropdownItem
                    key={role.id}
                    value={role.id}
                    endContent={
                      role.id === filterOptions.role ? (
                        <CheckIcon width={20} height={20} />
                      ) : (
                        ""
                      )
                    }
                  >
                    {role.name}
                  </DropdownItem>
                ))}
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
      <DataTable columns={columns} data={user.data} action={<Action />} />;
      <Pagination
        initialPage={page}
        total={Math.ceil(user.count / 10)}
        onChange={(pageNumber) => {
          setFilterOptions({
            ...filterOptions,
            page: pageNumber,
          });
        }}
      />
    </>
  );
};

export default UserTable;
