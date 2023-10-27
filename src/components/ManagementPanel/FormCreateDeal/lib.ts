const config = {
    minLength: 3,
};

export const isValidDealName = (name: string) => {
    return name.length > config.minLength;
};
