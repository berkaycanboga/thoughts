import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const UserInfo = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const userSession = await getSession();
      setSession(userSession);
    };

    fetchSession();
  }, []);

  return (
    <div className="flex items-center py-2 border-b mb-2 ml-auto">
      <div className="mr-2">
        <p className="font-bold text-lg mb-0">{session?.user.fullName}</p>
        <p className="text-gray-500 mb-0">@{session?.user.username}</p>
      </div>
    </div>
  );
};

export default UserInfo;
