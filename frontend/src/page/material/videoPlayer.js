import React from 'react'
import ReactPlayer from 'react-player'

function VideoPlayer ({videoPath}) {
    return(
        <div>
            <ReactPlayer url={videoPath} 
                height='450px'
                width='900px'
                controls={true}
                light={true}
                playing={true}
            />
        </div>
    );
}

export default VideoPlayer;