/**
 * A feature group that contains a full hierarchy of features, focused on the visible level of the transcript
 */
import {Feature} from './Feature'

export class GenomeAnnotationGroup {
  
  private _features: Array<Feature> = new Array<Feature>()

  constructor(inputJson?:any) {
    const organism = inputJson.organism
    const sequence = inputJson.sequence ? inputJson.sequence : inputJson.track

    this.parseFeatures(inputJson.features,organism,sequence)
  }

  get features(): Array<Feature> {
    return this._features
  }

  set features(value: Array<Feature>) {
    this._features = value
  }


  private parseFeatures(features:Array<any>, organism: string|undefined, sequence: string|undefined) {

    const storedFeatures = this.features
    for(const feature of features){
      storedFeatures.push(new Feature(feature,organism,sequence))
    }
    this.features = storedFeatures

  }
}
