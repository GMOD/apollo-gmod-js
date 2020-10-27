


export class User{

  constructor(firstName: string,lastName: string,username: string) {
    this._firstName = firstName
    this._lastName = lastName
    this._username = username
  }

  get username(): string {
    return this._username
  }
  get lastName(): string {
    return this._lastName
  }

  set lastName(value: string) {
    this._lastName = value
  }
  get firstName(): string {
    return this._firstName
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  private _firstName: string
  private _lastName: string
  private _username: string

}
