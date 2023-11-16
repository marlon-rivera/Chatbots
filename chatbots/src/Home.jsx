import bot from "./static/t.png";
import styles from "./Home.module.css";
import { useState } from "react";
import Chat from "./Chat";
function Home() {
  const [inChat, setInChat] = useState(false);
  const [port, setPort] = useState()

  const chatPython = () => {
    setPort(5000)
    setInChat(true);
  };

  const chatOneCorpus = () => {
    setPort(5001)
    setInChat(true);
  };

  const chatVariousCorpus = () => {
    setPort(5002)
    setInChat(true);
  };

  return (
    <div className={styles.containerHome}>
      <div className={styles.containerBot}>
        <h1 className={styles.title}>CHATBOT</h1>
        <img className={styles.img} src={bot} alt="bot" />
      </div>
      {!inChat ? (
        <Info
          chatPython={chatPython}
          chatOneCorpus={chatOneCorpus}
          chatVariousCorpus={chatVariousCorpus}
        />
      ) : (
        <Chat port={port} setInChat={setInChat} />
      )}
    </div>
  );
}

function Info(props) {
  return (
    <div className={styles.containerOptions}>
      <p className={styles.p}>
        Hola 👋, estamos emocionados de <br /> presentarte nuestras tres
        increíbles
        <br />
        opciones de chatbot. 🤖💬 Descubre <br /> respuestas rápidas, asistencia{" "}
        <br />
        personalizada y soluciones a medida.
        <br /> ¿Listo para una experiencia de <br />
        conversación única? Elige tu chatbot y <br /> déjanos llevarte a un
        viaje de <br />
        interacción inteligente. 💡✨ <br /> ¡Adelante, elige tu opción y
        hagamos <br />
        magia juntos! 💻🚀
      </p>
      <button onClick={() => props.chatPython()} className={styles.button}>
        Python
      </button>
      <button onClick={() => props.chatOneCorpus()} className={styles.button}>
        1 Usuario
      </button>
      <button
        onClick={() => props.chatVariousCorpus()}
        className={styles.button}
      >
        Varios Usuarios
      </button>
    </div>
  );
}

export default Home;
// #6CD3FF
