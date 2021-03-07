import { AbilityBuilder, Ability } from '@casl/ability'
import Phase from './Phase'
import Proposal from './Proposal'
import Topic from './Topic'

export default function defineAbilityFor(user) {
  const { can, cannot, build } = new AbilityBuilder(Ability)

  // Setup to allow specific actions to be taken during each phase
  can('takeActionPhaseOne', Phase.name, { phase: 1 })
  can('takeActionPhaseTwo', Phase.name, { phase: 2 })
  can('takeActionPhaseThree', Phase.name, { phase: 3 })
  can('takeActionPhaseFour', Phase.name, { phase: 4 })

  switch (user.role) {
    case 'Student':
      can('read', Topic.name)
      can('create', Proposal.name)
      can('read', Proposal.name, { student: user.id })
      can('manage', Proposal.name, { student: user.id })
      break
    case 'Supervisor':
      can('read', Topic.name)
      can('create', Topic.name)
      can('manage', Topic.name, { supervisor: user.id })
      can('read', Proposal.name)
      can('respond', Proposal.name, { 'topic.supervisor': user.id })
      break
    // eslint-disable-next-line
    case 'Coordinator':
      can('manage', 'Student')
      can('manage', 'Supervisor')
      can('read', Topic.name)
      can('create', Topic.name)
      can('manage', Topic.name, { supervisor: user.id })
      can('read', Proposal.name)
      can('respond', Proposal.name, { 'topic.supervisor': user.id })
      break
    case 'Administrator':
      can('manage', 'Coordinator')
      can('update', Phase.name)
      break
    default:
      cannot('*', '*')
  }

  return build()
}
