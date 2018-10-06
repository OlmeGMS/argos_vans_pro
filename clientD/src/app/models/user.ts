export class User{
  constructor(
     public _id: string,
    public name: string,
    public surname: string,
    public dni: string,
    public email: string,
    public password: string,
    public phone: string,
    public image: string,
    public rol: string,
    public status: boolean,
  ){}
}
