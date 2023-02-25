import { useUniqueKey } from "src/hooks";

// async-div-spinner
export interface CARD_SPINNER_PROPS {
  count?: number;
  withContainer?: boolean;
  containerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

export const CardSpinner: React.FC<CARD_SPINNER_PROPS> = (props) => {
	const { count = 1, withContainer = true, containerProps } = props;
	const uniqueKeys = useUniqueKey(count);

	const Container = withContainer
		? (props: CARD_SPINNER_PROPS["containerProps"]) => (
			<div
				{...props}
				{...containerProps}
				style={{ padding: "10px", ...props.style, ...containerProps.style }}
			>
				{props.children}
			</div>
		)
		: (props) => <>{props.children}</>;

	return (
		<Container>
			{[Array(count)].map((_, index) => (
				<div
					key={uniqueKeys[index]}
					style={{
						padding: 10,
						display: "flex",
						flexDirection: "column",
						gap: "10px",
					}}
				>
					<div
						style={{ width: "50%", minWidth: 50, height: 20, borderRadius: 20 }}
						className="skeleton-box"
					/>
					<div
						style={{ width: "80%", height: 20, borderRadius: 20 }}
						className="skeleton-box mt-3"
					/>
					<div
						style={{ width: "100%", height: 20, borderRadius: 20 }}
						className="skeleton-box mt-3"
					/>
					<div
						style={{ width: "70%", height: 20, borderRadius: 20 }}
						className="skeleton-box mt-3"
					/>
				</div>
			))}
		</Container>
	);
};
