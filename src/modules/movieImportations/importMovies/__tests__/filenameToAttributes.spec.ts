import { expect } from 'chai'

import subject from '../filenameToAttributes'

require('../../../../specs/specHelper')

describe('filenameToAttributes', () => {

  it('gets resolution', async () => {
    expect(
      subject('some movie[1080p].mkv').resolution
    ).to.eql('1080p')
  })

  it('gets year', async () => {
    expect(
      subject('some movie(2012)[1080p].mkv').year
    ).to.eql(2012)
  })
})
