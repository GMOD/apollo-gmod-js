import {FeatureType} from './FeatureType'
import {FeatureLocation} from './FeatureLocation'
// import {Apollo2Feature} from './Apollo2Feature'


export class Feature {


  symbol: string | undefined
  description: string | undefined
  name: string | undefined
  uniqueName: string | undefined
  children: Array<Feature> = new Array<Feature>()
  parents: Array<Feature>  = new Array<Feature>()
  type: FeatureType | undefined
  location: FeatureLocation | undefined
  dateLastUpdated: Date | undefined
  properties: any

  constructor(inputJson?: any,organism?:string,sequence?:string) {
    // JSON.parse(inputJson.stringify())
    // console.log(inputJson.feature)
    inputJson.organism = inputJson.organism ? inputJson.organism : organism
    inputJson.sequence = inputJson.sequence ? inputJson.sequence : sequence
    this.parseFromJSON(inputJson)
  }

  private parseFromJSON(inputJson: any):Feature {
    const organism = inputJson.organism
    const sequence = inputJson.sequence ? inputJson.sequence : inputJson.track

    // this.parseFeatures(inputJson.features,organism,sequence)
    this.symbol = inputJson.symbol
    this.description = inputJson.description
    this.name = inputJson.name
    this.uniqueName = inputJson.uniquename
    this.location = new FeatureLocation(inputJson.location,organism,sequence)
    this.type =  new FeatureType(inputJson.type.name)
    this.dateLastUpdated = new Date(inputJson.date_last_modified)
    this.properties = inputJson.properties

    if(inputJson.children){
      for(const child of inputJson.children){
        const childFeature = new Feature(child,organism,sequence)
        this.children.push(childFeature)
      }
    }

    if(inputJson.parent) {
      for (const parent of inputJson.parent) {
        this.parents.push(new Feature(parent,organism,sequence))
      }
    }

    return this

  }

  childrenByType(type:string):Array<Feature>{
    return this.children.filter( c => c.type?.name === type || c.type?.ontology === type )
  }

}
