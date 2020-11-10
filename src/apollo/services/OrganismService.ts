import {Organism} from '../domain/Organism'
import axios from 'axios'
import fse from 'fs-extra'
import FormData from 'form-data'
import {ApolloServer} from '../ApolloServer'


export const getAllOrganisms = async (): Promise<Array<Organism> | string> => {

  try {
    const response = await axios.get( `${ApolloServer.getHost()}/organism/findAllOrganisms`)
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}

export const getOrganism = async (lookup:string): Promise<Organism | string> => {

  try {
    const response = await axios.get( `${ApolloServer.getHost()}/organism/findAllOrganisms?organism=${lookup}`)
    const { data } = await response
    if(data.length>1){
      return `Error: duplicate organisms return for '${lookup}' organism ${data}`
    }
    if(data.length==0){
      return `Error: No organisms returned for '${lookup}'`
    }
    return data[0]
  } catch (error) {
    return error.message ? error.message : error
  }
}

export const addOrganismWithDirectory = async (directory:string,commonName:string): Promise<Organism | string> => {

  try {
    const response = await axios.post( `${ApolloServer.getHost()}/organism/addOrganism`,{
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


export const addOrganismWithSequence = async (directory:string,commonName:string): Promise<Organism | string> => {
  const formData = new FormData()
  formData.append('email','madeup')
  formData.append('password','password')
  formData.append('directory',directory)
  formData.append('sequenceData',fse.createReadStream(directory))
  formData.append('commonName',commonName)

  // const sequenceData:ReadableStream = await fse.createReadStream(directory)
  // formData.append('sequenceData',sequenceData)
  try {
    const response = await axios.post( `${ApolloServer.getHost()}/organism/addOrganismWithSequence`,
      formData,
      {
        headers: formData.getHeaders()
      },
    )
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}

export const deleteOrganism = async (organismIdentifier: string): Promise<Organism | string> => {

  try {
    const response = await axios.post( `${ApolloServer.getHost()}/organism/deleteOrganism`,{organism: organismIdentifier})
    const { data } = await response
    return data
  } catch (error) {
    return error.message ? error.message : error
  }
}
