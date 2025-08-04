import withLayoutNew from "@/libs/components/layout/LayoutNew";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";

type Mode = "signup" | "login" | "forgot";

const JoinPage = () => {
  const device = useDeviceDetect();
  const [selectedRole, setSelectedRole] = useState<"USER" | "PROVIDER">("USER");
  const [mode, setMode] = useState<Mode>("signup");

  if (device === "mobile") {
    return <div>AFISHA</div>;
  }

  return (
    <Stack className="join-page">
      <Stack className="container">
        <Stack className="main">
          {/* LEFT SIDE */}
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

          {/* RIGHT SIDE */}
          <Box className="right">
            <Box className="top-main">
              {mode === "signup" && (
                <Box className="role">
                  <Button
                    className={`role-check ${
                      selectedRole === "USER" ? "active" : ""
                    }`}
                    onClick={() => setSelectedRole("USER")}
                  >
                    USER
                  </Button>
                  <Button
                    className={`role-check ${
                      selectedRole === "PROVIDER" ? "active" : ""
                    }`}
                    onClick={() => setSelectedRole("PROVIDER")}
                  >
                    PROVIDER
                  </Button>
                </Box>
              )}

              <Box className="top-title">
                <span className="txt">
                  {mode === "signup"
                    ? "Get more opportunities"
                    : mode === "login"
                    ? "Welcome back!"
                    : "Reset your password"}
                </span>

                {mode !== "forgot" && (
                  <Button className="google-button">
                    <img src="/icons/home/google.svg" alt="" />
                    {mode === "signup" ? "Sign Up" : "Login"} with Google
                  </Button>
                )}
              </Box>

              {mode !== "forgot" && (
                <Box className="bott-line">
                  <div className="line"></div>
                  <span className="text">
                    Or {mode === "signup" ? "sign up" : "login"} with email
                  </span>
                  <div className="line"></div>
                </Box>
              )}

              {/* FORMS */}
              <Box className="forms">
                {mode === "signup" && (
                  <>
                    <Box className="form">
                      <span className="input-title">Nickname</span>
                      <input
                        type="text"
                        placeholder="Enter Nickname"
                        className="input"
                      />
                    </Box>
                  </>
                )}

                <Box className="form">
                  <span className="input-title">Email Address</span>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="input"
                  />
                </Box>

                {mode !== "forgot" && (
                  <Box className="form">
                    <span className="input-title">Password</span>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="input"
                    />
                  </Box>
                )}

                <Button className="continue">
                  {mode === "signup"
                    ? "Continue"
                    : mode === "login"
                    ? "Login"
                    : "Reset Password"}
                </Button>
              </Box>

              {/* BOTTOM LINKS */}
              <Box className="bottom-text">
                {mode === "signup" && (
                  <Box className="already">
                    <span className="first">Already have an account?</span>
                    <span
                      className="login-text"
                      onClick={() => setMode("login")}
                    >
                      Login
                    </span>
                  </Box>
                )}
                {mode === "login" && (
                  <>
                    <Box className="already">
                      <span className="first">Don't have an account?</span>
                      <span
                        className="login-text"
                        onClick={() => setMode("signup")}
                      >
                        Sign Up
                      </span>
                    </Box>
                    <Box className="already">
                      <span
                        className="login-text"
                        onClick={() => setMode("forgot")}
                      >
                        Forgot Password?
                      </span>
                    </Box>
                  </>
                )}
                {mode === "forgot" && (
                  <Box className="already">
                    <span
                      className="login-text"
                      onClick={() => setMode("login")}
                    >
                      Back to Login
                    </span>
                  </Box>
                )}

                {mode !== "forgot" && (
                  <Box className="policy">
                    <span className="second">
                      By clicking '{mode === "signup" ? "Continue" : "Login"}',
                      you acknowledge that you have read and accept the
                    </span>
                    <span className="txt">
                      Terms of Service and Privacy Policy.
                    </span>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withLayoutNew(JoinPage);
