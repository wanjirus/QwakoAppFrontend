import React, { useRef } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const VideoBackground = ({ videoSource }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(true);

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html, body {
          width: 100%;
          
          overflow-x: hidden;
        }
      `}</style>

      <Box
        sx={{
          position: 'relative',
          width: '103.4%',
          height: '715px',
          
          padding: 0,
          marginLeft: '-22px',
          marginTop: '-20px',
        
          marginRight: '-100px',
          overflow: 'hidden', // Keeping the overflow style as requested
          borderBottomLeftRadius: '20% 5%',
          borderBottomRightRadius: '20% 5%'
        }}
      >
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          src={videoSource}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(0px) brightness(0.3)',
          }}
        />

        {/* Text Overlay Container */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '35%',
            left: '15px',
            width: '60%',
            backgroundColor: 'rgba(142, 123, 175, 0.09)',
            padding: '16px',
            borderRadius: '15px',
            borderStyle:'1px solid white',
            zIndex: 2,
          }}
        >
          <Typography
            variant="body1"
            color="red"
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              fontStyle: 'italic',
              fontFamily:'roboto',
              lineHeight: '1.5',
            }}
           >
            This is a sample paragraph of text in a fluid container.
          </Typography>
          <Typography
            variant="body1"
            color="white"
            sx={{
              fontSize: '2rem',
              fontWeight: 'bold',
              lineHeight: '1.5',
            }}
           >
            This is a sample paragraph of text in a fluid container.
          </Typography>
          <Typography
            variant="body1"
            color="white"
            sx={{
              fontSize: '1rem',
              // fontWeight: 'bold',
              lineHeight: '1.5',
            }}
           >
            This is a sample paragraph of text in a fluid container.
          </Typography>
        </Box>

        {/* New Red Container - Extending Downward */}
  {/* New Red Container - Extending Downward with Scroll */}



        {/* Button Container */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton
            onClick={handleVideoToggle}
            sx={{
              width: '70px',
              height: '70px',
              color: 'transparent',
              border: '2px solid transparent',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: 'white',
                border: '2px solid white',
              },
            }}
          >
            {isPlaying ? (
              <PauseIcon sx={{ fontSize: '3rem' }} />
            ) : (
              <PlayArrowIcon sx={{ fontSize: '3rem' }} />
            )}
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default VideoBackground;
