/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import defineRulesFor from '../Auth/ability'
import Proposal from '../Auth/Proposal'
import Topic from '../Auth/Topic'

let user
let ability

describe('Permissions', () => {
  describe('when user is Student', () => {
    beforeAll(() => {
      user = {
        role: 'Student',
        id: '123-456'
      }
      ability = defineRulesFor(user)
    })
    describe('view', () => {
      test('can view any topic', () => {
        expect(ability.can('read', 'Topic')).toBeTruthy()
      })

      test('can view a proposal which they own', () => {
        // TODO: Implement check to see if they own the proposal or not
        expect(
          ability.can('read', new Proposal({ student: '123-456' }))
        ).toBeTruthy()
      })

      test('cannot view another students proposal', () => {
        // TODO: Implement check to see if they own the proposal or not
        expect(
          ability.cannot('read', new Proposal({ student: '234-567' }))
        ).toBeTruthy()
      })
    })

    describe('update', () => {
      test('can edit a proposal which they own', () => {
        // TODO: Implement check to see if they own the proposal or not
        expect(
          ability.can('update', new Proposal({ student: '123-456' }))
        ).toBeTruthy()
      })
      test('cannot edit another students proposal', () => {
        // TODO: Implement check to see if they own the proposal or not
        expect(true).toBeTruthy()
        expect(
          ability.cannot('update', new Proposal({ student: '456-789' }))
        ).toBeTruthy()
      })
    })
  })

  describe('when user is Supervisor', () => {
    beforeAll(() => {
      user = {
        role: 'Supervisor',
        id: '456-789'
      }
      ability = defineRulesFor(user)
    })

    test('can read any topic', () => {
      expect(ability.can('read', 'Topic')).toBeTruthy()
    })
    test('can create a topic', () => {
      expect(ability.can('create', 'Topic')).toBeTruthy()
    })
    test('can update a topic which they own', () => {
      expect(
        ability.can('update', new Topic({ supervisor: '456-789' }))
      ).toBeTruthy()
    })
    test('can delete a topic which they own', () => {
      // TODO: Implement check to see if they own the proposal or not
      expect(
        ability.can('delete', new Topic({ supervisor: '456-789' }))
      ).toBeTruthy()
    })

    test('cannot update a topic which is not theirs', () => {
      expect(
        ability.cannot('update', new Topic({ supervisor: '789-012' }))
      ).toBeTruthy()
    })
    test('cannot delete a topic which is not theirs', () => {
      expect(
        ability.cannot('delete', new Topic({ supervisor: '789-012' }))
      ).toBeTruthy()
    })
  })
})
