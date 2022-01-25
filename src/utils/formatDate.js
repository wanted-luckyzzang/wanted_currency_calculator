const formatDate = (timestamp) => {
  const monthArr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const today = new Date(timestamp);

  const year = today.getFullYear();
  const month = monthArr[today.getMonth()]; // 1월은 0으로 표현됨 (0~11)
  const day = today.getDate();
  return `${year}-${month}-${day}`;
};

export default formatDate;
