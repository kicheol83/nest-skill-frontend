import { Box, Button, Stack } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import withLayoutNew from "@/libs/components/layout/LayoutNew";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { logIn, signUp } from "@/libs/auth";
import { sweetMixinErrorAlert } from "@/libs/sweetAlert";

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

type Role = "USER" | "PROVIDER";

const JoinPage: NextPage = () => {
  const router = useRouter();
  const device = useDeviceDetect();
  const [loginView, setLoginView] = useState<boolean>(true);

  const [input, setInput] = useState({
    nick: "",
    password: "",
    phone: "",
    role: "USER" as Role,
  });
  const [isLogin, setIsLogin] = useState(true);

  /** ROLE CHANGE */
  const changeRole = (role: Role) => {
    setInput((prev) => ({ ...prev, role }));
  };

  /** HANDLERS */
  const handleInput = useCallback((name: string, value: string) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  }, []);

  const doLogin = useCallback(async () => {
    try {
      await logIn(input.nick, input.password);
      await router.push(`${router.query.referrer ?? "/"}`);
    } catch (err: any) {
      await sweetMixinErrorAlert(err.message);
    }
  }, [input]);

  const doSignUp = useCallback(async () => {
    try {
      await signUp(input.nick, input.password, input.phone, input.role);
      await router.push(`${router.query.referrer ?? "/"}`);
    } catch (err: any) {
      await sweetMixinErrorAlert(err.message);
    }
  }, [input]);

  if (device === "mobile") {
    return <div>AFISHA</div>;
  }

  return (
    <Stack className="join-page">
      <Stack className="container">
        <Stack className="main">
          <Box className="left">
            <Box className="logo">
              <img src="/icons/nest-logo.svg" alt="Logo" />
              <span>Skill Nest</span>
            </Box>
            <Box className="box">
              <img className="statistic" src="/img/job/statistic.svg" alt="" />
              <span className="people">1000k+</span>
              <span className="title">People got hired</span>
            </Box>
            <img className="men-img" src="/img/profile/men1.png" alt="" />
          </Box>

          <Box className="right">
            <Box className="top-main">
              {!isLogin && (
                <Box className="role">
                  <Button
                    className={`role-check ${
                      input.role === "USER" ? "active" : ""
                    }`}
                    onClick={() => changeRole("USER")}
                  >
                    USER
                  </Button>
                  <Button
                    className={`role-check ${
                      input.role === "PROVIDER" ? "active" : ""
                    }`}
                    onClick={() => changeRole("PROVIDER")}
                  >
                    PROVIDER
                  </Button>
                </Box>
              )}

              <Box className="top-title">
                <span className="txt">
                  {isLogin ? "Welcome back!" : "Get more opportunities"}
                </span>
                <Button className="google-button">
                  <img src="/icons/home/google.svg" alt="" />
                  {isLogin ? "Login" : "Sign Up"} with Google
                </Button>
              </Box>

              <Box className="bott-line">
                <div className="line"></div>
                <span className="text">
                  Or {isLogin ? "login" : "sign up"} with email
                </span>
                <div className="line"></div>
              </Box>

              <Box className="forms">
                <Box className="form">
                  <span className="input-title">Nickname</span>
                  <input
                    className="input-frame"
                    type="text"
                    placeholder="Enter Nickname"
                    value={input.nick}
                    onChange={(e) => handleInput("nick", e.target.value)}
                    required={true}
                    onKeyDown={(event) => {
                      if (event.key == "Enter" && loginView) doLogin();
                      if (event.key == "Enter" && !loginView) doSignUp();
                    }}
                  />
                </Box>

                {!isLogin && (
                  <Box className="form">
                    <span className="input-title">Phone</span>
                    <input
                      className="input-frame"
                      type="text"
                      placeholder="Enter phone number"
                      value={input.phone}
                      onChange={(e) => handleInput("phone", e.target.value)}
                      required={true}
                      onKeyDown={(event) => {
                        if (event.key == "Enter" && loginView) doLogin();
                        if (event.key == "Enter" && !loginView) doSignUp();
                      }}
                    />
                  </Box>
                )}

                <Box className="form">
                  <span className="input-title">Password</span>
                  <input
                    className="input-frame"
                    type="password"
                    placeholder="Enter password"
                    value={input.password}
                    onChange={(e) => handleInput("password", e.target.value)}
                    required={true}
                    onKeyDown={(event) => {
                      if (event.key == "Enter" && loginView) doLogin();
                      if (event.key == "Enter" && !loginView) doSignUp();
                    }}
                  />
                </Box>

                <Button
                  className="continue"
                  onClick={isLogin ? doLogin : doSignUp}
                  disabled={
                    isLogin
                      ? !input.nick || !input.password
                      : !input.nick ||
                        !input.phone ||
                        !input.password ||
                        !input.role
                  }
                >
                  {isLogin ? "Login" : "Continue"}
                </Button>
              </Box>

              <Box className="bottom-text">
                {isLogin ? (
                  <Box className="already">
                    <span className="first">Don't have an account?</span>
                    <span
                      className="login-text"
                      onClick={() => setIsLogin(false)}
                    >
                      Sign Up
                    </span>
                  </Box>
                ) : (
                  <Box className="already">
                    <span className="first">Already have an account?</span>
                    <span
                      className="login-text"
                      onClick={() => setIsLogin(true)}
                    >
                      Login
                    </span>
                  </Box>
                )}

                <Box className="policy">
                  <span className="second">
                    By clicking '{isLogin ? "Login" : "Continue"}', you
                    acknowledge that you have read and accept the
                  </span>
                  <span className="txt">
                    Terms of Service and Privacy Policy.
                  </span>
                </Box>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withLayoutNew(JoinPage);
