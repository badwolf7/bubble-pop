import { _, Component, keyframes, PropTypes, React, styled } from 'appReact';

import { randomInteger, randomNumber } from 'util/numberUtils';

class Bubble extends Component {
  constructor(props) {
    super(props);

    const { bubbleOptions } = props;
    const maxDiameter = bubbleOptions.diameter.max;
    const diameter = randomInteger(maxDiameter, bubbleOptions.diameter.min);
    const points = 100 - Math.round(diameter / maxDiameter * 100) || 1;

    this.state = {
      blur: randomNumber(3),
      diameter,
      // Random time to start moving (0-15s)
      delay: randomNumber(16),
      points,
      speed: 3,
      startX: 0,
    };
  }

  componentWillMount() {
    this.setState({
      speed: this.setBubbleSpeed(),
      startX: this.setStartXPosition(),
    });
  }

  // Random speed (3-8s)
  setBubbleSpeed = () => {
    const { gameSettings: { speed } } = this.props;

    const maxSpeed = 9 / speed;
    const minSpeed = 3 / speed;

    return randomNumber(maxSpeed, minSpeed);
  }

  setStartXPosition = () => {
    const { gameSettings: { width } } = this.props;
    const { diameter } = this.state;

    const xMax = width - diameter * 2;
    const xMin = diameter;

    return randomInteger(xMax, xMin);
  }

  static propTypes = {
    bubbleOptions: PropTypes.objectOf(PropTypes.objectOf(PropTypes.number)).isRequired,
    gameSettings: PropTypes.objectOf(PropTypes.any).isRequired,
    updateScore: PropTypes.func,
  }

  static defaultProps = {
    updateScore: _.noop,
  }

  render() {
    const { updateScore } = this.props;
    const {
      blur,
      diameter,
      delay,
      points,
      speed,
      startX,
    } = this.state;

    const randomRgb = `${randomInteger(255)}, ${randomInteger(255)}, ${randomInteger(255)}`;

    return (
      <BubbleContainer
        blur={blur}
        color={randomRgb}
        data-points={points}
        diameter={diameter}
        delay={delay}
        onClick={updateScore}
        speed={speed}
        startX={startX}
      />
    );
  }
}

export const bubbleSink = keyframes`
  0% {
    transform: translateX(0);
    top: 0;
    opacity: 0;
  }
  5% {
    top: 0;
    opacity: 1;
  }
  10% {
    transform: translateX(5px);
  }
  20% {
    transform: translateX(0);
  }
  30% {
    transform: translateX(5px);
  }
  40% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
  60% {
    transform: translateX(0);
  }
  70% {
    transform: translateX(5px);
  }
  80% {
    transform: translateX(0);
  }
  90% {
    transform: translateX(5px);
  }
  99% {
    opacity: 1;
  }
  100% {
    top: 100%;

    opacity: 0;
  }
`

const BubbleContainer = styled.div`
  animation: ${bubbleSink} 4s ease-in 0s infinite;
  animation-delay: ${(props) => (`${props.delay}s`)};
  animation-duration: ${(props) => (`${props.speed}s`)};
  background: transparent;
  border-radius: 50%;
  box-shadow: ${(props) => (`0 0 7px 1px rgba(${props.color}, 0.4),
    inset -3px -3px ${props.diameter / 2}px 1px rgba(${props.color}, 0.4),
    inset -1px -1px ${props.diameter / 20}px rgba(${props.color}, 0.4)`)};
  display: inline-block;
  filter: ${(props) => (`blur(${props.blur}px)`)};
  height: ${(props) => (props.diameter)}px;
  left: ${(props) => (props.startX)}px;
  min-height: 30px;
  min-width: 30px;
  opacity: 0;
  position: absolute;
  top: 0;
  transform-origin: center;
  width: ${(props) => (props.diameter)}px;
  will-change: transform;
`;

export default Bubble;