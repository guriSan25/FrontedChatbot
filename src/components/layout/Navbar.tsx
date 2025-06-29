import styles from './navbar.module.css';
import { FaRegComments, FaPen, FaShieldAlt } from "react-icons/fa";

export default function Navbar() {
  const chats = [
    "Problema con Docker",
    "Utilizar Next JS",
    "Aprender Python",
    "Ideas proyectos",
    "¿Por qué no usar PHP?",
    "Python y Flask",
    "¿Qué es el modelo relacional?",
  ];

  return (
    <>
      <aside className={styles.navbar}>
        <div className={styles.logo}>
          <FaRegComments size={28} />
          <h1 className="font-bold text-xl">CHAPI</h1>
        </div>

        <button className={styles.newChatButton}>
          <FaPen size={24} />
          <span>Nuevo Chat</span>
        </button>

        <hr className="border-gray-700 mb-6" />

        <nav className={styles.chatList}>
          {chats.map((chat, i) => (
            <button key={i} className={styles.chatItem}>
              <FaRegComments size={20} />
              <span>{chat}</span>
            </button>
          ))}
        </nav>

        <div className={styles.premiumBox}>
          <FaShieldAlt size={26} className="mx-auto mb-1" />
          <p>Acceder al plan premium<br />¡Usa la IA sin límite!</p>
        </div>
      </aside>
    </>
  );
}
