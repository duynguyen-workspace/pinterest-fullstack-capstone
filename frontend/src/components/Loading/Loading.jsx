import Lottie from 'react-lottie'; 'react-lottie';
import * as animation from './lotties/loading.json'

const Loading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animation
    };

    return (
        <Lottie options={defaultOptions}
            height={400}
            width={400} />
    )
}

export default Loading
