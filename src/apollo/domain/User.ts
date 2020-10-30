


export class User{
  get userId(): bigint {
    return this._userId;
  }

  set userId(value: bigint) {
    this._userId = value;
  }
  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }
  get inactive(): boolean {
    return this._inactive;
  }

  set inactive(value: boolean) {
    this._inactive = value;
  }

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

  set username(value: string) {
    this._username = value
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
    this._firstName = value
  }


  private _firstName: string
  private _lastName: string
  private _username: string
  private _inactive: boolean;
  private _role: string;
  private _userId: bigint;

}
