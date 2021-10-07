import React, { useCallback, useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  Platform,
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
  onHeightChange: (
    event: NativeSyntheticEvent<{ height?: number; target: number }>
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
  const [height, setHeight] = useState<number | string>(
    props.style?.height && typeof props.style.height === 'number'
      ? Number(props.style.height) - 1
      : 1
  );

  const setNativeHeight = useCallback(
    (event: NativeSyntheticEvent<{ height?: number; target: number }>) => {
      if (event.nativeEvent.height) {
        setHeight(event.nativeEvent.height);
      } else {
        if (props.style?.height) {
          setHeight(props.style.height);
        }
      }
    },
    [props.style]
  );

  const handleNativeError = useCallback(
    (event: NativeSyntheticEvent<KlarnaOSMViewError>) => {
      props.onOSMViewError?.(event.nativeEvent);
      setHeight(0);
    },
    [props]
  );

  return (
    <KlarnaOnsiteMessagingViewManager
      {...props}
      style={{ ...props.style, height }}
      onHeightChange={setNativeHeight}
      onOSMViewError={handleNativeError}
    />
  );
};
