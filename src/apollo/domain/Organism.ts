


export class Organism{
  constructor(input: Organism) {
    this.commonName = input.commonName
    this.uniqueName = input.uniqueName
    this.searchdb = input.searchdb
    this.genomeFasta = input.genomeFasta
    this.genomeFastaIndex = input.genomeFastaIndex
    this.nonDefaultTranslationTable = input.nonDefaultTranslationTable
    this.directory = input.directory
    this.genus = input.genus
    this.species = input.species
    this.publicMode = input.publicMode
    this.valid = input.valid
    this.obsolete = input.obsolete
    this.sequences = input.sequences
  }

  commonName: string
  sequences: number
  uniqueName: string
  searchdb: string
  genomeFasta: string
  genomeFastaIndex: string
  nonDefaultTranslationTable: string
  directory: string
  genus: string
  species: string
  publicMode: boolean
  valid: boolean
  obsolete: boolean

  // metadata: string
  // sequences: [Sequence]
  // userPermissions: [UserPermission]
  // groupPermissions: [GroupPermission]
}
