import { Img, Audio, staticFile } from 'remotion';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { Logo } from './HelloWorld/Logo';
import { Subtitle } from './HelloWorld/Subtitle';
import { Title } from './HelloWorld/Title';

export const HelloWorld: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({ titleText, titleColor }) => {
	const frame = useCurrentFrame();
	const { durationInFrames, fps } = useVideoConfig();

	const zoomIn = interpolate(
		frame,
		[0, 75],
		[1, 2]
	)
	const zoomOut = interpolate(
		frame,
		[75, 155],
		[2, 1.25]
	)

	const turnRight = interpolate(
		frame,
		[155, 300],
		[0, 10]
	)

	return (
		<AbsoluteFill style={{ backgroundColor: 'black', display: 'block', justifyItems: 'center', justifyContent: 'center' }}>
			<Audio src={staticFile("passion-trim.mp3")} />
			<Sequence from={0} durationInFrames={75}>
				<Img
					src={staticFile("tmp.000.png")}
					style={{
						margin: 'auto',
						display: 'block',
						transform: `scale(${zoomIn})`
					}} />;
			</Sequence>
			<Sequence from={75} durationInFrames={80}>
				<Img
					src={staticFile("tmp.000.png")}
					style={{
						margin: 'auto',
						display: 'block',
						transform: `scale(${zoomOut})`
					}} />;
			</Sequence>
			<Sequence from={155} durationInFrames={Infinity}>
				<Img
					src={staticFile("tmp.000.png")}
					style={{
						margin: 'auto',
						display: 'block', 
						transform: `rotate(${turnRight}turn)`
					}} />;
			</Sequence>
		</AbsoluteFill>
	);
};
