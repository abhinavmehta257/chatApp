const expect = require("expect");

const {Users} = require("./Users.js");

describe('Users', ()=>{
    let users;

    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id:'1',
            name:'ABHI',
            room:'THE office'
        },{
            id:'5',
            name:'dhol',
            room:'THE office'
        },
        {
            id:'2',
            name:'ani',
            room:'THE club'
        },
        {
            id:'3',
            name:'gull',
            room:'THE bar'
        },
        {
            id:'4',
            name:'cill',
            room:'THE bar'
        }]
    });
     
    it('should add new user', ()=>{
        let users = new Users();
        let user = {
            id:'afasdfas',
            name:'ABHI',
            room:'THE office'
        };
        let reUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it("should return name for the office fan", ()=>{
        let userList = users.getUserList('THE office');

        expect(userList).toEqual(['ABHI','dhol']);
    });

    it("should return name for the the bar", ()=>{
        let userList = users.getUserList('THE bar');

        expect(userList).toEqual(['gull','cill']);
    });

    it('should find user', ()=>{
        let userID = '2';
            user = users.getUser(userID);

            expect(user.id).toBe(userID);
    });

    it('should not find user', ()=>{
        let userID = '20';
            user = users.getUser(userID);

            expect(user).toBeUndefined();
    });

    it("should remove user", () =>{
        let userID = '5';
            user = users.removeUser(userID);
        
            expect(user.id).toBe(userID);
            expect(users.users.length).toBe(4);
    });

    it("should not remove user", () =>{
        let userID = '15';
            user = users.removeUser(userID);
        
            expect(user.id).toBe(userID);
            expect(users.users.length).toBe(5);
    });
});