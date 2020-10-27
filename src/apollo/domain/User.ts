


export class User{

  constructor(input: any) {
    console.log('inputs')
    console.log(input)

    this._firstName = input.firstName
    this._lastName = input.lastName
    this._username = input.username
    this._inactive = input.inactive
    this._role = input.role
    this._userId = input.userId
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

  set username(value: string) {
    this._username = value;
  }

  private _firstName: string
  private _lastName: string
  private _username: string
  private _inactive: boolean;
  private _role: string;
  private _userId: bigint;

}
