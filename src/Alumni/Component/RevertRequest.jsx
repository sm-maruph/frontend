import React from 'react'
import { IconButton } from '@mui/material'
import CancelIcon from "@mui/icons-material/Cancel"; // Importing Decline icon
import { useQueryClient } from "@tanstack/react-query";
import useFetch from "../../CustomHooks/useFetch";

function RevertRequest({id}) {
 //for Connect request
 const handleDeclineRequest = (id) => {
  if (!id) {
    console.error("No alumniId selected!");
    return;
  }
  submitConnect();

  // setOpenModal(false);  // Close modal after confirming
};

const queryClient = useQueryClient();

const mutation = useFetch({
  url: "http://localhost:3000/alumni/declinerequest",

  params: {
   id
  },
  method: "Post",
});

const submitConnect = () => {
  mutation.mutate(undefined, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(["alumnirevert"]);
      queryClient.refetchQueries(["alumnirevert"]);
    },
  });
};
console.log(mutation.error);


  return (
    <IconButton
    onClick={() => handleDeclineRequest(id)}
    aria-label="decline"
    color="error"
  >
    <CancelIcon />
  </IconButton>
  )
}

export default RevertRequest