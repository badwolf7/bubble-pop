import { _, Component, PropTypes, React, styled } from 'appReact';

import { pxToEm } from 'styles/util';

class GameHeader extends Component {
  static propTypes = {
    gameSpeed: PropTypes.number,
    score: PropTypes.number,
    updateGameSpeed: PropTypes.func,
  }

  static defaultProps = {
    gameSpeed: 1,
    score: 0,
    updateGameSpeed: _.noop,
  }

  render() {
    const { gameSpeed, score, updateGameSpeed } = this.props;

    return (
      <GameSettingsContainer>
        <div>
          <p>Score: <span className='game--score'>{score}</span></p>

          <GameControls>
            <label>Game Speed</label>
            <input
              className='game--speed'
              max='2'
              min='0'
              onChange={updateGameSpeed}
              steps='0.01'
              type='range'
              value={gameSpeed}
            />
          </GameControls>

          <SpeedLabels>
            <li>0</li>
            <li className="active selected">1</li>
            <li>2</li>
          </SpeedLabels>
        </div>
      </GameSettingsContainer>
    );
  }
}

const GameSettingsContainer = styled.header`
  align-content: center;
  align-items: center;
  display: flex;
  height: HeaderHeight;
  justify-content: space-between;
  padding: 0 3%;
`;

const GameControls = styled.form`
  position: relative;

  label {
    display: block;
  }

  [type="range"] {
    height: 0;
    position: absolute;
    top: 2px;
    width: 100%;
    -webkit-appearance: none;

    // Thumb
    &::-webkit-slider-thumb {
      -webkit-appearance: none; // needed again for Chrome & Safari
      @include rangeThumb;
    }

    &::-moz-range-thumb {
      @include rangeThumb;
    }

    &::-ms-thumb {
      @include rangeThumb;
    }

    // Track
    &::-webkit-slider-runnable-track {
      @include rangeTrack;
    }

    &::-moz-range-track {
      @include rangeTrack;
    }

    &::-ms-track {
      @include rangeTrack;
    }

    &:focus { // override outline/background on focus
      background: none;
      outline: none;
    }

    &::-ms-track { // A little somethin' somethin' for IE
      width: 100%;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }
  }
`;

const SpeedLabels = styled.ul`
  margin: ${pxToEm(18)} ${pxToEm(-41)} 0;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    float: left;
    width: ${pxToEm(90.25)};
    text-align: center;
    color: #b2b2b2;
    font-size: ${pxToEm(14)};
    cursor: pointer;

    &::before {
      position: absolute;
      top: ${pxToEm(-25)};
      right: 0;
      left: 0;
      content: "";
      margin: 0 auto;
      width: ${pxToEm(9)};
      height: ${pxToEm(9)};
      background: #b2b2b2;
      border-radius: 50%;
    }
  }

  .active {
    color: #37adbf;
  }

  .selected::before {
    background: #37adbf;
  }

  .active.selected::before {
    display: none;
  }
`;

export default GameHeader;