import {Organism} from '../domain/Organism'
import axios from 'axios'


export const findAllOrganisms = async (): Promise<Array<Organism> | string> => {

  try {
    const response = await axios.get( 'http://localhost:8080/organism/findAllOrganisms')
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}

export const addOrganismWithDirectory = async (directory:string,commonName:string): Promise<Organism | string> => {

  try {
    const response = await axios.post( 'http://localhost:8080/organism/addOrganism',{
      email:'madeup',
      password:'password',
      directory,
      commonName,
    })
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}


// export const addOrganismWithSequence = async (directory:string,commonName:string): Promise<Organism | string> => {
//
//   try {
//     const response = await axios.post( 'http://localhost:8080/organism/addOrganism',{
//       email:'madeup',
//       password:'password',
//       directory,
//       commonName,
//     })
//     const { data } = await response
//     return data
//   } catch (error) {
//     return error.message ? error.message : error
//   }
// }

export const getOrganism = async (organismIdentifier:string): Promise<Organism | string> => {

  try {
    const response = await axios.post( 'http://localhost:8080/organism/getOrganism',{organism:organismIdentifier})
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}
export const deleteOrganism = async (organismIdentifier: string): Promise<Organism | string> => {

  try {
    const response = await axios.post( 'http://localhost:8080/organism/deleteOrganism',{organism: organismIdentifier})
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}
