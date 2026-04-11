export function parseDate(dateString: string) {
  // Cria um objeto Date a partir da string fornecida
  const date = new Date(dateString);

  // Retorna o objeto com as propriedades separadas
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // Os meses começam de 0, então somamos 1
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
}
