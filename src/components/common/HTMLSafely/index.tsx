import { Typography } from '@material-ui/core';
import Interweave, { Node, InterweaveProps } from 'interweave';

const TagsToMUIVariants = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
  P: 'body1',
  'P.body2': 'body2',
  'H6.subtitle1': 'subtitle1',
  'H6.subtitle2': 'subtitle2',
  'SPAN.caption': 'caption'
};

function getMUITypographyClass(className: string) {
  const MuiClasses = className
    .split(' ')
    .filter(x => x.startsWith('MuiTypography-'))
    .map(c => c.replaceAll('MuiTypography-', ''));
  const variants = Object.values(TagsToMUIVariants);

  return MuiClasses.find(val => variants.find(c => c === val));
}

function transform(node: HTMLElement, children: Node[]): React.ReactNode {
  const classTypography = getMUITypographyClass(node.className);

  const variant =
    TagsToMUIVariants[`${node.tagName}.${classTypography}`] ?? TagsToMUIVariants[node.tagName];

  if (variant) {
    return <Typography variant={variant}>{children}</Typography>;
  }
  return <Typography variant="body1">{children}</Typography>;
}

export default function HTMLSafely(props: InterweaveProps): JSX.Element {
  return <Interweave {...props} containerTagName="div" transform={transform} />;
}
