import styles from "./Chat.module.css";
import { useState, useRef, useEffect } from "react";
import send from "./static/send.png";
import back from "./static/backChat.png";

function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  let chatEndRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:${props.port}/start`, {
      method: "GET",
    })
      .then((r) => r.json())
      .then((r) => {
        setMessages([r]);
      });
  }, [props.port]);

  const scrollToBottom = () => {
    chatEndRef.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e) => {
	messages.push({message, from : "user"})
	setMessages(messages)
	setMessage("")
    fetch(`http://localhost:${props.port}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    })
      .then((r) => r.json())
      .then((r) => {
        setMessages((prev) => [...prev, r])
		setMessage("")
      });
  };

  useEffect(() => {
    scrollToBottom();
  });

  const pressEnter = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={styles.containerChat}>
      <div className={styles.chat}>
        <div className={styles.contentChat}>
          <div className={styles.headerChat}>
            <img
              src={back}
              onClick={() => props.setInChat(false)}
              alt="back"
              className={styles.back}
            />
            <div>
              <p className={styles.chatty}>Chatty</p>
            </div>
          </div>
          <div className={styles.content}>
            {messages.map((m, i) => {
              if (m.from === "chatty") {
                return (
                  <div key={i} className={styles.messageChatty}>
                    <p>{m.message}</p>
                    <div className={styles.triangleMessageChatty}></div>
                  </div>
                );
              } else {
                return (
                  <div key={i} className={styles.messageOwn}>
                    <p>{m.message}</p>
                    <div className={styles.triangleMessageOwn}></div>
                  </div>
                );
              }
            })}
            <div
              style={{ float: "left", clear: "both" }}
              ref={(el) => {
                chatEndRef = el;
              }}
            ></div>
          </div>
          <div className={styles.footer}>
            <div className={styles.input}>
              <input
                onKeyDown={(e) => pressEnter(e)}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={styles.inputText}
              />
              <img
                src={send}
                alt="send"
                onClick={(e) => sendMessage(e)}
                className={styles.send}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
