import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import {
  Text,
  TEXT_TEST_ID,
  TextStyle,
  TextAs,
  TextAlign,
} from '@web/design/components/Text/Text';

const TEXT_CHILD = 'I am some words';

interface RenderTextOptions {
  styleOf?: TextStyle;
  as?: TextAs;
  margin?: string;
  textAlign?: TextAlign;
}

const renderText = (options: RenderTextOptions): RenderResult => {
  return render(<Text {...options}>{TEXT_CHILD}</Text>);
};

describe('<Text/>', (): void => {
  describe('test html tag', (): void => {
    it('displays correct html tag for default props', (): void => {
      const { getByTestId } = renderText({});
      expect(getByTestId(TEXT_TEST_ID)).toContainHTML('div');
    });

    it('displays correct html tag for when as prop is div', (): void => {
      const { getByTestId } = renderText({ as: TextAs.Div });
      expect(getByTestId(TEXT_TEST_ID)).toContainHTML('div');
    });

    it('displays correct html tag for when as prop is h1', (): void => {
      const { getByTestId } = renderText({ as: TextAs.H1 });
      expect(getByTestId(TEXT_TEST_ID)).toContainHTML('h1');
    });

    it('displays correct html tag for when as prop is h2', (): void => {
      const { getByTestId } = renderText({ as: TextAs.H2 });
      expect(getByTestId(TEXT_TEST_ID)).toContainHTML('h2');
    });

    it('displays correct html tag for when as prop is h3', (): void => {
      const { getByTestId } = renderText({ as: TextAs.H3 });
      expect(getByTestId(TEXT_TEST_ID)).toContainHTML('h3');
    });

    it('displays correct html tag for when as prop is h4', (): void => {
      const { getByTestId } = renderText({ as: TextAs.H4 });
      expect(getByTestId(TEXT_TEST_ID)).toContainHTML('h4');
    });

    it('displays correct html tag for when as prop is h5', (): void => {
      const { getByTestId } = renderText({ as: TextAs.H5 });
      expect(getByTestId(TEXT_TEST_ID)).toContainHTML('h5');
    });

    it('displays correct html tag for when as prop is h6', (): void => {
      const { getByTestId } = renderText({ as: TextAs.H6 });
      expect(getByTestId(TEXT_TEST_ID)).toContainHTML('h6');
    });

    it('displays correct html tag for when as prop is p', (): void => {
      const { getByTestId } = renderText({ as: TextAs.P });
      expect(getByTestId(TEXT_TEST_ID)).toContainHTML('p');
    });
  });

  describe('test rendering of text', (): void => {
    describe('as prop', (): void => {
      it('displays text when as prop is h1', (): void => {
        const { getByTestId } = renderText({ as: TextAs.H1 });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });

      it('displays text when as prop is h2', (): void => {
        const { getByTestId } = renderText({ as: TextAs.H2 });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });

      it('displays text when as prop is h3', (): void => {
        const { getByTestId } = renderText({ as: TextAs.H3 });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });

      it('displays text when as prop is h4', (): void => {
        const { getByTestId } = renderText({ as: TextAs.H4 });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });

      it('displays text when as prop is h5', (): void => {
        const { getByTestId } = renderText({ as: TextAs.H5 });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });

      it('displays text when as prop is h6', (): void => {
        const { getByTestId } = renderText({ as: TextAs.H6 });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });

      it('displays text when as prop is div', (): void => {
        const { getByTestId } = renderText({ as: TextAs.Div });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });

      it('displays text when as prop is p', (): void => {
        const { getByTestId } = renderText({ as: TextAs.P });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });
    });

    describe('styleOf prop', (): void => {
      it('displays text when styleOf prop is body', (): void => {
        const { getByTestId } = renderText({ styleOf: TextStyle.Body });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });

      it('displays text when styleOf prop is title1', (): void => {
        const { getByTestId } = renderText({ styleOf: TextStyle.Title1 });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });

      it('displays text when styleOf prop is title2', (): void => {
        const { getByTestId } = renderText({ styleOf: TextStyle.Title2 });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });

      it('displays text when styleOf prop is title3', (): void => {
        const { getByTestId } = renderText({ styleOf: TextStyle.Title3 });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });

      it('displays text when styleOf prop is title4', (): void => {
        const { getByTestId } = renderText({ styleOf: TextStyle.Title4 });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });

      it('displays text when styleOf prop is title5', (): void => {
        const { getByTestId } = renderText({ styleOf: TextStyle.Title5 });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });

      it('displays text when styleOf prop is title6', (): void => {
        const { getByTestId } = renderText({ styleOf: TextStyle.Title6 });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });
    });

    it('displays text when there is margin', (): void => {
      const { getByTestId } = renderText({ margin: '4 4 4 4' });
      expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
    });

    describe('textAlign', (): void => {
      it('displays text when text align is center', (): void => {
        const { getByTestId } = renderText({ textAlign: TextAlign.Center });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });

      it('displays text when text align is right', (): void => {
        const { getByTestId } = renderText({ textAlign: TextAlign.Right });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });

      it('displays text when text align is left', (): void => {
        const { getByTestId } = renderText({ textAlign: TextAlign.Left });
        expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
      });
    });
  });
});
