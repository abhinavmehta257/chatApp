const moment = require("moment");

let generateMessage = (from, text)=>{
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};
let generateLocationMessage = (from, lat, lon)=>{
    return {
        from,
        url:`https://www.google.com/maps?q=${lat},${lon}`,
        createdAt: moment().valueOf()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
} ;