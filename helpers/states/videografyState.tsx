import { create } from "zustand"

type VideoMeta = {
    videoUri: string
    exif: any
    location: any
    mimeType: string
    fileName: string
}

type UseVideografyStateType = {
    metadatosVideo: VideoMeta;
    setMetadatosVideo: (
        uri:string,
        exif:any,
        location:any,
        mimeType:string,
        fileName:string
    ) => void;
    clearMetadatosVideo: () => void;
}

const videografyState = create<UseVideografyStateType>((set) => ({

    metadatosVideo: {
        videoUri: '',
        exif: null,
        location: null,
        mimeType: '',
        fileName: ''
    },

    setMetadatosVideo: (
        uri,
        exif,
        location,
        mimeType,
        fileName
    ) => set({
        metadatosVideo:{
            videoUri: uri,
            exif,
            location,
            mimeType,
            fileName
        }
    }),

    clearMetadatosVideo: () => set({
        metadatosVideo:{
            videoUri: '',
            exif: null,
            location: null,
            mimeType: '',
            fileName: ''
        }
    })

}))

export default videografyState
