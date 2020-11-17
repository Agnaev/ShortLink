import {useCallback} from 'react';

export const useMessage = () => {
	return useCallback(text => {
		if('M' in window && text) {
			window.M.toast({
				html: text
			})
		}
	}, [])
};
