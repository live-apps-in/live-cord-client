import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface REDIRECT_PROPS {
  to?: string;
}

export const Redirect = (props: REDIRECT_PROPS) => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate(props.to, { replace: true });
	}, []);

	return null;
};
