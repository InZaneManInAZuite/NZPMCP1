import { Image, Overlay, AspectRatio } from '@mantine/core'
import Welcome from '../components/Welcome/Welcome';
import LandingFront from '../components/LandingFront/LandingFront';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import examImage from '../assets/Exam.jpg';

const LandingPage = () => {
    return (
        <Parallax pages={3}>
            <ParallaxLayer speed={0.1}>
                <AspectRatio ratio={8 / 9}>
                    <Image src={examImage}/>
                    <Overlay opacity={0.75} color="black" />
                </AspectRatio>
                
            </ParallaxLayer>

            <ParallaxLayer speed={0.5}>
                <Welcome />
            </ParallaxLayer>


            <ParallaxLayer offset={0.70} speed={1.25}>
                <LandingFront/>
                
            </ParallaxLayer>
        </Parallax>
    );
}

export default LandingPage;