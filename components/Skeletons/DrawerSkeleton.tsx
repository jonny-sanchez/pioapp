import globalState from "helpers/states/globalState";
import { Skeleton } from "moti/skeleton";
import { View } from "react-native";

export default function DrawerSkeleton() {

    const { dark } = globalState()
    
    const colorMode:"dark" | "light" = dark ? 'dark' : 'light';

    return (
      <>
          <View className="w-full flex flex-col px-6 gap-2" style={{ position: 'absolute' }}>
            <View className="mb-2 mt-4">
                <Skeleton width={75} height={30} colorMode={colorMode}/>
            </View>
            {
                Array(7).fill(null).map((el, index) => (
                    <Skeleton key={index} colorMode={colorMode} width={'100%'} height={50}/>
                ))
            }
          </View>
      </>
    )
}
