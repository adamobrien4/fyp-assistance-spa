import { Ability, DefineAbility } from '@casl/ability'

const { can, cannot, rules } = new AbilityBuilder()



can('read', ['Post', 'Comment'])
can('manage', 'Post', { author: 'me' })
can('create', 'Comment')

const ability = new Ability(rules)

console.log(ability.can('read', Post))