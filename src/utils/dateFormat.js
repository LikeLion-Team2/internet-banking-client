// 날짜 포맷 변환 함수

// YYYY.MM.DD hh:mm:ss 형식으로 포맷팅
export const formatDateLong = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${String(date.getFullYear())}.${String(
      date.getMonth() + 1
    ).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(
      date.getHours()
    ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(
      date.getSeconds()
    ).padStart(2, '0')}`;
    return formattedDate;
  };
  
  // MM.DD 형식으로 포맷팅
  export const formatDateShort = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}.${String(date.getDate()).padStart(2, '0')}`;
    return formattedDate;
  };
  