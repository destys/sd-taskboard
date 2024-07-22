// Форматирование времени
export const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins > 0 ? `${mins}m ` : ''}${secs}s`;
};

// Обратная конвертация времени в секунды
export const parseTime = (time: string): number => {
    const timeParts = time.split(' ').filter(Boolean);
    let totalSeconds = 0;

    timeParts.forEach(part => {
        const value = parseInt(part.slice(0, -1), 10);
        if (part.endsWith('h')) {
            totalSeconds += value * 3600;
        } else if (part.endsWith('m')) {
            totalSeconds += value * 60;
        } else if (part.endsWith('s')) {
            totalSeconds += value;
        }
    });

    return totalSeconds;
};