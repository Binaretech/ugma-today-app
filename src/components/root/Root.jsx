import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import Scaffold from '../scaffold/Scaffold';
// import { setLogin } from '../../redux/actions/sessionActions';
// import { useHistory } from 'react-router-dom';
// import paths from '../../routes/paths';
// import { loadUserData } from '../../utils/functions';

function Root({ children }) {
	// const userId = useSelector((state) => state.sessionReducer?.id);
	// const dispatch = useDispatch();

	// const history = useHistory();

	// useEffect(() => {
	//     const data = loadUserData();
	//     if (data) {
	//         dispatch(setLogin(data));
	//         return;
	//     }
	// history.push(paths.home);
	// }, [dispatch, history]);

	// return userId ? (
	//     <Scaffold>
	//         {children}
	//     </Scaffold>
	// )
	//     :
	//     (
	//         <>
	//             {children}
	//         </>
	//     );
	return <Scaffold>{children}</Scaffold>;
}

export default Root;
