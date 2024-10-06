import React, { useState } from "react";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";

const Account = () => {
  const [open, setOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDepositChange = (e) => {
    setDepositAmount(e.target.value);
  };

  const handleDepositSubmit = () => {
    // Add logic for depositing money
    console.log("Deposited amount:", depositAmount);
    handleClose();
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: 4,
        textAlign: "center",
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Your Balance
      </Typography>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        $500.00 {/* This would be dynamic */}
      </Typography>

      <Button variant="outlined" sx={{ marginRight: 1 }} onClick={handleOpen}>
        Deposit Money
      </Button>
      <Button
        variant="contained"
        onClick={() => alert("Withdraw functionality coming soon")}
      >
        Withdraw Money
      </Button>

      {/* Modal for Depositing Money */}
      <Modal open={open} onClose={handleClose}>
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
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Deposit Money
          </Typography>
          <TextField
            label="Amount"
            variant="outlined"
            type="number"
            fullWidth
            value={depositAmount}
            onChange={handleDepositChange}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleDepositSubmit}>
            Deposit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Account;
