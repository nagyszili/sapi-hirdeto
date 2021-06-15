import { withResponsiveness } from '../../hooks/withResponsiveness';
import { ImageViewer as Large } from './ImageViewer.large.web';
import { ImageViewerProps } from './ImageViewer.props';
import { ImageViewer as Small } from './ImageViewer.small.web';

export const ImageViewer: React.FC<ImageViewerProps> = (props) =>
  withResponsiveness<ImageViewerProps>(Small, Large)(props);
