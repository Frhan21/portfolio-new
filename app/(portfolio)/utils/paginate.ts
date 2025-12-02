export const paginate = <T>(data: T[], page: number, size: number) => {
  const start = (page - 1) * size;
  const end = start + size;

  return {
    items: data.slice(start, end),
    totalItems: data.length,
    totalPages: Math.max(1, Math.ceil(data.length / size)),
    startPage: start + 1,
    endPage: Math.min(end, data.length),
  };
};
