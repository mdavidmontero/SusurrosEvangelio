import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { EvangelizacionData } from "../../../domain/entities/evangelizacion";
import {
  crearEvangelizacion,
  uploadImage,
} from "../../../actions/evangelizacion.actions";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const EvangelizacionForm = () => {
  const [data, setData] = useState<EvangelizacionData>({
    id: "",
    tituloPalabraDelDia: "",
    contenidoPalabraDelDia: "",
    imagenPalabraDelDia: "",
    tituloReflexionDiaria: "",
    contenidoReflexionDiaria: "",
    videoUrlReflexionDiaria: "",
    createdAt: "",
    updatedAt: "",
  });
  const { top } = useSafeAreaInsets();

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setData({ ...data, imagenPalabraDelDia: result.assets[0].uri });
    }
  };

  const handleSubmit = async () => {
    if (data.imagenPalabraDelDia) {
      const url = await uploadImage(data.imagenPalabraDelDia);
      const datos = {
        ...data,
        imagenPalabraDelDia: url,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await crearEvangelizacion(datos);
    } else {
    }
  };

  return (
    <ScrollView className="p-5 " style={{ paddingTop: top }}>
      <Text className="mb-5 text-2xl italic font-bold text-center text-primary">
        Evangelización
      </Text>
      <View className="mx-2 mb-4">
        <Text className="mb-2 text-sm font-bold text-primary">
          La Palabra del Día
        </Text>
        <View className="mx-2">
          <Text className="mt-2 mb-2 text-sm text-primary">
            Título de la Palabra del Día
          </Text>
          <TextInput
            cursorColor="#592C00"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            mode="flat"
            className="h-10 bg-white border-2 rounded-3xl border-primary"
            value={data.tituloPalabraDelDia}
            onChangeText={(text) =>
              setData({ ...data, tituloPalabraDelDia: text })
            }
          />
          <View className="mt-2">
            <Text className="mt-2 mb-2 text-sm text-primary">Descripción</Text>
            <TextInput
              cursorColor="#592C00"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              mode="flat"
              className="bg-white border-2 rounded-3xl border-primary"
              value={data.contenidoPalabraDelDia}
              onChangeText={(text) =>
                setData({ ...data, contenidoPalabraDelDia: text })
              }
              multiline
              numberOfLines={4}
            />
          </View>
          <View className="mt-2">
            <Text className="mb-2 text-sm text-primary">
              Imagen Relacionada
            </Text>
            <TouchableOpacity onPress={handleImagePicker} className="mb-4">
              <Text className="p-2 text-center bg-white border-2 rounded-lg shadow-md text-primary border-primary">
                Seleccionar Imagen
              </Text>
            </TouchableOpacity>
            {data.imagenPalabraDelDia && (
              <Image
                source={{ uri: data.imagenPalabraDelDia }}
                style={{
                  width: 250,
                  height: 250,
                  borderRadius: 15,
                  marginBottom: 10,
                  borderColor: "#ccc",
                  borderWidth: 1,
                }}
              />
            )}
          </View>
          <Text className="mt-2 mb-2 text-sm font-bold text-primary">
            Reflexión Diaria
          </Text>
          <View className="mx-2">
            <Text className="mb-2 text-sm text-primary">
              Título de la Reflexión
            </Text>
            <TextInput
              cursorColor="#592C00"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              className="h-10 bg-white border-2 rounded-3xl border-primary"
              value={data.tituloReflexionDiaria}
              onChangeText={(titulo) =>
                setData({ ...data, tituloReflexionDiaria: titulo })
              }
            />
          </View>
          <View className="mx-2 mt-2">
            <Text className="mb-2 text-sm text-primary">
              Descripción de la Reflexión Diaria
            </Text>
            <TextInput
              className="bg-white border-2 rounded-3xl border-primary"
              cursorColor="#592C00"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              value={data.contenidoReflexionDiaria}
              onChangeText={(contenido) =>
                setData({ ...data, contenidoReflexionDiaria: contenido })
              }
              multiline
              numberOfLines={4}
            />
          </View>
          <Text className="mt-2 mb-2 text-sm font-bold text-primary">
            Url del Video de la Reflexión
          </Text>
          <TextInput
            className="h-10 bg-white border-2 rounded-3xl border-primary"
            cursorColor="#592C00"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            value={data.videoUrlReflexionDiaria}
            onChangeText={(videoUrl) =>
              setData({ ...data, videoUrlReflexionDiaria: videoUrl })
            }
            multiline
          />
        </View>
      </View>

      <Button
        mode="contained"
        textColor="#FFFFFF"
        className="mb-10 text-white bg-primary"
        onPress={handleSubmit}
      >
        Guardar
      </Button>
    </ScrollView>
  );
};

export default EvangelizacionForm;
