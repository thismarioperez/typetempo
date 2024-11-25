// Pure Fisher-Yates shuffle
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
export const shuffleArray = <T>(array: T[]): T[] => {
    const returnArray: T[] = [...array];
    let oldElement;
    let rand = 0;

    for (let i = returnArray.length - 1; i > 0; i--) {
        rand = Math.floor(Math.random() * (i + 1));
        oldElement = returnArray[i];
        returnArray[i] = returnArray[rand];
        returnArray[rand] = oldElement;
    }

    return returnArray;
};
