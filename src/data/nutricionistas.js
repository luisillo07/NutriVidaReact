import foto1 from "../assets/imagen-nutricionista-1.jpg";
import foto2 from "../assets/imagen-nutricionista-2.jpg";
import foto3 from "../assets/imagen-nutricionista-3.jpg";
import foto4 from "../assets/imagen-nutricionista-4.jpg";

export const nutricionistas = [
  {
    codigo: "NUT001",
    nombre: "Carolina Fuentes M.",
    especialidad: "Obesidad y síndrome metabólico",
    diasAtencion: "Lunes, Miércoles y Viernes",
    diasSemana: [1, 3, 5],
    horaInicio: "09:00",
    horaFin: "17:00",
    descripcion:
      "Nutricionista y Dietista, Universidad de La Frontera (UFRO), Temuco. 9 años de experiencia. Se especializa en manejo del sobrepeso y la obesidad con un enfoque de cambio de hábitos sostenible, sin dietas restrictivas de moda. Trabaja con metas graduales, seguimiento de composición corporal y educación alimentaria familiar. Diplomada en Obesidad y Síndrome Metabólico.",
    imagen: foto1
  },
  {
    codigo: "NUT003",
    nombre: "Daniela Morales C.",
    especialidad: "Alimentación vegetariana, vegana y trastornos alimentarios",
    diasAtencion: "Lunes a Viernes",
    diasSemana: [1, 2, 3, 4, 5],
    horaInicio: "08:00",
    horaFin: "13:00",
    descripcion:
      "Nutricionista, Universidad San Sebastián, sede Concepción. 7 años de experiencia. Especializada en dietas basadas en plantas, asegurando cobertura de nutrientes críticos (proteína, hierro, B12, calcio, omega-3) en pacientes vegetarianos y veganos de todas las edades. Enfoque práctico y culturalmente adaptado a la comida chilena. Diplomada en Nutrición Vegetariana.",
    imagen: foto2
  },
  {
    codigo: "NUT002",
    nombre: "Rodrigo Sepúlveda A.",
    especialidad: "Nutrición deportiva y rendimiento",
    diasAtencion: "Martes, Jueves y Sábado",
    diasSemana: [2, 4, 6],
    horaInicio: "09:00",
    horaFin: "14:00",
    descripcion:
      "Nutricionista, Universidad Mayor, sede Temuco. 6 años de experiencia. Atiende a deportistas recreativos y de rendimiento: planificación de alimentación según carga de entrenamiento, estrategias de recuperación y suplementación responsable. Ha asesorado a clubes deportivos de la región. Diplomado en Nutrición Deportiva y Ejercicio Físico.",
    imagen: foto3
  },
  {
    codigo: "NUT004",
    nombre: "Felipe Araya R.",
    especialidad: "Nutrición pediátrica y familiar",
    diasAtencion: "Martes a Viernes",
    diasSemana: [2, 3, 4, 5],
    horaInicio: "14:00",
    horaFin: "19:00",
    descripcion:
      "Nutricionista, Universidad Mayor, sede Temuco. 5 años de experiencia. Atiende a niños, adolescentes y familias, con enfoque en la nutrición saludable y el desarrollo integral. Ha trabajado en clínicas pediátricas y centros de salud comunitaria. Diplomado en Nutrición Pediátrica y Nutrición Familiar.",
    imagen: foto4
  }
];

export default nutricionistas;
