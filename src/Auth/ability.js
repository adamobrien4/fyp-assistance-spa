import { AbilityBuilder, Ability } from '@casl/ability'

export default function defineAbilityFor(user) {
  console.log('Building abilities for', user)
  const { can, cannot, build } = new AbilityBuilder(Ability)

  // Setup to allow specific actions to be taken during each phase
  can('takeActionPhaseOne', 'Phase', { phase: 1 })
  can('takeActionPhaseTwo', 'Phase', { phase: 2 })
  can('takeActionPhaseThree', 'Phase', { phase: 3 })
  can('takeActionPhaseFour', 'Phase', { phase: 4 })

  switch (user.role) {
    case 'Student':
      can('read', 'Topic')
      can('create', 'Proposal')
      can('read', 'Proposal', { student: user.id })
      can('manage', 'Proposal', { student: user.id })
      break
    case 'Supervisor':
      can('read', 'Topic')
      can('create', 'Topic')
      can('manage', 'Topic', { supervisor: user.id })
      can('read', 'Proposal')
      can('respond', 'Proposal', { 'topic.supervisor': user.id })
      break
    case 'Coordinator':
      can('manage', 'Student')
      can('manage', 'Supervisor')
      can('read', 'Topic')
      can('create', 'Topic')
      can('manage', 'Topic', { supervisor: user.id })
      can('read', 'Proposal')
      can('respond', 'Proposal', { 'topic.supervisor': user.id })
      break
    case 'Administrator':
      can('manage', 'Coordinator')
      can('update', 'Phase')
      break
    default:
      cannot('*', '*')
  }

  return build()
}
