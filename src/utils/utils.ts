export const getRandomPages = (
  totalPages: number,
  count: number = 4
): number[] => {
  const pages = new Set<number>();

  while (pages.size < count) {
    const randomPage = Math.floor(Math.random() * totalPages) + 1;
    pages.add(randomPage);
  }

  return Array.from(pages);
};
