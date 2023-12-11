
{/* <reference types ="Cypress"/>  */}

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/#/admin')
    cy.get('#email').type('admin@gapp.com')
    cy.get('#password').type('admin@010')
    cy.get('#gapp-login-button').click()
     cy.get('#create-poll-btn').should('have.text','Create Poll')
    cy.get('.admin-card').should('have.length',6)
    // Cypress.Cookies.debug(true)
    // cy.getCookie('token').should('have.property','eyJhbGciOiJSUzI1NiIsImtpZCI6ImYyZTgyNzMyYjk3MWExMzVjZjE0MTZlOGI0NmRhZTA0ZDgwODk0ZTciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcG9sbC1hcHAtNGFhMDUiLCJhdWQiOiJwb2xsLWFwcC00YWEwNSIsImF1dGhfdGltZSI6MTY5NzA5NjcyNiwidXNlcl9pZCI6InpMa0F1Tk1WR2lhS1l5c1dxMlZPV1FMTXdzQzIiLCJzdWIiOiJ6TGtBdU5NVkdpYUtZeXNXcTJWT1dRTE13c0MyIiwiaWF0IjoxNjk3MDk2NzI2LCJleHAiOjE2OTcxMDAzMjYsImVtYWlsIjoiYWRtaW5AZ2FwcC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWRtaW5AZ2FwcC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.EFOh4EpZH-6wzAlMKwZmuDmKH4DQanKmzR6T7aVWFEhk_5kk50hVGY-voJ_9TWTQ5Z0MYyPM9aUq4smC41PhdEughICa1UT96ZvP7y7-5ZJAcsAJeBPRUSJcBsEor_sDwbsHyGKazOGKageMfyX5MfgxjJnN9l4dgOwUvMt9bni6g35Qz8NKu70m3MKcGB7MDSs9gDS5LKjBLavGER5UrAMvlEzIA8O_FG08w2CZq4OBK_Pj0-4WmmqNA14PSKWqLob8oJRD0KUklVjRemWZHwZB-pCIB2dcZzPH4BrLxWQXOZf1iSlm0VrXzSUdDl28qk2CFnK9fqHuWP4u6CL-zw')
  
  })
})


describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#option-one').click()
    // Cypress.Cookies.debug(true)
    // cy.getCookie('token').should('have.property','eyJhbGciOiJSUzI1NiIsImtpZCI6ImYyZTgyNzMyYjk3MWExMzVjZjE0MTZlOGI0NmRhZTA0ZDgwODk0ZTciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcG9sbC1hcHAtNGFhMDUiLCJhdWQiOiJwb2xsLWFwcC00YWEwNSIsImF1dGhfdGltZSI6MTY5NzA5NjcyNiwidXNlcl9pZCI6InpMa0F1Tk1WR2lhS1l5c1dxMlZPV1FMTXdzQzIiLCJzdWIiOiJ6TGtBdU5NVkdpYUtZeXNXcTJWT1dRTE13c0MyIiwiaWF0IjoxNjk3MDk2NzI2LCJleHAiOjE2OTcxMDAzMjYsImVtYWlsIjoiYWRtaW5AZ2FwcC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWRtaW5AZ2FwcC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.EFOh4EpZH-6wzAlMKwZmuDmKH4DQanKmzR6T7aVWFEhk_5kk50hVGY-voJ_9TWTQ5Z0MYyPM9aUq4smC41PhdEughICa1UT96ZvP7y7-5ZJAcsAJeBPRUSJcBsEor_sDwbsHyGKazOGKageMfyX5MfgxjJnN9l4dgOwUvMt9bni6g35Qz8NKu70m3MKcGB7MDSs9gDS5LKjBLavGER5UrAMvlEzIA8O_FG08w2CZq4OBK_Pj0-4WmmqNA14PSKWqLob8oJRD0KUklVjRemWZHwZB-pCIB2dcZzPH4BrLxWQXOZf1iSlm0VrXzSUdDl28qk2CFnK9fqHuWP4u6CL-zw')
  
  })
})
