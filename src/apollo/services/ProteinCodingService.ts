import axios from 'axios'


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const addTranscript = async (): Promise<Array<any> | string> => {

  try {
    const response = await axios.get( 'http://localhost:8080/annotationEditor/addTranscript')
    const { data } = await response
    return data
  } catch (error) {
    if (error) {
      return error.message
    }
  }

}
