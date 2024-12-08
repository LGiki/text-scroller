function padStartForDateTimeValue(dateTimeValue: number): string {
    return dateTimeValue.toString().padStart(2, "0")
}

/**
 * Convert Date to `YYYY-MM-DD HH:mm:ss`
 * @param date 
 * @returns `YYYY-MM-DD HH:mm:ss` string
 */
function dateTimeToString(date: Date): string {
    return `${date.getFullYear()}-${padStartForDateTimeValue(date.getMonth() + 1)}-${padStartForDateTimeValue(date.getDate())} ${padStartForDateTimeValue(date.getHours())}:${padStartForDateTimeValue(date.getMinutes())}:${padStartForDateTimeValue(date.getSeconds())}`;
}

export function getCurrentDateTime(): string {
    return dateTimeToString(new Date())
}