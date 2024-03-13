export const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  const formattedDay = date.getDate().toString().padStart(2, "0");
  const formattedMonth = (date.getMonth() + 1).toString().padStart(2, "0");
  const formattedYear = date.getFullYear();
  return `${formattedYear}.${formattedMonth}.${formattedDay}`;
};

export const filterDataByDate = (data: any[], startDate: string, endDate: string) => {
  return data.filter((item) => {
    const formateDate = formatDate(item);
    const itemDate = new Date(formateDate).getTime();
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    return itemDate >= start && itemDate <= end;
  });
};
