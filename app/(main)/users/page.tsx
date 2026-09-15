import UsersPage from "@/src/features/users/components/page/UsersPage";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: "Users"
}
export default function Users() {
    return (
        <UsersPage />
    );
}