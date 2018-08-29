import { Component, React, styled, uuid } from 'appReact';

import { isLandscape } from 'util/domUtils';
import { randomInteger } from 'util/numberUtils';

import Bubble from 'components/bubblePop/Bubble';
import BubblePopHeader from 'components/bubblePop/BubblePopHeader';

class BubblePop extends Component {
  state = {
    bubbles: [],
    bubbleOptions: {},
    gameSettings: {
      height: this.props.height || window.innerHeight,
      speed: 1,
      width: this.props.width || window.innerWidth,
    },
    score: 0,
  }

  componentWillMount() {
    const bubbleOptions = this.generateBubbleOptions();
    const initialBubbleCount = randomInteger(bubbleOptions.count.max, bubbleOptions.count.min);

    this.setState({ bubbleOptions }, () => {
      let bubbleIndex = 0;
      for (bubbleIndex = 0; bubbleIndex < initialBubbleCount; bubbleIndex++) {
        this.appendNewBubble();
      }
    });
  }

  appendNewBubble = () => {
    const { bubbles, bubbleOptions, gameSettings } = this.state;

    const bubble = (
      <Bubble
        bubbleOptions={bubbleOptions}
        gameSettings={gameSettings}
        key={uuid()}
        updateScore={this.updateScore}
      />
    );
    bubbles.push(bubble);

    this.setState({ bubbles });
  }

  generateBubbleOptions = () => {
    let { gameSettings: { height, width } } = this.state;

    let maxBubbleDiameter = Math.round(((isLandscape) ? height : width) * 0.30);
    let minBubbleDiameter = Math.round(maxBubbleDiameter / 4);

    // Ensure min and max sizes of the bubble dimensions
    if (minBubbleDiameter < 30) {
      minBubbleDiameter = 30;

      if (minBubbleDiameter > maxBubbleDiameter) {
        maxBubbleDiameter = 50;
      }
    }

    let maxBubbleCount = Math.round(((isLandscape) ? width : height) / maxBubbleDiameter / 2);
    let minBubbleCount = Math.round(maxBubbleCount / 4);

    // Ensure min and max counts of bubbles in the environment
    if (minBubbleCount < 5) {
      minBubbleCount = 5;

      if (minBubbleCount > maxBubbleCount) {
        maxBubbleCount = 15;
      }
    }

    return {
      diameter: {
        max: maxBubbleDiameter,
        min: minBubbleDiameter,
      },
      count: {
        max: maxBubbleCount,
        min: minBubbleCount,
      },
    };
  }

  updateScore = (event) => {
    const { currentTarget } = event;
    const { points } = currentTarget.dataset;
    const { score } = this.state;

    currentTarget.remove();

    this.setState({
      score: score + Number(points),
    });

    setTimeout(this.appendNewBubble, 1000);
  }

  updateGameSpeed = (event) => {
    const { gameSpeed } = this.state;
    console.log('update speed: ', gameSpeed, 'to', event.target.value);
    this.setState({
      gameSpeed: Number(event.target.value),
    });
  }

  render() {
    const { bubbles, gameSpeed, gameSettings, score } = this.state;

    return (
      <GameContainer gameSettings={gameSettings}>
        <BubblePopHeader
          gameSpeed={gameSpeed}
          score={score}
          updateGameSpeed={this.updateGameSpeed}
        />
        {bubbles.map((Bubble) => (
          Bubble
        ))}
      </GameContainer>
    );
  }
}

const GameContainer = styled.article`
  cursor: crosshair;
  height: ${(props) => (`${props.gameSettings.height}px`)};
  overflow: hidden;
  position: relative;
  width: ${(props) => (`${props.gameSettings.width}px`)};
`;

export default BubblePop;