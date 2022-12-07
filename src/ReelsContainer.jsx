import { selectedPlayers, winningPlayers } from './mockData';
import Reel from './Reel';

const ReelsContainer = () => {
  const getWinnerIndex = (index) => {
    const winningPlayer = winningPlayers[index];
    const selectedPlayer = selectedPlayers.filter(
      (v) => v.uuid === winningPlayer.uuid
    )[0];

    return selectedPlayers.indexOf(selectedPlayer);
  };

  return (
    <div className='w-[500px] h-[220px] flex justify-evenly relative z-10'>
      <img
        src='./src/assets/ROF-ReelSpindle.png'
        alt='reel base'
        className='absolute transform -translate-y-1/2 top-28 scale-110 z-20'
      />
      <img
        src='./src/assets/ROF-ReelBase.png'
        alt='reel base'
        className='absolute top-0 left-0 right-0 bottom-0 z-20'
      />
      <img
        src='./src/assets/ROF-Overlay-Left.png'
        alt='overlay left'
        className='z-30 h-full absolute top-0 left-1'
      />
      <img
        src='./src/assets/ROF-Overlay-Centre.png'
        alt='overlay left'
        className='z-30 h-full absolute top-0'
      />
      <img
        src='./src/assets/ROF-Overlay-Right.png'
        alt='overlay left'
        className='z-30 h-full absolute top-0 right-1'
      />
      <Reel
        classNames='flex-1 relative z-50 overflow-hidden'
        winnerIndex={getWinnerIndex(0)}
        names={selectedPlayers}
        reel={0}
      />
      <Reel
        classNames='flex-1 relative z-50 overflow-hidden'
        winnerIndex={getWinnerIndex(1)}
        names={selectedPlayers}
        reel={1}
      />
      <Reel
        classNames='flex-1 relative z-50 overflow-hidden'
        winnerIndex={getWinnerIndex(2)}
        names={selectedPlayers}
        reel={2}
      />
    </div>
  );
};

export default ReelsContainer;
