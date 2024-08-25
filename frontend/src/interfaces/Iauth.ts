export interface LoginAdminInterface {
    email: string;
    password: string;
}
export interface LoginUserInterface {
    email: string;
    password: string;
}
export interface RegisterInterface {
    cardid: string;
    password: string;
    firstname: string;
    lastname: string;
    age: string;
    telnum: string;
    relationshipId: string;
    genderId: string;
}