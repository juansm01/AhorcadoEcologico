import React, { useState, useEffect } from "react";
import Modal from "react-responsive-modal";
import world0 from "../assets/world.png";
import world1 from "../assets/world1.png";
import world2 from "../assets/world2.png";
import world3 from "../assets/world3.png";
import world4 from "../assets/world4.png";
import world5 from "../assets/world5.png";
import world6 from "../assets/world6.png";
import Confetti from "./ConfettiComponent";

const Ahorcado = () => {
  const palabras = [
    "reciclaje",
    "basura",
    "contenedor",
    "botella",
    "papel",
    "carton",
    "plastico",
    "vidrio",
    "compost",
    "naturaleza",
    "arbol",
    "energia",
    "sostenible",
    "ecologia",
    "contaminacion",
    "huella",
    "agua",
    "aire",
    "reutilizar",
    "ecosistema",
    "biodiversidad",
    "conservacion",
    "renovable",
    "carbono",
    "reducir",
  ];

  const [palabra, setPalabra] = useState("");
  const [palabraAdivinada, setPalabraAdivinada] = useState([]);
  const [letraIntentada, setLetraIntentada] = useState("");
  const [letrasFalladas, setletrasFalladas] = useState([]);
  const [intentos, setIntentos] = useState(0);
  const [fallos, setFallos] = useState(0);
  const [palabraIngresada, setpalabraIngresada] = useState("");
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);

  const onCloseModalFinish = () => {
    seleccionarPalabra();
    setOpen(false);
  };

  useEffect(() => {
    seleccionarPalabra();
  }, []);

  const seleccionarPalabra = () => {
    const palabraSeleccionada =
      palabras[Math.floor(Math.random() * palabras.length)];
    setPalabra(palabraSeleccionada);
    setPalabraAdivinada(Array(palabraSeleccionada.length).fill(""));
    setIntentos(0);
    setFallos(0);
    setletrasFalladas([]);
    setpalabraIngresada("");
    console.log(palabraSeleccionada);
  };

  const ManejarIntento = () => {
    console.log(fallos);
    if (
      letrasFalladas.includes(letraIntentada) ||
      palabraAdivinada.includes(letraIntentada)
    ) {
      alert("Ya intentaste con esa letra");
    } else {
      if (letraIntentada.length === 1) {
        const nuevaPalabraAdivinada = palabraAdivinada.map((letra, index) => {
          if (palabra[index] === letraIntentada) {
            return letraIntentada;
          } else {
            return letra;
          }
        });

        if (palabraAdivinada.join("") === nuevaPalabraAdivinada.join("")) {
          setletrasFalladas((letrasFalladas) => [
            ...letrasFalladas,
            letraIntentada,
          ]);
          setFallos(fallos + 1);
        }

        setPalabraAdivinada(nuevaPalabraAdivinada);
        setLetraIntentada("");
        setIntentos(intentos + 1);
      }
    }
  };

  const ManejarInputLetra = (event) => {
    setLetraIntentada(event.target.value);
  };

  const ManejarInputPalabra = (event) => {
    setpalabraIngresada(event.target.value);
  };
  const ManejarPalabra = () => {
    if (palabraIngresada === palabra) {
      setPalabraAdivinada(palabra.split(""));
    } else {
      setFallos(fallos + 1);
    }
    setpalabraIngresada("");
  };

  const RenderResultado = () => {
    if (palabraAdivinada.join("") === palabra) {
      onOpenModal();

      return (
        <>
          <Confetti />
          <Modal open={open} onClose={onCloseModalFinish} center>
            <div className="w-1/2">
              <p>¡Ganaste! La palabra correcta era "{palabra}".</p>
              <button className="botonjugar" onClick={seleccionarPalabra}>
                Volver a jugar
              </button>
            </div>
          </Modal>
        </>
      );
    } else if (fallos === 6) {
      return (
        <Modal open={open} onClose={onCloseModalFinish} center>
          <div className="w-1/2">
            <p>¡Perdiste! La palabra correcta era "{palabra}".</p>
            <button className="botonjugar" onClick={seleccionarPalabra}>
              Volver a jugar
            </button>
          </div>
        </Modal>
      );
    }
  };

  return (
    <div className="contenedor w-full sm:w-96 sm:justify-center">
      <div className="header">
        <h1 className="font-bold text-2xl">Adivina la palabra ecológica</h1>
      </div>
      <div className="palabra">
        {palabraAdivinada.map((letra, index) => (
          <div
            key={index}
            className={`letra ${
              palabraAdivinada.length <= 5
                ? "letra-pequena"
                : palabraAdivinada.length <= 8
                ? "letra-mediana"
                : "letra-grande"
            }`}
          >
            {letra}
          </div>
        ))}
      </div>
      <div className="content">
        <div className="datos ">
          <div className="intentos">
            <p className="text-md  text-white">Intentos restantes:</p>
            <p className="text-white">{6 - fallos}</p>
          </div>
          <div className="letrasincorrectas">
            <p className="text-md text-white mt-2 mx-3 h-3/5 ">
              Letras incorrectas:
            </p>
            <div className="w-full h-2/5">
              <p className="text-white overflow-auto ">
                {letrasFalladas.join(", ")}
              </p>
            </div>
          </div>
        </div>
        <div className="cosasimagen">
          <RenderResultado />
          <img
            className="imagen "
            src={
              fallos === 0
                ? world0
                : fallos === 1
                ? world1
                : fallos === 2
                ? world2
                : fallos === 3
                ? world3
                : fallos === 4
                ? world4
                : fallos === 5
                ? world5
                : world6
            }
            alt="mundo"
          />
        </div>
        <div className="cosas">
          <input
            type="text"
            maxLength="1"
            onChange={ManejarInputLetra}
            value={letraIntentada}
            className="w-1/2 py-3 px-5 my-2 border-2 border-gray-300 rounded-md bg-f8f8f8 text-black text-base focus:border-a26924 focus:bg-white outline-none"
          />
          <button
            className="bg-[#a26924] border-none text-white py-3 px-6 text-center no-underline inline-block text-base my-2 mx-1 cursor-pointer rounded-lg transition duration-400 hover:bg-[#6d3916] hover:text-white"
            onClick={ManejarIntento}
          >
            Ingresar letra
          </button>
        </div>
        <div className="cosas">
          <input
            type="text"
            onChange={ManejarInputPalabra}
            value={palabraIngresada}
            className="w-1/2 py-3 px-5 my-2 border-2 border-gray-300 rounded-md bg-f8f8f8 text-black text-base focus:border-a26924 focus:bg-white outline-none"
          />
          <button
            className="bg-[#a26924] border-none text-white py-3 px-6 text-center no-underline inline-block text-base my-2 mx-1 cursor-pointer rounded-lg transition duration-400 hover:bg-[#6d3916] hover:text-white"
            onClick={ManejarPalabra}
          >
            Ingresar palabra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ahorcado;
