const CommonHelper = () => {


  const formatDate = (inputDateString: string) => {
    const date = new Date(inputDateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  return {
    formatDate,
  };
}

export default CommonHelper;
