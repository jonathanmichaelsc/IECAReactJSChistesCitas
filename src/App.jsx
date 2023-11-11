import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [chisteOFrase, setChisteOFrase] = useState("");
  const [cargando, setCargando] = useState(false);

  const obtenerChisteOFrase = async () => {
    setCargando(true);

    try {
      const respuesta = await fetch("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo obtener un chiste o frase");
      }

      const datos = await respuesta.json();
      setChisteOFrase(datos.joke);
    } catch (error) {
      console.error(error);
      setChisteOFrase("Error al obtener un chiste o frase");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerChisteOFrase();
  }, []);

  return (
    <>
      <h1>Chiste o Frase Aleatoria</h1>
      <div className="card">
        <button onClick={obtenerChisteOFrase}>
          Obtener Chiste o Frase
        </button>
        {cargando ? (
          <p>Cargando...</p>
        ) : (
          <p>{chisteOFrase}</p>
        )}
      </div>
    </>
  );
}

export default App;
