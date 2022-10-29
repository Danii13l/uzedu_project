import {NextPage} from "next";

import {AdminLayout} from "@/components/pages/admin/admin_layout/AdminLayout";
import {AdminForm} from "@/components/pages/admin/form/AdminForm";


const AdminEducation: NextPage = (): JSX.Element => {
    return (
        <AdminLayout>
            <div>
                <AdminForm/>
            </div>
        </AdminLayout>
    );
};

export default AdminEducation;
