import { requireNativeComponent, ViewStyle } from 'react-native';

type KlarnaOnsiteMessagingProps = {
  color: string;
  style: ViewStyle;
};

export const KlarnaOnsiteMessagingViewManager = requireNativeComponent<KlarnaOnsiteMessagingProps>(
'KlarnaOnsiteMessagingView'
);

export default KlarnaOnsiteMessagingViewManager;
