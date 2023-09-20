import React, { useState, useEffect, useRef } from 'react';
import Lawyers from './indianLawyersData';
import './Chat.css';
import axios from 'axios';
import { allLawyersRoute, allUsersRoute, getLawyerRoute, getUserRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';
import { storage } from '../firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { host, recieveMessageRoute, sendMessageRoute } from '../utils/APIRoutes';


const ChatL = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [prog, setProg] = useState("0")
  const [msg, setMsg] = useState("");
  const [type, setType] = useState(null);
  const [link, setLink] = useState(null)
  const scrollRef = useRef();
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [selectedChat, setSelectedChat] = useState(null);
  const [input, setInput] = useState('');
  const [users, setUsers] = useState(null);
  const [lawyer, setLawyer] = useState(null)

  // const sendDocument = () => {
  //   // Open a file picker dialog
  //   const fileInput = document.createElement('input');
  //   fileInput.type = 'file';
  //   fileInput.accept = '.pdf,.doc,.docx,.txt'; // Specify allowed file types
  //   fileInput.style.display = 'none';

  //   // Listen for file selection
  //   fileInput.addEventListener('change', (event) => {
  //     const selectedFile = event.target.files[0];

  //     if (selectedFile) {
  //       // Create a message object for the document
  //       const documentMessage = {
  //         sender: 'User1', // Replace with the sender's ID or name
  //         type: 'document',
  //         document: selectedFile,
  //       };

  //       // Add the document message to the selected chat's messages
  //       const updatedMessages = { ...messages };
  //       updatedMessages[selectedChat.id].push(documentMessage);
  //       setMessages(updatedMessages);

  //       // Optionally, you can send the document to a server or perform other actions here
  //     }
  //   });

  //   // Trigger the file picker dialog
  //   fileInput.click();
  // };


  // const handleFooterButtonClick = () => {
  //   // Add your logic here for what should happen when the footer button is clicked
  //   // For example, you can navigate to another page or perform some action.
  // };

  // const sendMessage = () => {
  //   if (input.trim() === '') return;

  //   const newMessage = {
  //     sender: 'User1', // Replace with the sender's ID or name
  //     text: input,
  //   };

  //   // Add the new message to the selected chat's messages
  //   const updatedMessages = { ...messages };
  //   updatedMessages[selectedChat.id].push(newMessage);
  //   setMessages(updatedMessages);

  //   setInput('');
  // };

  // useEffect(() => {
  //   let timer;

  //   const simulateIncomingMessage = () => {
  //     if (selectedChat) {
  //       const newMessage = {
  //         sender: selectedChat.id,
  //         text: 'Hello, this is a received message!',
  //       };

  //       // Add the new message to the selected chat's messages
  //       const updatedMessages = { ...messages };
  //       updatedMessages[selectedChat.id].push(newMessage);
  //       setMessages(updatedMessages);
  //     }
  //   };

  //   const startIncomingMessageSimulation = () => {
  //     timer = setInterval(simulateIncomingMessage, 9000);
  //   };

  //   const stopIncomingMessageSimulation = () => {
  //     clearInterval(timer);
  //   };

  //   if (selectedChat && selectedChat.id !== 'User1') {
  //     // Start simulation only when a chat is selected and it's not the User1 chat
  //     startIncomingMessageSimulation();
  //   } else {
  //     stopIncomingMessageSimulation();
  //   }

  //   return () => {
  //     stopIncomingMessageSimulation();
  //   };
  // }, [messages, selectedChat]);

  // const handleChatSelection = (person) => {
  //   setSelectedChat(person);

  //   // Initialize messages for the selected chat if not already done
  //   // if (!messages[person.id]) {
  //   //   setMessages({
  //   //     ...messages,
  //   //     [person.id]: [],
  //   //   });
  //   // }
  // };

  const fetchLawyer = async () => {
    try {
      const lawyerid = await JSON.parse(localStorage.getItem("nayay"))._id
      const response = await axios.get(`${getLawyerRoute}/${lawyerid}`)
      if (response) {
        setLawyer(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(allUsersRoute)
        if (response) {
          setUsers(response.data)
          console.log(response.data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchUsers()
    fetchLawyer()
  }, [])

  useEffect(() => {
    if (!localStorage.getItem("nayay")) {
      navigate("/login");
    } else {
      setCurrentUser(
        JSON.parse(
          localStorage.getItem("nayay")
        )
      );
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("newUser", currentUser?._id);
    }
  }, [currentUser]);

  const fun = async () => {
    const data = await JSON.parse(
      localStorage.getItem("nayay")
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data?._id,
      to: currentChat?._id,
    });
    setMessages(response.data);
    console.log(response.data)
  }

  useEffect(() => {
    fun();
  }, [currentChat]);


  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem("nayay")
    );
    socket.current.emit("send-msg", {
      to: currentChat?._id,
      from: data._id,
      message: msg
    });

    await axios.post(sendMessageRoute, {
      to: currentChat?._id,
      from: data._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  const handleSendFile = async () => {
    const data = await JSON.parse(
      localStorage.getItem("nayay")
    );
    socket.current.emit("send-file", {
      to: currentChat?._id,
      from: data._id,
      file: link,
      type: type
    });

    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat?._id,
      file: link,
      type: type
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, file: link, type: type });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (message) => {
        console.log(message)
        setArrivalMessage({ fromSelf: false, message: message });
      });
    }
  });

  useEffect(() => {
    if (socket.current) {
      socket.current.on("file-recieve", ({ file, type }) => {
        setArrivalMessage({ fromSelf: false, file: file, type: type });
      });
    }
  });

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // useEffect(() => {
  //    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const uploadImage = (file, type) => {
    if (file) {
      setType(type)
      const name = Date.now()
      setLoading(true)
      const storageRef = ref(storage, `data/${type}/${name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProg(progress)
        console.log("Profile photo upload is " + progress + "% done")
      }, (error) => {
        console.log(error.message)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setLink(downloadURL)
          console.log("File available at", downloadURL)
          console.log(link)
          if (!link) setProg("try again")
          else setProg("0")
          setLoading(false)

        })
      })
    }
  }

  const sendChat = async () => {
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
    if (link) {
      handleSendFile();
    }
  }

  return (
    <div className='main-name-div'>
      <div className='main-name-div-heading'>
        <h1> Select,<b> Connect </b> and Resolve</h1>
      </div>
      <div className="chat-container">
        <div className="connected-people">
          {/* Connected Users List */}
          <h2>Connected Users</h2>
          <ul>
            {/* {users?.filter(user => lawyer?.users.includes(user._id)).map(u => (
              <>
                <div className='hover:cursor-pointer' onClick={() => setCurrentChat(u._id)}>{u.name}</div>
              </>
            ))} */}
            {users?.filter(user => lawyer?.users.includes(user._id)).map((person) => (
              <li key={person.id}>
                <div className="user-info">
                  <div className="user-info-display-picture">
                    <img src='/images/images1.jpg' alt={'#'} className="user-avatar" />
                  </div>
                  <div className="user-info-display-picture">
                    <span className="user-name">{person.name}</span>
                  </div>
                </div>
                <button className="message-button" onClick={() => setCurrentChat(person)}>
                  Message
                </button>
              </li>
            ))}
          </ul>
        </div>
        {currentChat && (
          <div className="chat">
            {/* Chat Header */}
            <div className="chat-header">
              <div className="user-info">
                {/* <img src={`/${selectedChat.id}-avatar.png`} alt={selectedChat.name} className="user-avatar-chat" /> */}
              </div>
              <div className='user-connected-name'><span className="user-name-chat">{currentChat?.name}</span></div>
              <div className="call-buttons">
                <button className="call-button circular">#</button>
                <button className="call-button circular">@</button>
              </div>
            </div>
            {/* Chat Messages */}
            <div className="chat-messages">
              {messages?.map((message, index) => (
                <div
                  key={index}
                  className={`message w-fit max-w-[200px] ${message.fromSelf ? 'sent self-end ' : 'received'}`}
                >
                  {message.file ?
                    <>
                      <a download={`nayaymitra.${message.type}`} href={message.file}>download</a>
                      {message.type === "png" ?
                        <img className='h-20 w-20' src={message.file} alt='p' /> :
                        <embed className='h-20 w-20' src={message.file} />
                      }
                    </>

                    : message.message}
                </div>
              ))}
            </div>
            {/* Chat Input */}
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
              />
              <input
                type="file"
                onChange={(e) => uploadImage(e.target.files[0], "png")}
                accept='image/png'
                hidden
                id='img'
              />
              <input
                type="file"
                onChange={(e) => uploadImage(e.target.files[0], "pdf")}
                accept='application/pdf'
                hidden
                id='pdf'
              />
              <button className="doc-button" onClick={() => document.getElementById('pdf').click()}>Pdf</button>
              <button className="doc-button" onClick={() => document.getElementById('img').click()}>image</button>

              <button onClick={sendChat} className="send-button" disabled={loading} >{loading ? prog : "Send"}</button>
            </div>
          </div>
        )}
      </div>
      <div className="footer-button-to-go-back" onClick={() => navigate('/chatl')}>
        More Legal Expert
      </div>
    </div>
  );
};

export default ChatL;
