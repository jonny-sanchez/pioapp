import { StyleProp, ViewStyle } from 'react-native';
import { Avatar, Card, IconButton, useTheme } from 'react-native-paper';

type CardTitleProps = {
  title?: string;
  subtitle?: string;
  size?: number;
  icon?: string;
  style?: StyleProp<ViewStyle>
}

export default function CardTitle({ 
  title = '',
  subtitle = '',
  size = 45,
  icon = '',
  style = {}
} : CardTitleProps){

    const theme = useTheme()

    return (
        <Card.Title
          style={[
            { borderColor: theme.colors.surfaceVariant, borderWidth: 1, borderRadius: 4 },
            style
          ]}
          title={title}
          subtitle={subtitle}
          left={(props) => <Avatar.Icon { ...props } size={size}  icon={icon} />}
          // right={() => <IconButton  icon="dots-vertical"/>}
        />
    )

}