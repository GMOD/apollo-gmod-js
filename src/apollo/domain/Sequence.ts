import {Organism} from './Organism'


export class Sequence{

  constructor(input:any) {
    this.name = input.name
    this.start = input.start
    this.end = input.end
    this.organism = input.organism
  }
    
    name: string
    start: number
    end: number
    organism: Organism
    
}