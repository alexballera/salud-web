import { Typography, Divider } from '@material-ui/core';
import React from 'react';

enum TypeRichContent {
  Header = 'header',
  Paragraph = 'paragraph',
  Delimiter = 'delimiter'
}

type DataRichContent = {
  text: string;
  level?: number;
  textAlign: string;
  className: string;
};

type RichContent = {
  id: string;
  type: TypeRichContent;
  data: DataRichContent;
};

export function RichTextTranslate(contents: RichContent[]): () => JSX.Element {
  const Component = () => (
    <React.Fragment>
      {contents.map((content, index) => {
        switch (content.type) {
          case TypeRichContent.Header:
            return (
              <Typography key={index} variant="h6">
                {content.data.text}
              </Typography>
            );
          case TypeRichContent.Paragraph:
            return (
              <Typography key={index} variant="body1">
                {content.data.text}
              </Typography>
            );
          case TypeRichContent.Delimiter:
            return <Divider key={index} />;
          default:
            return (
              <Typography key={index} variant="body1">
                {content.data.text}
              </Typography>
            );
        }
      })}
    </React.Fragment>
  );

  return Component;
}
