import { AbilityBuilder, Ability, subject } from '@casl/ability'

export const proposal = subject.bind(null, 'Article')
export const topic = subject.bind(null, 'Topic')

export default function defineAbilityFor(userRole) {
  const { can, cannot, build } = new AbilityBuilder(Ability)

  // Setup to allow specific actions to be taken during each phase
  can('takeActionPhaseOne', 'Phase', { phase: 1 })
  can('takeActionPhaseTwo', 'Phase', { phase: 2 })
  can('takeActionPhaseThree', 'Phase', { phase: 3 })
  can('takeActionPhaseFour', 'Phase', { phase: 4 })

  switch (userRole) {
    case 'Student':
      can('read', 'Topic')
      // FIXME: Rename 'publisher' to match the name of the user who created the proposal
      can('create', 'Proposal')
      can('manage', 'Proposal', { student: 'me' })
      break
    case 'Supervisor':
      // FIXME: Rename 'publisher' to match the name of the user who created the proposal
      can('read', 'Topic')
      can('create', 'Topic')
      can('manage', 'Topic', { publisher: 'me' })
      break
    // eslint-disable-next-line
    case 'Coordinator':
      can('manage', 'Student')
      can('manage', 'Supervisor')
      can('read', 'Topic')
      can('create', 'Topic')
      can('manage', 'Topic', { publisher: 'me' })
      break
    case 'Administrator':
      can('manage', 'Coordinator')
      can('manage', 'Phase')
      break
    default:
      cannot('read', '*')
  }

  return build()
}
