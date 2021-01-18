/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import defineRulesFor, { proposal, topic } from '../Auth/ability'

describe('Permissions', () => {
  let userRole
  let ability

  describe('when user is Student', () => {
    beforeAll(() => {
      userRole = 'Student'
      ability = defineRulesFor(userRole)
    })

    describe('view', () => {
      test('can view any topic', () => {
        expect(ability.can('read', 'Topic')).toBeTruthy
      })
      test('can view a proposal which they own', () => {
        // TODO: Implement check to see if they own the proposal or not
        expect(ability.can('read', 'Proposal')).toBeTruthy
      })
      test('cannot view another students proposal', () => {
        // TODO: Implement check to see if they own the proposal or not
        expect(ability.cannot('read', proposal({ publisher: 7 }))).toBeTruthy
      })
    })

    describe('update', () => {
      test('can edit a proposal which they own', () => {
        // TODO: Implement check to see if they own the proposal or not
        expect(ability.can('update', 'Proposal')).toBeTruthy
      })
      test('cannot edit another students proposal', () => {
        // TODO: Implement check to see if they own the proposal or not
        expect(ability.can('update', proposal({ publisher: 7 }))).toBeTruthy
      })
    })
  })

  describe('when user is Supervisor', () => {
    beforeAll(() => {
      userRole = 'Supervisor'
      ability = defineRulesFor(userRole)
    })

    test('can read any topic', () => {
      expect(ability.can('read', 'Topic')).toBeTruthy
    })
    test('can create a topic', () => {
      expect(ability.can('create', 'Topic')).toBeTruthy
    })
    test('can update a topic which they own', () => {
      // TODO: Implement check to see if they own the proposal or not
      expect(ability.can('update', 'Topic')).toBeTruthy
    })
    test('can delete a topic which they own', () => {
      // TODO: Implement check to see if they own the proposal or not
      expect(ability.can('delete', 'Topic')).toBeTruthy
    })

    test('cannot update a topic which is not theirs', () => {
      // TODO: Implement check to see if they own the proposal or not
      expect(ability.cannot('update', topic({ publisher: 7 }))).toBeTruthy
    })
    test('cannot delete a topic which is not theirs', () => {
      // TODO: Implement check to see if they own the proposal or not
      expect(ability.cannot('delete', topic({ publisher: 7 }))).toBeFalsy
    })
  })
})
