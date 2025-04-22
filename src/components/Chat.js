import { useState, useEffect } from "react";
import { Card, Form, Button, Spinner, Navbar, Nav, Dropdown, Modal } from "react-bootstrap";
import { FaRobot, FaPaperPlane, FaFileUpload, FaPlus, FaTimes, FaBars, FaUserCircle } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import '../App.css';
import logoh from '../assets/carb-high-resolution-logo-transparent (2).png';

const Chat = () => {
  const navigate = useNavigate();

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [username, setUsername] = useState("");

  // Load username on mount
  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) setUsername(user);
  }, []);

  // Ensure a chat exists on first load
  useEffect(() => {
    if (chats.length === 0) {
      const newChat = createNewChat();
      setChats([newChat]);
      setMessages(newChat.messages);
    } else {
      setMessages(chats[currentChatIndex]?.messages || []);
    }
  }, []);

  // Keep chat history synced
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    setMessages(chats[currentChatIndex]?.messages || []);
  }, [currentChatIndex]);

  const createNewChat = () => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
    return {
      date: formattedDate,
      messages: [{ sender: "bot", text: "Hello, how can I assist you today?" }],
    };
  };

  const startNewChat = () => {
    const newChat = createNewChat();
    setChats((prev) => [...prev, newChat]);
    setCurrentChatIndex(chats.length); // new chat at end
  };

  const switchChat = (index) => {
    setCurrentChatIndex(index);
  };

  const removeChat = (index) => {
    const updated = chats.filter((_, i) => i !== index);
    setChats(updated);
    if (index === currentChatIndex) {
      setCurrentChatIndex(0);
    } else if (index < currentChatIndex) {
      setCurrentChatIndex((prev) => prev - 1);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const token = localStorage.getItem("token");
    const userMessage = { sender: "user", text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("https://carbot-75uf.onrender.com/chatPsy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) throw new Error("Server error");
      const data = await response.json();

      const botMessage = { sender: "bot", text: data.response };
      const updatedMessages = [...newMessages, botMessage];
      setMessages(updatedMessages);

      setChats((prev) => {
        const updated = [...prev];
        updated[currentChatIndex].messages = updatedMessages;
        return updated;
      });
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error reaching the server." }]);
    }

    setInput("");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" className="shadow-lg">
        <Navbar.Brand className="text-white mx-8 font-bold">
          <img src={logoh} alt="Logo" className="w-96 h-auto" />
        </Navbar.Brand>
        <Nav className="ml-auto flex p-4 items-center justify-end">
          <Dropdown align="end" className=" bg-gray-100 rounded-lg shadow-lg">
          <Dropdown.Toggle variant="outline-success" className="flex">
  <FaUserCircle size={30} className="mr-4" />
  <span className="font-anton  text-xl">{username || "Username"}</span>
</Dropdown.Toggle>

<Dropdown.Menu variant="dark" className="w-48 my-2 rounded-lg shadow-lg">
              <Dropdown.Item
                className="hover:bg-green-600 hover:text-white"
                onClick={() => navigate("/profile")}
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Item
                className="hover:bg-gray-600 hover:text-red-500"
                onClick={() => { localStorage.clear(); navigate("/"); }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>

      {/* Main Content */}
      <div className="flex h-full p-6">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-950 text-white p-5 rounded-lg shadow-lg">
          <div className="flex items-center justify-center">
            <h2 className="font-semibold text-xl">Chat History</h2>
            <Button variant="outline-light" onClick={startNewChat} className="my-3 ml-auto text-green-500 hover:text-white">
              <FaPlus />
            </Button>
          </div>
          <ul className="space-y-2 my-8">
            {chats.map((chat, index) => (
              <li
                key={index}
                className={`text-xl p-3 flex cursor-pointer rounded-lg ${index === currentChatIndex ? "bg-green-600/35" : "hover:bg-gray-500"}`}
                onClick={() => switchChat(index)}
              >
                Chat {index + 1} - {chat.date}
                <button className="text-red-500 ml-auto hover:text-white" onClick={(e) => { e.stopPropagation(); removeChat(index); }}>
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <Card className="flex-1 ml-6 shadow-lg rounded-lg">
          <Card.Body className="overflow-y-auto h-96 scroll-smooth">
            {messages.map((msg, index) => (
              <div key={index} className={`my-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <div className={`p-3 mx-2 my-2 text-2xl rounded-lg ${msg.sender === "user" ? "bg-green-600" : "bg-gray-900"} text-white inline-block`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-center"><Spinner animation="border" variant="success" /></div>}
          </Card.Body>

          <Card.Footer className="flex rounded-xl border items-center gap-3 p-4">
            <Form.Control
              className="rounded-xl border-2 border-black"
              type="text"
              placeholder="Ask me now ..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full">
              <FaPaperPlane />
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
