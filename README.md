## configurar notificaciones push (ANDROID)
1. se debe configurar un cuenta en firebase
2. luego agregar una aplicacion android
3. luego te dara la descarga de un archivo "google-services.json"
4. ahora instalamos este paquete "npm install --save @react-native-firebase/app"
5. luego agregar estas configuraciones al app.json {
  "expo": {
    "android": {
      "googleServicesFile": "./google-services.json",
      "package": "com.mycorp.myapp"
    },
    "plugins": [
      "@react-native-firebase/app"
    ]
  }
}