import globalState from "helpers/states/globalState";
import { View } from "react-native";
import { Skeleton } from 'moti/skeleton'

export default function ListArticulosDetalleSkeleton() {

    const { dark } = globalState()
    
    const colorMode:"dark" | "light" = dark ? 'dark' : 'light';

    return (
        <>
            <View className="w-full flex flex-col mt-4 ml-3 gap-7 pr-8">
                { 
                    Array(6).fill(null).map((el, index)=>(
                        <View key={index} className="flex flex-row w-full justify-between items-center">
                            <View className="flex flex-col gap-2">
                                <Skeleton colorMode={colorMode} height={20} width={150}/>
                                <Skeleton colorMode={colorMode} height={20} width={200}/>
                            </View>
                            <Skeleton colorMode={colorMode} radius={"round"} height={25} width={25}/>
                        </View>
                    ))
                }
            </View>
        </>
    )
}