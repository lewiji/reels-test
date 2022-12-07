import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationFrame,
} from 'framer-motion';

const Reel = ({ classNames, winnerIndex = 0, names, reel }) => {
  const [activeNames, setActiveNames] = useState([]);
  const [spinning, setSpinning] = useState(true);

  const speed = useMotionValue(0);
  const speedSpring = useSpring(speed, { bounce: 0, duration: 50 });
  const blur = useMotionValue(0);
  const blurSpring = useSpring(blur, { bounce: 0, duration: 50 });
  const wobble = useMotionValue(-3);
  const wobbleSpring = useSpring(wobble, { bounce: 0.5, duration: 5 });

  useEffect(() => {
    const generatedNames = names.map((name, i) =>
      generateName(name.playerAlias, i)
    );

    setActiveNames(generatedNames);
  }, [names]);

  useEffect(() => {
    const t1 = setTimeout(() => {
      speed.set(-2);
      blur.set(5);
    }, 1000 + reel * 333);

    const t2 = setTimeout(() => {
      speed.set(0);
      blur.set(0);
      setSpinning(false);

      wobble.set(0);
    }, 4500 + reel * 2800);

    return function cleanup() {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (spinning) return;
    if (!spinning) {
      setActiveNames(
        activeNames.map((name, index) => {
          if (index === (winnerIndex + names.length - 1) % names.length) {
            name.y = 20;
            if (reel === 0) {
              name.x += 3;
            }
            if (reel === 1) {
              name.x += 0;
            }
            if (reel === 2) {
              name.x += -6;
            }
          } else if (index === winnerIndex) {
            name.y = 80;
            if (reel === 0) {
              name.x += -7;
            }
            if (reel === 1) {
              name.x += 0;
            }
            if (reel === 2) {
              name.x += 7;
            }
          } else if (index === (winnerIndex + 1) % names.length) {
            name.y = 180;
            if (reel === 0) {
              name.x += 3;
            }
            if (reel === 1) {
              name.x += 0;
            }
            if (reel === 2) {
              name.x += 2;
            }
          } else {
            name.y = 1000;
          }

          return name;
        })
      );
    }
  }, [spinning]);

  useAnimationFrame((time, delta) => {
    if (spinning) {
      if (activeNames.length > 0) {
        setActiveNames(
          activeNames.map((name) =>
            moveName(
              name,
              activeNames.length,
              reel,
              spinning ? speedSpring.get() : speed.get(),
              delta
            )
          )
        );
      }
    } else {
      setActiveNames(
        activeNames.map((name) => {
          return moveName(
            name,
            activeNames.length,
            reel,
            wobbleSpring.get(),
            delta
          )}
        )
      );
    }
  });

  return (
    <div className={classNames}>
      {activeNames.map((name, i) => {
        return (
          <motion.div
            style={{
              y: name?.y,
              x: name?.x,
              skew: getSkew(name, reel),
              rotate: getRotation(name, reel),
              filter: `blur(${spinning ? blurSpring.get() / 5 : blur.get()}px)`,
            }}
            key={i}
            className='text-center absolute'
          >
            {name?.name}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Reel;

const generateName = (name, index = 0) => ({
  name,
  index,
  x: 0,
  y: 5 + index * 75,
  time: 0,
  dead: false,
});

const moveName = (name, totalNames, reel, speed, dt) => {
  if (name.dead) return name;
  const movedParticle = { ...name };
  movedParticle.y += speed * dt;
  if (reel == 0) {
    movedParticle.x = Math.cos((movedParticle.y + 38) / 38) * 5;
  } else if (reel == 2) {
    movedParticle.x = 10 + Math.cos((movedParticle.y - 80) / 38) * 5;
  } else {
    movedParticle.x = 0;
  }

  movedParticle.x += 30;

  movedParticle.time += dt;

  if (movedParticle.y < -20) {
    movedParticle.y += totalNames * 75;
  }

  return movedParticle;
};

const getSkew = (name, reel) => {
  if (name.y > -10 && name.y < 60) {
    if (reel == 0) {
      return -0.05;
    }
    if (reel == 2) {
      return 0.05;
    }
    return 0;
  }
  if (name.y > 85) {
    if (reel == 0) {
      return 0.05;
    }
    if (reel == 2) {
      return -0.05;
    }
    return 0;
  }
  return 0;
};

const getRotation = (name, reel) => {
  if (name.y > -10 && name.y < 60) {
    if (reel == 0) {
      return 0.05;
    }
    if (reel == 2) {
      return -0.05;
    }
    return 0;
  }
  if (name.y > 85) {
    if (reel == 0) {
      return -0.05;
    }
    if (reel == 2) {
      return 0.05;
    }
    return 0;
  }
  return 0;
};
