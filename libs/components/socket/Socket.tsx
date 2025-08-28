import { userVar } from "@/apollo/store";
import { getSocket, REACT_APP_API_URL } from "@/libs/config";
import { useReactiveVar } from "@apollo/client";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Avatar, IconButton, Badge } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
  memberImage?: string;
}

export default function FloatingChat() {
  const user = useReactiveVar(userVar);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState(user?.memberNick);
  const [open, setOpen] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!user?.memberNick) return;
    setUsername(user.memberNick);

    const socket = getSocket(); // global ulanish
    socketRef.current = socket;

    socket.on("onlineUsers", (count: number) => setOnlineUsers(count));

    socket.on("connect", () => console.log("Connected:", socket.id));

    socket.on("chatMessage", (msg: ChatMessage | ChatMessage[]) => {
      if (Array.isArray(msg)) setMessages(msg);
      else setMessages((prev) => [...prev, msg]);
    });

    return () => {
      // component unmount bo‘lganda faqat eventlarni tozalash
      socket.off("onlineUsers");
      socket.off("chatMessage");
    };
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input || !socketRef.current) return;
    const msg: ChatMessage = {
      sender: username!,
      message: input,
      timestamp: new Date().toISOString(),
      memberImage: user?.memberImage
        ? `${REACT_APP_API_URL}/${user.memberImage}`
        : "/img/profile/defaultUser.svg",
    };
    socketRef.current.emit("sendMessage", msg);
    setInput("");
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999 }}>
      {!open && (
        <Badge badgeContent={onlineUsers} color="success">
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              bgcolor: "#1976d2",
              color: "#fff",
              "&:hover": { bgcolor: "#1565c0" },
            }}
          >
            <ChatIcon />
          </IconButton>
        </Badge>
      )}

      {open && (
        <div
          style={{
            width: 340,
            height: 450,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: 10,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#1976d2",
              color: "#fff",
              padding: "10px 12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            <span>Online Chat ({onlineUsers} users online)</span>
            <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </div>

          <div
            style={{
              flex: 1,
              padding: 10,
              overflowY: "auto",
              backgroundColor: "#f5f5f5",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection:
                    msg.sender === username ? "row-reverse" : "row",
                  alignItems: "flex-start",
                  marginBottom: 10,
                }}
              >
                <Avatar
                  src={
                    ""
                    // msg.memberImage
                    //   ? `${REACT_APP_API_URL}/${msg.memberImage}`
                    //   : "/img/profile/defaultUser.svg"
                  }
                  alt={msg.sender}
                  sx={{
                    width: 32,
                    height: 32,
                    mr: msg.sender === username ? 0 : 1,
                    ml: msg.sender === username ? 1 : 0,
                  }}
                />
                <div
                  style={{
                    width: "100%",
                    backgroundColor:
                      msg.sender === username ? "#1976d2" : "#e0e0e0",
                    color: msg.sender === username ? "#fff" : "#000",
                    borderRadius: "20px 20px",
                    padding: "6px 10px",
                    wordBreak: "break-word",
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: "bold" }}>
                    {msg.sender === username ? "Me" : msg.sender}
                  </div>
                  <div style={{ fontSize: 14 }}>{msg.message}</div>
                  <div style={{ fontSize: 10, textAlign: "right" }}>
                    {moment(msg.timestamp).format("hh:mm A")}
                  </div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div
            style={{ display: "flex", padding: 8, borderTop: "1px solid #ccc" }}
          >
            <input
              style={{
                flex: 1,
                padding: 6,
                borderRadius: "14px",
                border: "1px solid #ccc",
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Send messages..."
            />
            <button
              onClick={sendMessage}
              style={{
                marginLeft: 6,
                backgroundColor: "#1976d2",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              <SendIcon sx={{ display: "flex" }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
