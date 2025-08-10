// components/GoogleButtonWithLogin.tsx
import { Button } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@apollo/client";
import { GOOGLE_LOGIN } from "@/apollo/user/mutation";
import { useRouter } from "next/router";
import { sweetBasicAlert, sweetErrorAlert } from "../sweetAlert";
import { updateStorage, updateUserInfo } from "../auth";

type Props = {
  isLogin: boolean;
};

const GoogleButtonWithLogin = ({ isLogin }: Props) => {
  const router = useRouter();
  const [googleLoginMutation] = useMutation(GOOGLE_LOGIN);

  const loginWithGoogle = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (response) => {
      try {
        const { data } = await googleLoginMutation({
          variables: { input: { code: response.code } },
        });
        const token = data.googleLogin.accessToken;
        updateStorage({ jwtToken: token });

        updateUserInfo(token);

        router.push("/");
      } catch (err: any) {
        sweetBasicAlert(err.message || "Google login error");
      }
    },
    onError: () => {
      sweetErrorAlert("Google login failed");
    },
  });

  return (
    <Button className="google-button" onClick={() => loginWithGoogle()}>
      <img
        src="/icons/home/google.svg"
        alt="Google"
        style={{ marginRight: 8 }}
      />
      {isLogin ? "Login" : "Sign Up"} with Google
    </Button>
  );
};

export default GoogleButtonWithLogin;
