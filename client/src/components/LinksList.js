import React from 'react';
import {Link} from "react-router-dom";

export const LinksList = ({ links }) => {
	if(links.length === 0) {
		return <p className={'center'}>Ссылок пока нет</p>
	}

	const renderTableRow = (link, index) => (
		<tr key={link._id}>
			<td>{index + 1}</td>
			<td><a href={link.from} target={'_blank'} rel={"noperner noreferrer"}>{link.from}</a></td>
			<td><a href={link.to} target={'_blank'} rel={"noperner noreferrer"}>{link.to}</a></td>
			<td>{link.clicks}</td>
			<td>
				<Link to={`/detail/${link._id}`}>Открыть</Link>
			</td>
		</tr>
	);

	return (
		<table>
			<thead>
				<tr>
					<th>№</th>
					<th>Оригинальная</th>
					<th>Сокращенная</th>
					<th>Кликов</th>
					<th>Открыть</th>
				</tr>
			</thead>
			<tbody>
			{links.map(renderTableRow)}
			</tbody>
		</table>
	)
};
