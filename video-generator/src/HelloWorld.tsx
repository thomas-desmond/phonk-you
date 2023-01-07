import { Img, Audio, staticFile, getInputProps } from 'remotion';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';


export const HelloWorld: React.FC<{ imageLink:string }> = ({ imageLink }) => {
	console.log("Image Link ", imageLink)
	const { imageUrls } = getInputProps();

	const frame = useCurrentFrame();
	const { durationInFrames, fps } = useVideoConfig();

	const endFrame = 30;
	const firstPicEndFrame: number = 12;
	const secondPicStartFrame = firstPicEndFrame;
	const secondPicEndFrame = secondPicStartFrame + firstPicEndFrame;

	const zoomIn = interpolate(
		frame,
		[0, endFrame],
		[1, 3],
		{ extrapolateRight: "clamp", }
	)
	const zoomOut = interpolate(
		frame,
		[endFrame, endFrame + endFrame],
		[3, 1.0],
		{ extrapolateRight: "clamp", }
	)

	const zoomOut2 = interpolate(
		frame,
		[155, 200],
		[3, 1.0],
		{ extrapolateRight: "clamp", }
	)

	const turnRight = interpolate(
		frame,
		[0, endFrame],
		[0, .03],
		{ extrapolateRight: "clamp", }
	)

	const turnLeft = interpolate(
		frame,
		[endFrame, endFrame + endFrame],
		[.03, 0],
		{ extrapolateRight: "clamp", }
	)

	const fallFromSky = interpolate(
		frame,
		[endFrame + endFrame - 5, endFrame + endFrame + endFrame + endFrame],
		[-2000, 3000],
		{ extrapolateRight: "clamp", }
	)

	const comeUpFromBottom = interpolate(
		frame,
		[endFrame + endFrame + endFrame - 5, endFrame + endFrame + endFrame + endFrame + 20],
		[4000, -3000],
		{ extrapolateRight: "clamp", }
	)

	return (
		<AbsoluteFill style={{ backgroundColor: 'black', display: 'block', justifyItems: 'center', justifyContent: 'center' }}>
			<Audio src={staticFile("passion-trim.mp3")} />

				<Sequence from={0} durationInFrames={endFrame}>
					<Img
						src={imageUrls[0]}
						style={{
							transform: `scale(${zoomIn}) rotate(${turnRight}turn)`
						}}
						onError={(event) => {
							console.log(event)
						}} />;
				</Sequence>

			<Sequence from={endFrame} durationInFrames={88}>
				<Img
					src={imageUrls[1]}
					style={{
						transform: `scale(${zoomOut}) rotate(${turnLeft}turn) `,
					}} />;
			</Sequence>
			<Sequence from={117} durationInFrames={40}>
				<Img
					src={imageUrls[1]}
					style={{
						filter: `invert(.9 )`,
					}} />;
			</Sequence>
			<Sequence from={endFrame + endFrame - 10} durationInFrames={endFrame + 20}>
				<Img
					src={imageUrls[2]}
					style={{
						transform: `translate(0px, ${fallFromSky}px)`
					}} />;
			</Sequence>
			<Sequence from={endFrame + endFrame + endFrame + 10} durationInFrames={endFrame + 20}>
				<Img
					src={imageUrls[3]}
					style={{
						transform: `translate(0px, ${comeUpFromBottom}px)`
					}} />;
			</Sequence>
			<Sequence from={155} durationInFrames={Infinity}>
				<Img
					src={imageUrls[4]}
					style={{
						transform: `scale(${zoomOut2})`
					}}
				/>;
			</Sequence>
			{/* <Sequence from={155} durationInFrames={Infinity}>
				<Img
					src={staticFile("tmp.000.png")}
					style={{
						margin: 'auto',
						display: 'block', 
						transform: `rotate(${turnRight}turn)`
					}} />;
			</Sequence> */}
		</AbsoluteFill>
	);
};
