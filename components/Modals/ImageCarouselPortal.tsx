import React, { useState, useRef, useEffect } from "react";
import { View, Dimensions, Image, Pressable, ImageResizeMode } from "react-native";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { Portal, Modal, useTheme, IconButton } from "react-native-paper";
import { useSharedValue } from "react-native-reanimated";
import { AppTheme } from "types/ThemeTypes";
import IconButtomForm from "components/form/IconButtomForm";
import { BlurView } from 'expo-blur';
import globalState from "helpers/states/globalState";
import { DownloadImageToGalery } from "helpers/Galery/GaleryHelper";
import ZoomableImage from "components/Image/ZoomableImage";

const { width, height } = Dimensions.get("window");

type ImageCarouselPortalProps = {
  images: string[];
  visible: boolean;
  onClose: () => void;
  downloadImages?:boolean;
  resizeMode?: ImageResizeMode | undefined;
};

export default function ImageCarouselPortal({
  images,
  visible,
  onClose,
  downloadImages = false,
  resizeMode = 'contain'
}: ImageCarouselPortalProps) {
    const theme = useTheme() as AppTheme  
    const [index, setIndex] = useState(0);
    const carouselRef = useRef<any>(null);
    const progress = useSharedValue(0);
    const { dark } = globalState()
    // const [loadingDownloadImageGalery, setLoadingDownloadImageGalery] = useState<boolean>(false)
    const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

    useEffect(() => {
      if (!visible) {
        // Reset lógico
        setIndex(0);
        progress.value = 0;
        setLoadingIndex(null);
        // Reset visual del carrusel
        // setTimeout(() => {
        //   carouselRef.current?.scrollTo({ index: 0, animated: true });
        // }, 0);
      }
    }, [visible]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        dismissable
        style={{
          margin: 0,
          backgroundColor: "transparent"
        }}
        contentContainerStyle={{
          backgroundColor: "transparent",
          padding: 0,
          margin: 0,
          borderRadius: 0,
          elevation: 0,
          shadowColor: "transparent",
          position: 'relative',
          height: '100%'
        //   height: '65%',
        }}
      >
        {/* blur de fondo */}
        <Pressable 
            style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%'
            }} 
            onPress={onClose}
        >
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              intensity={15}
              tint={dark ? "dark" : "light"}        
              style={{
                width: '100%',
                height: '100%'
                // position: 'absolute',
                // top: 0,
                // left: 0,
                // right: 0,
                // bottom: 0,
              }}
            />
        </Pressable>

        <IconButton 
            icon={'close'} 
            mode="contained-tonal"
            style={{ position: 'absolute', top: 15, right: 15, zIndex: 1 }}
            onPress={onClose}
            size={20}
        />
        <View style={{ alignItems: "center" }}>
          <Carousel
            ref={carouselRef}
            loop={false}
            width={width}
            height={height * 0.5}
            autoPlay={false}
            data={images}
            pagingEnabled
            mode="parallax"
            scrollAnimationDuration={800}
            onSnapToItem={(i) => {
              setIndex(i);
              progress.value = i;
            }}
            renderItem={({ item, index: itemIndex }) => (
              <View
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: theme.colors.surfaceVariant,
                  padding: 12,
                  borderRadius: 5,
                  position: 'relative'
                }}
              >
                {
                  downloadImages && (
                    <IconButtomForm 
                      disabled={loadingIndex === itemIndex}
                      loading={loadingIndex === itemIndex}
                      icon="download" 
                      size={30}
                      style={{ position: 'absolute', zIndex: 1, top: 10, right: 10 }}
                      onPress={async () => {
                          setLoadingIndex(itemIndex);
                          await DownloadImageToGalery(item)
                          setLoadingIndex(null);
                      }}
                  />
                  )
                }
                <ZoomableImage>
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: "90%",
                      height: "90%",
                      borderRadius: 2.5
                    }}
                    resizeMode={resizeMode}
                  />
                </ZoomableImage>
              </View>
            )}
          />

          {/* <Butto */}

          {/* Indicadores */}
          {/* <View style={{ }}>
            <Pagination.Custom
              data={images}
              progress={progress}
              containerStyle={{ justifyContent: 'center', alignItems: 'center', gap: 4.5 }}
              dotStyle={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: theme.colors.onSurfaceVariant,
              }}
              activeDotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: theme.colors.primary
              }}
            />
          </View> */}

          {/* Pagination infinita inteligente */}
          {/* <SmartPagination
            total={images.length}
            current={index}
            maxDots={5}
            activeColor={theme.colors.primary}
            inactiveColor={theme.colors.onSurfaceVariant}
          /> */}

        </View>
      </Modal>
    </Portal>
  );
}
