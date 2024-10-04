import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Importing Accept icon
import { useQueryClient } from "@tanstack/react-query";
import useFetch from "../../CustomHooks/useFetch";
import { IconButton } from "@mui/material";


function RequestAcceptButton({ id }) {
  //for Connect request
  const handleConfirmConnect = (id) => {
    if (!id) {
      console.error("No alumniId selected!");
      return;
    }
    submitConnect();

    // setOpenModal(false);  // Close modal after confirming
  };

  const queryClient = useQueryClient();

  const mutation = useFetch({
    url: "http://localhost:3000/alumni/postacceptrequest",

    params: {
     id
    },
    method: "Post",
  });

  const submitConnect = () => {
    mutation.mutate(undefined, {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["alumniconnectingrequestpostinfo"]);
        queryClient.refetchQueries(["alumniconnectingrequestpostinfo"]);
      },
    });
  };
  console.log(mutation.error);
  return (
    <IconButton
      onClick={() => handleConfirmConnect(id)}
      aria-label="accept"
      color="success"
    >
      <CheckCircleIcon />
    </IconButton>
  );
}

export default RequestAcceptButton;
