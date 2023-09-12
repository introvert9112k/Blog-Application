import { Box, Typography, styled, TextareaAutosize } from "@mui/material";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { Snackbar, Alert } from "@mui/material";
import { isAcessTokenExpired, refreshAccessToken } from "../../constants";
const Component = styled(Box)`
  width: 70vw;
  margin-top: 10px;
  /* background: #f5f5f5; */
  padding: 15px;
  margin-left: 10%;
`;

const Container = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
  font-weight: 600;
  margin-right: 20px;
`;

const StyledDate = styled(Typography)`
  color: #878787;
  /* color : white; */
  font-size: 14px;
`;

const StyledDescription = styled(Typography)`
  width: 70vw;
  word-wrap: break-word;
`;

const DisplayComments = ({ comment, setToggle }) => {
  const { user } = useContext(Context);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertDetails, setAlertDetails] = useState({
    severity: "",
    message: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const deleteCommentHandler = async () => {
    let flag = true;
    if (isAcessTokenExpired()) {
      flag = await refreshAccessToken();
    }
    if (flag) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/deleteComment/${comment._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: sessionStorage.getItem("accessToken"),
            },
          }
        );
        if (!response.ok) throw new Error("Comment Deletion Failed");
        const alert = alertDetails;
        alert.severity = "success";
        alert.message = "Comment Deleted Successfully";
        setAlertDetails(alert);
        setOpenAlert(true);
        setToggle((prevState) => !prevState);
      } catch (error) {
        const alert = alertDetails;
        alert.severity = "error";
        alert.message = "Comment Deletion Failed";
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

  return (
    <Component>
      <Container>
        <Name>{comment.userName}</Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {user.userName === comment.userName && (
          //   <DeleteIcon onClick={deleteCommentHandler}></DeleteIcon>
          <i
            className="deleteIcon far fa-trash-alt"
            onClick={deleteCommentHandler}
          ></i>
        )}
      </Container>
      <Box>
        <StyledDescription>{comment.commentDescription}</StyledDescription>
      </Box>
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
    </Component>
  );
};
export default DisplayComments;
