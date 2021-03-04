import {Feature} from './Feature'

export class Apollo2Feature {
  constructor(inputObject: any) {
    if (inputObject instanceof String ){

    }

  }

  /**
   * Converts from one feature type to the other
   */
  getFeature():Feature|unknown {
    const feature = new Feature()

    return feature
  }
}
