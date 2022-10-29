export class User{
  private _username: string;
  private _phoneNum: string;
  private _address: string;
  private _nameOfUser: string;
  private _email: string;
  private _token: string;
  private _expires: number;

  constructor(username: string, email:string, phoneNum: string, address: string, nameOfUser: string, token: string, expires: number){
    this._username = username;
    this._email = email;
    this._phoneNum = phoneNum;
    this._address = address;
    this._nameOfUser = nameOfUser;
    this._token = token;
    this._expires = expires;
  }


  public get username() : string {
    return this._username
  }

  public get email() : string {
    return this.email;
  }


  public get phoneNum() : string {
    return this.phoneNum;
  }


  public get address() : string {
    return this.address;
  }


  public get nameOfUser() : string {
    return this.nameOfUser;
  }


  public get token() : string {
    if (this.expires<Date.now()){
      return null;
    }
    
    return this.token;
  }

  public get expires(): number{
    return this.expires;
  }


  public get expiresDate() : Date {
    return new Date(this.expires);
  }
}
