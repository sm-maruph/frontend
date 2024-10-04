import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import useFetch from "../../CustomHooks/useFetch";

function ConnectButton(alumniId) {
  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [responseMessage, setResponseMessage] = useState(""); // State for response message

  // Check if the user is already connected to the alumni
  const { data, isLoading, isError } = useFetch({
    url: "http://localhost:3000/alumni/connectioncheck",
    queryKey: ["alumniconnectioninfo", alumniId],
    params: {
      alumniId: alumniId, // Pass the alumniID to the params
    },
  });

  useEffect(() => {
    if (data) {
      setIsConnected(data.isConnected); // Assuming the API returns { isConnected: true/false }
    }
  }, [data]);

  // Check if the user has sent a request and it is pending
  const {
    data: pendingData,
    isLoading: isPendingLoading,
    isError: isPendingError,
  } = useFetch({
    url: "http://localhost:3000/alumni/pendingconnectioncheck",
    queryKey: ["alumnipendingconnectioninfo", alumniId],
    params: { alumniId },
  });

  useEffect(() => {
    if (pendingData) {
      setIsPending(pendingData.isPending); // Assuming the API returns { isPending: true/false }
    }
  }, [pendingData]);

  // Check if the user has sent a request and it id wait for accept
  const {
    data: acceptData,
    isLoading: isAcceptLoading,
    isError: isAcceptError,
  } = useFetch({
    url: "http://localhost:3000/alumni/acceptcheck",
    queryKey: ["alumniacceptconnectioninfo", alumniId],
    params: { alumniId },
  });

  useEffect(() => {
    if (acceptData) {
      setIsAccept(acceptData.isAccept); // Assuming the API returns { isPending: true/false }
    }
  }, [acceptData]);

  // console.log(alumniId);
  //end

  const handleConnect = async () => {
    setOpenModal(true);
  };

  //for Connect request
  const handleConfirmConnect = () => {
    if (!alumniId) {
      console.error("No alumniId selected!");
      return;
    }
    submitConnect();

    setOpenModal(false); // Close modal after confirming
  };

  const queryClient = useQueryClient();

  const mutation = useFetch({
    url: "http://localhost:3000/alumni/connect",

    params: {
      alumniId,
      message,
    },
    method: "Post",
  });

  const submitConnect = () => {
    mutation.mutate(undefined, {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["alumniinfo"]);
        queryClient.refetchQueries(["alumniinfo"]);
        reset();
      },
    });
  };
  console.log(mutation.error);

  return (
    <>
      {isConnected ? (
        <Button variant="outlined" color="success" disabled>
          Connected
        </Button>
      ) : isAccept ? (
        <Button variant="outlined" color="success" disabled>
          Request Pending
        </Button>
      ) : isPending ? (
        <Button variant="outlined" color="warning" disabled>
          Check My Request
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "auto" }}
          onClick={handleConnect}
        >
          Connect
        </Button>
      )}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Send a Connection Request
          </Typography>
          <TextField
            id="message"
            label="Message"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={handleConfirmConnect} // No direct invocation here
          >
            Confirm Connect Request
          </Button>
          {responseMessage && ( // Render the response message if it exists
            <Typography variant="body1" sx={{ marginTop: 2, color: "green" }}>
              {responseMessage}
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default ConnectButton;
