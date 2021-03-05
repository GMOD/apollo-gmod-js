export class FeatureType {
  get name(): string | undefined {
    return this._name
  }

  get ontology(): string | undefined {
    return this._ontology
  }

  get url(): string | undefined {
    return this._url
  }
    private _name:string|undefined
    private _ontology:string|undefined
    private _url:string|undefined

    constructor(name:string,ontology?:string,url?:string) {
      this._name = name
      this._ontology = ontology
      this._url = url 
    }
}
