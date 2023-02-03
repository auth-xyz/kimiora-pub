export function _sc(service?: string) {
    return console.log(`[Kimiora] :: Sucessfully connected with ${service}`)
};

export function _fl(err?: string) {
    return new Error(`[Kimiora] :: Something went wrong...\n${err}`);
};