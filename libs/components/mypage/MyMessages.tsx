import { useState } from "react";
import { TextField, IconButton, Avatar, Stack, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MyMessages = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, message]);
      setMessage("");
    }
  };

  return (
    <Stack className="wrapper">
      <Box className="container1">
        <Box className="left">
          <Box className="top">
            <input placeholder="Search" className="searchInput" />
          </Box>
          <ul className="people">
            <li className="person">
              <Avatar src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg" />
              <span className="name-txt">Thomas</span>
            </li>
            <li className="person">
              <Avatar src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/adam.jpg" />
              <span className="name-txt">Adam</span>
            </li>
          </ul>
        </Box>
        <Box className="right">
          <Box className="top">
            <span>
              To: <b>Thomas</b>
            </span>
          </Box>
          <Box className="chat">
            <Box className="bubbleWrapper">
              {messages.map((msg, idx) => (
                <Box key={idx} className="bubble">
                  {msg}
                </Box>
              ))}
            </Box>
          </Box>
          <Box className="write">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message"
              className="input"
            />
            <IconButton color="primary" onClick={handleSend}>
              <SendIcon sx={{ color: "blue" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default MyMessages;
