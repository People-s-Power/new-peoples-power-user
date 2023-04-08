import Footer from "components/Footer";
import React, { Fragment, ReactChild } from "react";
import HeaderComp from "../components/HeaderComp";
import PropTypes from "prop-types";

interface IProps {
	showFooter?: boolean;
	children: ReactChild;
	showHeader?: boolean;
}

const FrontLayout: React.FC<IProps> = ({
	showFooter,
	children,
	showHeader,
}: IProps): JSX.Element => {
	const text = `CITIZEN PLAINT`
	return (
		<Fragment>
			<title>{text}</title>
			<div className="front">
				{showHeader === false ? null : <HeaderComp />}
				<div className="children">{children}</div>
				{showFooter && <Footer />}
			</div>
		</Fragment>
	);
};

export default FrontLayout;

FrontLayout.propTypes = {
	showFooter: PropTypes.bool,
	// children: PropTypes.any
};

FrontLayout.defaultProps = {
	showFooter: true,
};
