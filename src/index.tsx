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
  style: ViewStyle;
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
  onHeightChange: (
    event: NativeSyntheticEvent<{ height: number; target: number }>
  ) => void;
  onOSMViewError: (event: NativeSyntheticEvent<KlarnaOSMViewError>) => void;
};

const KlarnaOnsiteMessagingViewManager =
  requireNativeComponent<InternalKlarnaOnsiteMessagingProps>(
    'KlarnaOnsiteMessagingView'
  );

export const KlarnaOnsiteMessagingView: React.FC<KlarnaOnsiteMessagingProps> = (
  props: KlarnaOnsiteMessagingProps
) => {
  const [height, setHeight] = useState(1);

  const setNativeHeight = useCallback(
    (event: NativeSyntheticEvent<{ height: number; target: number }>) => {
      setHeight(event.nativeEvent.height);
    },
    []
  );

  const handleNativeError = useCallback(
    (event: NativeSyntheticEvent<KlarnaOSMViewError>) => {
      props.onOSMViewError?.(event.nativeEvent);
    },
    [props]
  );

  return (
    <KlarnaOnsiteMessagingViewManager
      {...props}
      style={{ overflow: 'hidden', height, ...props.style }}
      onHeightChange={setNativeHeight}
      onOSMViewError={handleNativeError}
    />
  );
};
