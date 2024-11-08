import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/NavBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Backdrop, CircularProgress } from "@mui/material";

function Profile() {
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{
    email: string;
    createdAt: string;
  } | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }

    const fetchData = async () => {
      const response = await axiosInstance.get(
        import.meta.env.VITE_BACKEND + "/profile"
      );
      setUserData(response.data);
    };

    fetchData();
  }, []);

  return isLoggedIn ? (
    <>
      <Navbar></Navbar>
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={!userData}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Profile</h1>
        <div>
          <p>
            <strong>Email:</strong> {userData?.email}
          </p>
          <p>
            <strong>Created Date:</strong> {userData?.createdAt}
          </p>
        </div>
      </div>
    </>
  ) : null;
}

export default Profile;
