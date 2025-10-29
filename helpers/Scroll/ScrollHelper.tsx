import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

export const handleScroll = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
  offsetYRef: React.MutableRefObject<number>,
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const currentOffset = event.nativeEvent.contentOffset.y;
  const direction = currentOffset > offsetYRef.current ? 'down' : 'up';

  if (direction === 'down' && visible) setVisible(false);
  if (direction === 'up' && !visible) setVisible(true);

  offsetYRef.current = currentOffset;
};