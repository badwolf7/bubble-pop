import { React, styled } from 'appReact';

import 'styles';
import { colors, pxToEm } from 'styles/util';

const StorybookWrapper = ({ story }) => <Wrapper>{story()}</Wrapper>;

const Wrapper = styled.div`
  padding: ${pxToEm(30)};
  width: 100%;

  > div,
  > div > div {
    width: 100%;
  }

  .storybook--header {
    color: ${colors.grey.hex};
    font-weight: 200;
    margin-bottom: ${pxToEm(30)};
    text-transform: capitalize;
  }
`;

export default StorybookWrapper;
