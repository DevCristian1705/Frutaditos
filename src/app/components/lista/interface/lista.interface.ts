export interface ILista {
    id: number,
    name : string,
    username : string,
    email : string,
    address : IAdrres,
    phone : string,
    website : string,
    company : ICompany 
}


export interface IAdrres{
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
        lat: string,
        lng: string,
    }
}
 

export interface ICompany{
    name: string,
    catchPhrase: string,
    bs: string,
}


export interface ISaveLista {
    title: string;
    body: string;
    userId: number;
    id: number
}

 