let expect = require("expect");

var {generateMessage} = require('./message.js');

describe('generate message',()=>{
    it("should generate correct message",()=>{
        let from = "abhinav",
            text = "random text",
            message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({from,text});
    })
})