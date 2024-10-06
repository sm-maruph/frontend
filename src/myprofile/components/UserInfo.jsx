import React, { useContext, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import useFetch from "../../CustomHooks/useFetch";
import MessageButton from "../../Shared/MessageButton";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Auth/AuthContext";
import { Link } from "react-router-dom";
import { useInput } from "../../CustomHooks/useInput";
import Success from "../../Shared/Success";
import Popup from "../../Shared/Popup";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Loading from "../../Shared/Loading";

const UserInfo = () => {
  const queryClient = useQueryClient();
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const cvRef = useRef([]);
  const { state, uploadImage, reset } = useInput({
    image: null,
  });
  const auth = useContext(AuthContext);
  const userId = useParams().userId;
  const { data, isLoading, isError, error } = useFetch({
    url: "http://localhost:3000/myprofile/getinfo",
    queryKey: ["gettinguserinfo"],
    params: { userId },
  });

  const mutation = useFetch({
    url: "http://localhost:3000/myprofile/uploadcv",
    method: "post",
    data: { CV: state.image !== null ? state.image[0] : null },
    params: { userId },
  });

  const mutationDeleteCV = useFetch({
    url: "http://localhost:3000/myprofile/deletecv",
    method: "DELETE",
    params: { userId },
  });

  if (mutation.isError) {
    console.log(mutation.error);
  }

  const deleteCV = () => {
    mutationDeleteCV.mutate(undefined, {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["gettinguserinfo"]);
        queryClient.refetchQueries(["gettinguserinfo"]);
        setSuccessMessage(data.message);
        setOpenSuccessPopup(true);

        reset();
      },
    });
  };
  const uploadCV = () => {
    mutation.mutate(undefined, {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["gettinguserinfo"]);
        queryClient.refetchQueries(["gettinguserinfo"]);
        setSuccessMessage(data.message);
        setOpenSuccessPopup(true);

        reset();
      },
    });
  };

  if (isLoading || mutation.isPending || mutationDeleteCV.isPending) {
    return <Loading open={true} />;
  }
  return (
    <>
      <Success
        open={openSuccessPopup}
        onClose={() => setOpenSuccessPopup(false)}
        successMessage={successMessage}
      />

      <Popup
        open={mutation.isError}
        onClose={() => {
          mutation.reset();
        }}
        errorMessage={mutation.error?.response.data.message}
        status={mutation.error?.response.status}
      />
      <Box
        display="flex"
        flexDirection="column"
        gap={3} // Spacing between sections
        sx={{ padding: 2 }} // Adds padding inside the box
      >
        {/* User Name and Role */}
        <Box>
          <Typography variant="h4" color="text.primary">
            {data.first_name + " " + data.last_name}
          </Typography>
          <Typography
            variant="body2"
            textTransform="uppercase"
            color="info.main"
          >
            {data.user_type}
          </Typography>
        </Box>
        {/* Divider for separation */}

        {/* Adds margin for spacing around the divider */}
        {/* Rank Section */}
        <Box>
          <Typography variant="body2" color="secondary">
            Rank
          </Typography>
          <Typography
            variant="h6"
            textTransform="uppercase"
            color="text.primary"
          >
            {data.rank}
          </Typography>
        </Box>
        {/* Divider for separation */}

        {/* Action Buttons */}
        <Box display="flex" gap={2}>
          {auth.id !== userId ? (
            <>
              <MessageButton id={userId} />
              <Button
                variant="outlined"
                color="primary"
                sx={{ textTransform: "none" }}
                onClick={() => {
                  window.location.href = "mailto:" + data.email;
                }}
              >
                Send Email
              </Button>
            </>
          ) : state.image === null ? (
            <Button
              variant="outlined"
              color="primary"
              sx={{ textTransform: "none" }}
              onClick={() => {
                cvRef.current.click();
              }}
            >
              Upload Resume
            </Button>
          ) : (
            <>
              <Button color="primary" onClick={uploadCV} variant="contained">
                save
              </Button>
              <Button color="secondary" onClick={reset} variant="contained">
                cancel
              </Button>
              <PictureAsPdfIcon />
            </>
          )}
          <input
            ref={cvRef}
            type="file"
            name="CV"
            onChange={uploadImage}
            style={{ display: "none" }}
          />

          {data.CV !== null && (
            <>
              <Button
                variant="outlined"
                color="primary"
                sx={{ textTransform: "none" }}
                component={Link}
                to={"http://localhost:3000/" + data.CV}
              >
                Download Resume
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={deleteCV}
                sx={{ textTransform: "none" }}
              >
                Delete Resume
              </Button>
            </>
          )}
        </Box>
        <Divider sx={{ marginY: 2 }} />
      </Box>
    </>
  );
};

export default UserInfo;
