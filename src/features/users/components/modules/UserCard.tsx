"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AtSign,
  Mail,
  MailBadge,
  Mailbox,
  User2,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";

type UserT = {
    id: string;
    name: string;
    email: string;
  }

const UserCard = () => {
  const [user, setUser] = useState<UserT[]>([]);
  // console.log(data);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        console.log(data);
        setUser(data.users)
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="grid grid-cols-2 gap-10">
      {user?.map((u) => (
        <Card key={u.id}>
          <CardContent className="flex gap-3">
            <Avatar className="my-auto">
              <AvatarFallback>
                {u.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Separator orientation="vertical" />
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-2.5 items-center">
                <UserRound className="h-5 w-5" />
                <Badge variant={"outline"} className="bg-indigo-500 text-sm">
                  <p>{u.name}</p>
                </Badge>
              </div>
              <div className="flex gap-2.5 items-center">
                <AtSign className="h-5 w-5" />
                <Badge variant={"secondary"} className="bg-sky-400 text-sm">
                  <p>{u.email}</p>
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserCard;
