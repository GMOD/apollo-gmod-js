import {Organism} from './Organism'

export class FeatureLocation {
    fmin:number|undefined
    fmax:number|undefined
    strand:number|undefined
    sequence:string|undefined
    organism:string|undefined
    
    constructor(inputJson:any,organism?:string,sequence?:string) {
      this.fmin = inputJson.min
      this.fmax = inputJson.min
      this.strand = inputJson.min
      this.sequence = sequence
      this.organism = organism
    }
}
