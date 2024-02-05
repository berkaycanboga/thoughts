import { getServerSession } from "next-auth/next";

import SignUp from "../../../components/Auth/SignUp/SignUp";

const SignInPage = async () => {
  const session = getServerSession();

  if (await session) {
    return <p>You&apos;re already signed in.</p>;
  }

  return (
    <div>
      <SignUp />
    </div>
  );
};

export default SignInPage;
