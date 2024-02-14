import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import HomePageSidebar from "../../components/HomePageSideBar/HomePageSideBar";
import "./homepage.css";
import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";
import { isAcessTokenExpired, refreshAccessToken } from "../../constants";

export default function Homepage() {
  const [blogs, setBlogs] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertDetails, setAlertDetails] = useState({
    severity: "",
    message: "",
  });

/*Here's a breakdown of the key properties provided by the useLocation hook:
pathname:
Represents the path portion of the URL.
For example, if the URL is https://example.com/products, the pathname would be /products.
search:
Represents the query parameters of the URL.
For example, if the URL is https://example.com/?query=react, the search would be ?query=react.
There can be multiple queries
Example ?category=electronics&price=100&brand=example-brand.
Each querey is seperated by &.
 */
  const location = useLocation();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      let flag = sessionStorage.getItem("accessToken");
      if (isAcessTokenExpired()) {
        flag = await refreshAccessToken();
      }
      if (flag) {
        try {
          const response = await fetch(
            "http://localhost:8000/api/getBlogs" + location.search,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                authorization: sessionStorage.getItem("accessToken"),
              },
            }
          );
          if (!response.ok) throw new Error("Fetching Failed");
          const blogsData = await response.json();
          setBlogs(blogsData);
        } catch (error) {
          const alert = alertDetails;
          alert.severity = "error";
          alert.message = "Blog Fetching Failed";
          setAlertDetails(alert);
          setOpenAlert(true);
        }
      } else {
        const alert = alertDetails;
        alert.severity = "error";
        alert.message = "Authentication Failed,Please Login";
        setAlertDetails(alert);
        setOpenAlert(true);
      }
    };
    fetchPosts();
  }, [location.search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={blogs} />
        <HomePageSidebar></HomePageSidebar>
        {/* <Sidebar></Sidebar> */}
        <Snackbar
          open={openAlert}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity={alertDetails.severity}
            onClose={handleClose}
            variant="filled"
            elevation={6}
          >
            {alertDetails.message}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
