"use client";

import { useState } from "react";

export default function SettingsMenu() {
  const [open, setOpen] = useState(false);

  const handleDeleteSession = async () => {

    
    const cookie = await fetch('/api/cookie');
    const cookieData = await cookie.json();

    const userId = cookieData.userId; // Asegúrate de que el formato del cookie sea correcto



    try {
      const response = await fetch(`/api/cookie/`, {
        method: "DELETE",
      });
      // Verifica si la respuesta fue exitosa
      console.log("Response from delete session:", response);
      
      if (!response.ok) {
        throw new Error("Error al eliminar la sesión");
      }
      // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito

      location.reload(); // Recargar la página para reflejar el cambio de sesión

    } catch (error) {
      console.error("Error al eliminar la sesión:", error);
    }
  }

  return (
    <>
      {/* Botón hamburguesa fijo en la esquina superior derecha */}
      <button onClick={() => setOpen(!open)} className="fixed top-4 right-4 z-[9999] white flex items-center gap-2 p-3 bg-[#2E2F33] rounded-md text-white focus:outline-none min-w-[140px] min-h-[40px] shadow-lg" aria-label="Toggle settings menu">
        <div className="space-y-1">
          <span className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`}/>
          <span className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}/>
          <span className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${open ? "-rotate-45 -translate-y-1.5" : ""}`}/>
        </div>
        <span className="font-semibold text-white select-none">Configuración</span>
      </button>

      <div
        className={`fixed top-12 right-8 z-40 w-48 bg-[#2E2F33] p-6 rounded-md text-sm text-white shadow-md transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="mb-2 cursor-pointer" onClick={() => setOpen(false)}>❓ Help</div>
        <div className="text-red-400 cursor-pointer white text-white" onClick={handleDeleteSession}>🚪 Logout Account</div>
      </div>
    </>
  );
}
