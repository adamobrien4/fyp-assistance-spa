import { defineAbility } from '@casl/ability';

const da = (user) =>  defineAbility((can, cannot) => {
	can('read', 'Suggestion');
	
	if(user.isLoggedIn) {
		if(user.role === 'Supervisor') {
			can('update', 'Suggestion', { authorId: user.id });
		}
	}

});

export default da;