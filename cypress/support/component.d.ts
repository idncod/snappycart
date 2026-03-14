/// <reference types="cypress" />

type MountFn = typeof import('cypress/react').mount

declare namespace Cypress {
    interface Chainable<Subject = any> {
        mount: MountFn
    }
}