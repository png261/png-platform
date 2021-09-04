export const formatTime = (time: string) => {
    return new Date(time).toLocaleDateString() || time;
};
