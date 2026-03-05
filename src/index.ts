import { Especialidade } from "./types/especialidade";
import { Paciente } from "./types/paciente";
import { StatusConsulta } from "./types/statusConsulta";
import { Medico } from "./interfaces/medico";
import { Consulta } from "./interfaces/consulta";


// Especialidades
const cardiologia: Especialidade = {
  id: 1,
  nome: "Cardiologia",
};
const ortopedia: Especialidade = {
  id: 2,
  nome: "Ortopedia",
  descricao: "Tratamento de ossos e articulações",
};
const pediatria: Especialidade = {
  id: 3,
  nome: "Pediatria",
};
// Médicos
const medico1: Medico = {
  id: 1,
  nome: "Dr. Roberto Silva",
  crm: "CRM12345",
  especialidade: cardiologia,
  ativo: true,
};
const medico2: Medico = {
  id: 2,
  nome: "Dra. Ana Paula Costa",
  crm: "CRM54321",
  especialidade: ortopedia,
  ativo: true,
};
const medico3: Medico = {
  id: 3,
  nome: "Dr. João Mendes",
  crm: "CRM98765",
  especialidade: pediatria,
  ativo: true,
};
// Pacientes
const paciente1: Paciente = {
  id: 1,
  nome: "Carlos Andrade",
  cpf: "123.456.789-00",
  email: "carlos@email.com",
};
const paciente2: Paciente = {
  id: 2,
  nome: "Maria Silva",
  cpf: "987.654.321-00",
  email: "maria@email.com",
  telefone: "(11) 98765-4321",
};
const paciente3: Paciente = {
  id: 3,
  nome: "Pedro Santos",
  cpf: "456.789.123-00",
  email: "pedro@email.com",
};

function criarConsulta(
  id: number,
  medico: Medico,
  paciente: Paciente,
  data: Date,
  valor: number
): Consulta {
  return {
    id,
    medico,
    paciente,
    data,
    valor,
    status: "agendada",
  };
}

function confirmarConsulta(consulta: Consulta): Consulta {
  return {
    ...consulta,
    status: "confirmada",
  };
}

function cancelarConsulta(consulta: Consulta): Consulta | null {
  if (consulta.status === "realizada") {
    return null;
  }
  return {
    ...consulta,
    status: "cancelada",
  };
}

function exibirConsulta(consulta: Consulta): string {
  const valorFormatado = consulta.valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return `
Consulta #${consulta.id}
Médico: ${consulta.medico.nome}
Paciente: ${consulta.paciente.nome}
Especialidade: ${consulta.medico.especialidade.nome}
Data: ${consulta.data.toLocaleDateString("pt-BR")}
Valor: ${valorFormatado}
Status: ${consulta.status}
`;
}

// CRIAÇÃO DAS CONSULTAS

// Agendada
const consulta1 = criarConsulta(
  1,
  medico1,
  paciente1,
  new Date("2026-05-10"),
  350
);

// Confirmada
const consulta2Base = criarConsulta(
  2,
  medico2,
  paciente2,
  new Date("2026-06-15"),
  500
);
const consulta2 = confirmarConsulta(consulta2Base);

// Cancelada
const consulta3Base = criarConsulta(
  3,
  medico3,
  paciente3,
  new Date("2026-07-20"),
  200
);
const consulta3 = cancelarConsulta(consulta3Base);

// Realizada
const consulta4Base = criarConsulta(
  4,
  medico1,
  paciente2,
  new Date("2024-01-10"),
  400
);
const consulta4: Consulta = {
  ...consulta4Base,
  status: "realizada",
};

// Agendada
const consulta5 = criarConsulta(
  5,
  medico2,
  paciente3,
  new Date("2026-08-01"),
  300
);

function listarConsultasFuturas(consultas: Consulta[]): Consulta[] {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return consultas.filter((consulta) => {
    const dataConsulta = new Date(consulta.data);
    dataConsulta.setHours(0, 0, 0, 0);

    return dataConsulta >= hoje;
  });
}

const todasConsultas: Consulta[] = [
  consulta1,
  consulta2,
  consulta3!, //estava dando erro e foi utilizado o uso de IA para ajudar a solucionar o problema
  consulta4,
  consulta5,
];

// EXIBIR CONSULTAS

console.log("=== TODAS AS CONSULTAS ===");

todasConsultas.forEach((consulta) => {
  console.log(exibirConsulta(consulta));
});

// LISTAGEM FUTURAS

const consultasFuturas = listarConsultasFuturas(todasConsultas);

console.log("=== CONSULTAS FUTURAS ===");

consultasFuturas.forEach((consulta) => {
  console.log(exibirConsulta(consulta));
});