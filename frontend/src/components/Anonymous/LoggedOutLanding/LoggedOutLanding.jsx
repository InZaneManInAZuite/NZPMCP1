import { Image, Overlay, AspectRatio } from '@mantine/core'
import Welcome from '../Welcome/Welcome.jsx';
import LandingFront from '../LandingFront/LandingFront.jsx';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import examImage from '../../../assets/Exam.jpg';

const LoggedOutLanding = () => {
    return (
        <Parallax pages={1.40}>
            <ParallaxLayer speed={0.1} factor={2}>
                <AspectRatio>
                    <Image src={examImage}/>
                    <Overlay opacity={0.9} color="black" />
                </AspectRatio>
            </ParallaxLayer>

            <ParallaxLayer speed={0.5}>
                <Welcome />
            </ParallaxLayer>

            <ParallaxLayer offset={0.55} speed={1.25}>
                <LandingFront/>
                
            </ParallaxLayer>
        </Parallax>
    );
}

export default LoggedOutLanding;