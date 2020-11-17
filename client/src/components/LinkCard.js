import React from 'react';

export const LinkCard = ({ link }) => {
	return (
		<>
			<h2>Link</h2>
			<p>
				Shorted link: <a href={link.to} target={'_blank'} rel={"noperner noreferrer"}>{link.to}</a>
			</p>
			<p>
				From: <a href={link.from} target={'_blank'} rel={"noperner noreferrer"}>{link.from}</a>
			</p>
			<p>
				Clicks count: <strong>{link.clicks}</strong>
			</p>
			<p>Date of creation: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
		</>
	);
};
