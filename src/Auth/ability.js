import { AbilityBuilder, Ability, subject } from '@casl/ability'

export const proposal = subject.bind(null, 'Article')
export const topic = subject.bind(null, 'Topic')

export default function defineAbilityFor (userRole) {
  const { can, cannot, build } = new AbilityBuilder(Ability)

  switch (userRole) {
    case 'Student':
      can('read', 'Topic')
      // FIXME: Rename 'publisher' to match the name of the user who created the proposal
      can('manage', 'Proposal', { publisher: 'me' })
      break
    case 'Supervisor':
    case 'Coordinator':
      // FIXME: Rename 'publisher' to match the name of the user who created the proposal
      can('read', 'Topic')
      can('create', 'Topic')
      can('manage', 'Topic', { publisher: 'me' })
    // eslint-disable-next-line
    case 'Coordinator':
      can('manage', 'Student')
      can('manage', 'Supervisor')
      break
    case 'Administrator':
      can('manage', 'Coordinator')
      break
    default:
      cannot('read', '*')
  }

  return build()
}
