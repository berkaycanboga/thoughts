import { getServerSession } from "next-auth/next";

import SignIn from "../../../components/Auth/SignIn/SignIn";

const SignInPage = async () => {
  const session = getServerSession();

  if (await session) {
    return <p>You&apos;re already signed in.</p>;
  }

  return (
    <div>
      <SignIn />
    </div>
  );
};

export default SignInPage;
