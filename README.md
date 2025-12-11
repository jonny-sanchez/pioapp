## configurar notificaciones push (ANDROID)
## documentacion de firabase react native https://rnfirebase.io/
1. se debe configurar un cuenta en firebase
2. luego agregar una aplicacion android
3. luego el nombre de packete de android, lo puedes buscar en esta direccion ./android/app/src/main/{nombreproyecto}/MainActivity.kt  debe aver algo como esto "com.anonymous.pioapp"
4. luego te dara la descarga de un archivo "google-services.json"
5. ahora instalamos este paquete "npm install --save @react-native-firebase/app"
6. luego agregar estas configuraciones al app.json {
  "expo": {
    "android": {
      "googleServicesFile": "./google-services.json",
      "package": "com.mycorp.myapp" -- aqui va el nombre del paquete
    },
    "plugins": [
      "@react-native-firebase/app"
    ]
  }
}