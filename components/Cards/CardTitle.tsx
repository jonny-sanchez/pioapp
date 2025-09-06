import { Avatar, Card, IconButton } from 'react-native-paper';

export default function CardTitle(){

    return (
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={() => <Avatar.Icon  icon="folder" />}
          right={() => <IconButton  icon="dots-vertical"/>}
        />
    )

}