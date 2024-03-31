import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserTable from "@/components/User/TableUser";

export const metadata = {
  title: "Users | QuizletAdmin",
  description: "This is Users page of QuizletAdmin",
};

const UserPage = () => {
  return (
    <DefaultLayout>
      <>
        <Breadcrumb pageName="Users" />
        <UserTable />
      </>
    </DefaultLayout>
  );
};

export default UserPage;
