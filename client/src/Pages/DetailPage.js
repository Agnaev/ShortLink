import React, { useState, useContext, useCallback, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";

export const DetailPage = () => {
	const {token} = useContext(AuthContext);
	const {request, loading} = useHttp();
	const [link, setLink] = useState('');
	const linkId = useParams().id;

	const getLink = useCallback(async() => {
		try {
			const response = await request(`/api/link/${linkId}`, 'GET', null, {
				Authorization: `Bearer ${token}`
			});
			setLink(response)
		} catch {}
	}, [token, linkId, request]);

	useEffect(() => {
		getLink();
	}, [getLink]);

	if(loading || !link) {
		return <Loader />
	}

	return (
		<div>
			{ !loading && link && <LinkCard link={link}/> }
		</div>
	)
};
