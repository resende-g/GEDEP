const longDate = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(value: string | Date) {
  const date =
    typeof value === "string" ? new Date(`${value.slice(0, 10)}T12:00:00Z`) : value;
  return longDate.format(date);
}

export function formatTime(value: string | null) {
  return value ? value.slice(0, 5).replace(":", "h") : "Horário a definir";
}

export const STATUS_LABELS = {
  scheduled: "Agendado",
  confirmed: "Confirmado",
  completed: "Realizado",
  cancelled: "Cancelado",
  to_be_defined: "A definir",
} as const;
