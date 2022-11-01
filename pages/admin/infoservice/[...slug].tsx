import {NextPage} from "next";

import {AdminLayout} from "@/components/pages/admin/admin_layout/AdminLayout";
import {PageForm} from "@/components/pages/admin/form/PageForm";


const AdminInfoService: NextPage = (): JSX.Element => {
    return (
        <AdminLayout>
            <div>
                <PageForm/>
            </div>
        </AdminLayout>
    );
};

export default AdminInfoService;
