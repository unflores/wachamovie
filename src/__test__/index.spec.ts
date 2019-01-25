import { app } from '../../index'
import * as supertest from 'supertest'

describe('index.html', () => {
  let request
  let server

  before(() => {
    server = app.listen(8888)
  })
  after(() => {
    server.close()
  })
  beforeEach(() => {
    request = supertest(server)
  })
  it('should render the base page', async () => {
    await request
      .get('/')
      .expect('Content-Type', /text/)
      .expect(200)
  })
})
