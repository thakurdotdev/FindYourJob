export const formatDate = (updatedAt) => {
  const currentDate = new Date();
  const updatedDate = new Date(updatedAt);
  const timeDiff = currentDate.getTime() - updatedDate.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  if (dayDiff < 1) {
    const hourDiff = Math.floor(timeDiff / (1000 * 3600));
    if (hourDiff < 1) {
      const minuteDiff = Math.floor(timeDiff / (1000 * 60));
      return `${minuteDiff} minutes ago`;
    } else {
      return `${hourDiff} hours ago`;
    }
  } else if (dayDiff < 30) {
    return `${dayDiff} days ago`;
  } else if (dayDiff < 365) {
    const monthDiff = Math.floor(dayDiff / 30);
    return `${monthDiff} months ago`;
  } else {
    const yearDiff = Math.floor(dayDiff / 365);
    return `${yearDiff} years ago`;
  }
};
