import { AbilityBuilder, Ability } from '@casl/ability'

export default function defineAbilityFor (userRole) {
  const { can, cannot, build } = new AbilityBuilder(Ability)

  switch (userRole) {
    case 'Student':
      can('read', 'Topic')
      // FIXME: Rename 'publisher' to match the name of the user who created the proposal
      can('manage', 'Proposal', { publisher: 'me' })
      break
    case 'Supervisor':
      can('create', 'Suggestion')
      can('create', 'Topic')
      break
    case 'Coordinator':
      can('manage', 'Student')
      can('manage', 'Supervisor')
      break
    case 'Administrator':
      can('manage', 'System')
      break
    default:
      cannot('read', '*')
  }

  return build()
}
