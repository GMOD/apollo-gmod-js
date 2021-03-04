import {FeatureType} from './FeatureType'
import {FeatureLocation} from './FeatureLocation'
// import {Apollo2Feature} from './Apollo2Feature'


export class Feature {

  symbol: string | undefined
  description: string | undefined
  name: string | undefined
  uniqueName: string | undefined
  children: Array<Feature> | undefined
  parent: Array<Feature> | undefined
  type: FeatureType | undefined
  location: FeatureLocation | undefined

  constructor(inputJson?: any) {
    // JSON.parse(inputJson.stringify())
    // console.log(inputJson.feature)
    this.parseFromJSON(inputJson)
  }

  private parseFromJSON(inputJson: any) {
    const organism = inputJson.organism
    const sequence = inputJson.sequence ? inputJson.sequence : inputJson.track

    this.parseFeatures(inputJson.features,organism,sequence)
    this.symbol = inputJson.symbol
    this.description = inputJson.description
    this.name = inputJson.name
    this.uniqueName = inputJson.uniqueName

  }

  private parseFeatures(features:Array<any>, organism: string|undefined, sequence: string|undefined) {

    for(const feature of features){

    }

  }
}
