import {
  Box,
  Typography,
  TextField,
  Button,
  LinearProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ChatGpt = () => {
  const [prompt, setPrompt] = useState("");
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const getAi = async (e) => {
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAesmELizadSd8aTah_PuQXR7s78e7-YUI",
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }
      );
      const aiText = response.data.candidates[0].content.parts[0].text;

      // Convert markdown-like text to HTML
      let html = aiText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      html = html.replace(/^\*\s+/gm, "<li>").replace(/\s*$/, "</li>");
      html = html.replace(/(<li>.*<\/li>\s*){2,}/g, "<ul>$&</ul>");

      setText(html);
    } catch (error) {
      console.error(error.response);
    }
  };
  const mutation = useMutation({
    mutationFn: getAi,
    onSuccess: "Succcessfull",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  if (mutation.isPending) {
    return (
      <Box
        padding={6}
        marginTop={2}
        borderRadius={2}
        border="2px solid #EBEBEB"
      >
        <LinearProgress />
      </Box>
    );
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      padding={4}
      marginBottom={2}
      marginTop={2}
      borderRadius={2}
      border="2px solid #EBEBEB"
    >
      <Typography variant="h5" textTransform="uppercase" textAlign="center">
        Generative AI for Students
      </Typography>
      <hr />
      <Box
        padding={2}
        marginBottom={2}
        marginTop={2}
        borderRadius={2}
        border="2px solid #EBEBEB"
      >
        <Box component="h4" dangerouslySetInnerHTML={{ __html: text }} />
      </Box>

      <TextField
        value={prompt}
        label="Write Your Question"
        onChange={handleChange}
        fullWidth
        variant="outlined"
        multiline
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Send
      </Button>
    </Box>
  );
};

export default ChatGpt;
