import { InMemoryDbService } from "angular-in-memory-web-api";
import { UserModel } from "../models";

export class AppData implements InMemoryDbService {

    createDb() {
       const users:UserModel[]=[
        {
          "id": 1,
          "name": "Leanne Graham",
          "profile":"",
          "dob":new Date("21-09-1992"),
          "username": "Bret",
          "email": "Sincere@april.biz",
          "favourite":0,
          "address": [{
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
          }],
          "phone": [{"phoneNumber":"1-770-736-8031 x56442","preferred":false,"phoneType":"home"}],
          "website": "hildegard.org",
          "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
          }
        },
        {
          "id": 2,
          "name": "Ervin Howell",
          "dob":new Date("01-05-1988"),
          "profile":"",
          "username": "Antonette",
          "email": "Shanna@melissa.tv",
          "favourite":0,
          "address": [{
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
          }],
          "phone": [{"phoneNumber":"010-692-6593 x09125","preferred":true,"phoneType":"work"}],
          "website": "anastasia.net",
          "company": {
            "name": "Deckow-Crist",
            "catchPhrase": "Proactive didactic contingency",
            "bs": "synergize scalable supply-chains"
          }
        },
             ]

      return {users};

    }

}