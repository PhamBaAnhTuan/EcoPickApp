export const formatDateTime = (dateInput?: string | number | Date): string => {
	if (!dateInput) return "";

	const date = new Date(dateInput);

	// Kiểm tra xem date parse ra có hợp lệ không
	if (isNaN(date.getTime())) {
		return "Invalid Date";
	}

	// Hàm phụ để thêm số 0 ở đầu (ví dụ: 9 -> 09)
	const padZero = (num: number): string => num.toString().padStart(2, "0");

	const day = padZero(date.getDate());
	const month = padZero(date.getMonth() + 1); // getMonth() bắt đầu từ 0 nên phải + 1
	const year = date.getFullYear();

	const hours = padZero(date.getHours()); // 24-hour format
	const minutes = padZero(date.getMinutes());
	const seconds = padZero(date.getSeconds());

	return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
