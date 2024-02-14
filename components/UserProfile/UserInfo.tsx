import { useEffect, useState } from "react";

import { User } from "../../models/User";
import { userApiService } from "../../utils/api/user";

interface UserInfoProps {
  userId: number;
}

const UserInfo = ({ userId }: UserInfoProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const response = (await userApiService.getUser(userId)) as User;

      setUser(response);
    };

    fetchSession();
  }, [userId]);

  return (
    <div className="flex items-center py-2 border-b mb-2 ml-auto">
      <div className="mr-2">
        <p className="font-bold text-lg mb-0">{user?.fullName}</p>
        <p className="text-gray-500 mb-0">@{user?.username}</p>
      </div>
    </div>
  );
};

export default UserInfo;
