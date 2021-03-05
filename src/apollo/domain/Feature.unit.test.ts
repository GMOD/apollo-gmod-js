/**
 *  @jest-environment node
 */
// const TEST_USER = 'test@test.com'

// import {GenomeAnnotationGroup} from './GenomeAnnotationGroup'
import {GenomeAnnotationGroup} from './GenomeAnnotationGroup'

// const TEST_ANIMAL = 'testAnimal'
// const TEST_SEQUENCE = 'Group1.10'
const INPUT_OBJECT = {
  'features': [{
    'location': {'fmin': 1216824, 'strand': 1, 'fmax': 1235616},
    'parent_type': {'name': 'gene', 'cv': {'name': 'sequence'}},
    'name': 'GB40856-RA',
    'children': [{
      'location': {'fmin': 1235237, 'strand': 1, 'fmax': 1235396},
      'parent_type': {'name': 'mRNA', 'cv': {'name': 'sequence'}},
      'properties': [{'value': 'demo', 'type': {'name': 'owner', 'cv': {'name': 'feature_property'}}}],
      'uniquename': '@TRANSCRIPT_NAME@',
      'type': {'name': 'exon', 'cv': {'name': 'sequence'}},
      'date_last_modified': 1425583209540,
      'parent_id': '5A8C864885BC71606E120322CE0EC28C'
    }, {
      'location': {'fmin': 1216824, 'strand': 1, 'fmax': 1216850},
      'parent_type': {'name': 'mRNA', 'cv': {'name': 'sequence'}},
      'properties': [{'value': 'demo', 'type': {'name': 'owner', 'cv': {'name': 'feature_property'}}}],
      'uniquename': '0992325F0DD2290AB58EA37ECF2DA2E7',
      'type': {'name': 'exon', 'cv': {'name': 'sequence'}},
      'date_last_modified': 1425583209540,
      'parent_id': '5A8C864885BC71606E120322CE0EC28C'
    }, {
      'location': {'fmin': 1235487, 'strand': 1, 'fmax': 1235616},
      'parent_type': {'name': 'mRNA', 'cv': {'name': 'sequence'}},
      'properties': [{'value': 'demo', 'type': {'name': 'owner', 'cv': {'name': 'feature_property'}}}],
      'uniquename': '1C091FE87A8133803A69887F38FBDC4C',
      'type': {'name': 'exon', 'cv': {'name': 'sequence'}},
      'date_last_modified': 1425583209542,
      'parent_id': '5A8C864885BC71606E120322CE0EC28C'
    }, {
      'location': {'fmin': 1224676, 'strand': 1, 'fmax': 1224823},
      'parent_type': {'name': 'mRNA', 'cv': {'name': 'sequence'}},
      'properties': [{'value': 'demo', 'type': {'name': 'owner', 'cv': {'name': 'feature_property'}}}],
      'uniquename': '6D2E15D6DA759C523B79B96795927CAF',
      'type': {'name': 'exon', 'cv': {'name': 'sequence'}},
      'date_last_modified': 1425583209540,
      'parent_id': '5A8C864885BC71606E120322CE0EC28C'
    }, {
      'location': {'fmin': 1228682, 'strand': 1, 'fmax': 1228825},
      'parent_type': {'name': 'mRNA', 'cv': {'name': 'sequence'}},
      'properties': [{'value': 'demo', 'type': {'name': 'owner', 'cv': {'name': 'feature_property'}}}],
      'uniquename': '99C2A027C87DBDBC5536503D5C38F21C',
      'type': {'name': 'exon', 'cv': {'name': 'sequence'}},
      'date_last_modified': 1425583209540,
      'parent_id': '5A8C864885BC71606E120322CE0EC28C'
    }, {
      'location': {'fmin': 1216824, 'strand': 1, 'fmax': 1235534},
      'parent_type': {'name': 'mRNA', 'cv': {'name': 'sequence'}},
      'properties': [{'value': 'demo', 'type': {'name': 'owner', 'cv': {'name': 'feature_property'}}}],
      'uniquename': '994B96C6594F5DB1B6C836E6E0EDE2A6',
      'type': {'name': 'CDS', 'cv': {'name': 'sequence'}},
      'date_last_modified': 1425583209540,
      'parent_id': '5A8C864885BC71606E120322CE0EC28C'
    }],
    'properties': [{'value': 'demo', 'type': {'name': 'owner', 'cv': {'name': 'feature_property'}}}],
    'uniquename': '5A8C864885BC71606E120322CE0EC28C',
    'type': {'name': 'mRNA', 'cv': {'name': 'sequence'}},
    'date_last_modified': 1425583209602,
    'parent_id': '8B9E9AC4D0DB90464F26B2F77A1E09B4'
  }]
}


test('Get transcript from JSON', () => {
  // const apollo3Feature = new Feature(INPUT_OBJECT)
  const genomeFeatures = new GenomeAnnotationGroup(INPUT_OBJECT)
  const feature = genomeFeatures.features[0]
  console.log('the features',feature)
  expect(feature.name).toEqual('GB40856-RA')
  // const apollo2Feature = new Apollo2Feature(TRANSCRIPT_OBJECT)
  // const apollo3FeatureFromApollo2 = apollo2Feature.getFeature()
  // const apollo3Feature = new Feature(apollo2Feature)
})