export class FeatureType {
    name:string|undefined
    ontology:string|undefined
    url:string|undefined

    constructor(name:string,ontology?:string,url?:string) {
      this.name = name
      this.ontology = ontology
      this.url = url
    }
}
