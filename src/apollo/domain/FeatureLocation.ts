import {Organism} from './Organism'

export class FeatureLocation {
    fmin:number|undefined
    fmax:number|undefined
    strand:number|undefined
    sequence:string|undefined
    organism:string|undefined
    
    constructor(inputJson:any,organism?:string,sequence?:string) {
      this.fmin = inputJson.fmin
      this.fmax = inputJson.fmax
      this.strand = inputJson.strand
      this.sequence = inputJson.sequence ? inputJson.sequence : sequence
      this.organism = inputJson.organism ? inputJson.organism : organism
    }
}
