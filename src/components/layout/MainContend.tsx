import styles from './layout.module.css';
import SettingsMenu from './SettingsMenu';  // importa el menú

export default function MainContent() {
  return (
    <main className="relative flex flex-col justify-between flex-grow p-8 bg-[#121417] text-white max-w-5xl mx-auto min-h-screen">
      
      {/* Botón menú en esquina derecha arriba */}
      <div className="absolute top-4 right-4 z-50">
        <SettingsMenu />
      </div>

      <div className="flex-grow flex items-center justify-center text-center">
        <h2 className={`${styles.textShadowWhite} text-6xl font-extrabold max-w-full`}>
          Bienvenido Sebastián,<br />
          ¿Qué idea tienes hoy?
        </h2>
      </div>

      <form className={styles.formCentered}>
        <input
          type="text"
          placeholder="Escribe lo que necesites..."
          className={`${styles.inputBig} flex-grow font-semibold rounded-full bg-transparent`}
        />

        <button
          type="submit"
          className="ml-10 bg-gray-700 hover:bg-gray-600 p-4 rounded-full transition-colors duration-300 shadow-md"
          aria-label="Enviar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 10l7-7 7 7M12 3v18" />
          </svg>
        </button>
      </form>
    </main>
  );
}
