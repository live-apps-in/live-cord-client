import { Link, LinkProps } from "react-router-dom";

export const CustomLink: React.FC<LinkProps> = (props) => {
	return <Link {...props}>{props.children}</Link>;
};
