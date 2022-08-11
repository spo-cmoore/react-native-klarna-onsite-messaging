import React, { useCallback, useState } from 'react';
import {
  NativeSyntheticEvent,
  requireNativeComponent,
  ViewStyle,
} from 'react-native';

export enum KlarnaOSMEnvironment {
  demo,
  production,
  playground,
}

export enum KlarnaOSMRegion {
  EU,
  NA,
  OC,
}

export type KlarnaOSMViewError = {
  name: string;
  message: string;
  isFatal: boolean;
};

export type KlarnaOnsiteMessagingProps = {
  style?: ViewStyle;
  clientId: string;
  placementKey: string;
  locale: string;
  environment: KlarnaOSMEnvironment;
  region: KlarnaOSMRegion;
  purchaseAmount?: number;
  onOSMViewError?: (error: KlarnaOSMViewError) => void;
};

type InternalKlarnaOnsiteMessagingProps = Omit<
  KlarnaOnsiteMessagingProps,
  'onOSMViewError'
> & {
  onHeightChange: (event: NativeSyntheticEvent<{ height?: number }>) => void;
  onOSMViewError: (event: NativeSyntheticEvent<KlarnaOSMViewError>) => void;
};

const KlarnaOnsiteMessagingViewManager =
  requireNativeComponent<InternalKlarnaOnsiteMessagingProps>(
    'KlarnaOnsiteMessagingView'
  );

export const KlarnaOnsiteMessagingView: React.FC<
  KlarnaOnsiteMessagingProps
> = ({ style, onOSMViewError, ...restProps }) => {
  const [nativeHeight, setNativeHeight] = useState<number | string>(1);

  const handleHeightChange = useCallback(
    (event: NativeSyntheticEvent<{ height?: number }>) => {
      if (event.nativeEvent.height) {
        setNativeHeight(event.nativeEvent.height);
      }
    },
    []
  );

  const handleNativeError = useCallback(
    (event: NativeSyntheticEvent<KlarnaOSMViewError>) => {
      onOSMViewError?.(event.nativeEvent);
      setNativeHeight(0);
    },
    [onOSMViewError]
  );

  return (
    <KlarnaOnsiteMessagingViewManager
      {...restProps}
      style={{ height: nativeHeight, ...style }}
      onHeightChange={handleHeightChange}
      onOSMViewError={handleNativeError}
    />
  );
};
