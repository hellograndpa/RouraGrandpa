import Link from 'next/link';
import User from '../meUser/UserMe.component';

const Nav = () => (
	<div>
		<User>
			{({ data: { me } }) => {
				if (me)
					return (
						<p>
							Hello {me.name} you type of user is {me.typeUser.typeName}
						</p>
					);
				return null;
			}}
		</User>
		<Link href="/users">
			<a> GO TO USERS LIST</a>
		</Link>{' '}
		{' || '}{' '}
		<Link href="/profile">
			<a> GO TO MY PROFILE</a>
		</Link>{' '}
		{' || '}{' '}
		<Link href="/signup">
			<a> GO TO SIGNUP</a>
		</Link>{' '}
		{' || '}{' '}
		<Link href="/">
			<a>got to home</a>
		</Link>
	</div>
);

export default Nav;
