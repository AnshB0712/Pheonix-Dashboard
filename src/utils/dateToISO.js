function dateToISO(utc) {
  const date = new Date(utc);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  };
  return date.toLocaleString('en-IN', options);
}

export default dateToISO;
