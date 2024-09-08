import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { EvangelizacionData } from "../../../domain/entities/evangelizacion";
import {
  crearEvangelizacion,
  uploadImage,
} from "../../../actions/evangelizacion.actions";
import * as ImagePicker from "expo-image-picker";

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
      console.log("Datos enviados:", datos);
    } else {
      console.log("No se ha seleccionado ninguna imagen.");
    }
  };

  return (
    <View className="p-5">
      <Text className="mb-5 text-2xl font-bold">
        Formulario de Evangelización
      </Text>
      <TextInput
        className="h-10 p-2 mb-4 border border-gray-400"
        placeholder="Título de la Palabra del Día"
        value={data.tituloPalabraDelDia}
        onChangeText={(titulo) =>
          setData({ ...data, tituloPalabraDelDia: titulo })
        }
      />
      <TextInput
        className="h-10 p-2 mb-4 border border-gray-400"
        placeholder="Contenido de la Palabra del Día"
        value={data.contenidoPalabraDelDia}
        onChangeText={(contenido) =>
          setData({
            ...data,
            contenidoPalabraDelDia: contenido,
          })
        }
        multiline
      />
      <TouchableOpacity onPress={handleImagePicker} className="mb-4">
        <Text className="text-blue-500">Seleccionar Imagen</Text>
      </TouchableOpacity>
      {data.imagenPalabraDelDia ? (
        <Image
          source={{ uri: data.imagenPalabraDelDia }}
          style={{ width: 200, height: 200, marginBottom: 10 }}
        />
      ) : null}
      <TextInput
        className="h-10 p-2 mb-4 border border-gray-400"
        placeholder="Título de la Reflexión Diaria"
        value={data.tituloReflexionDiaria}
        onChangeText={(titulo) =>
          setData({
            ...data,
            tituloReflexionDiaria: titulo,
          })
        }
      />
      <TextInput
        className="h-10 p-2 mb-4 border border-gray-400"
        placeholder="Contenido de la Reflexión Diaria"
        value={data.contenidoReflexionDiaria}
        onChangeText={(contenido) =>
          setData({
            ...data,
            contenidoReflexionDiaria: contenido,
          })
        }
        multiline
      />
      <TextInput
        className="h-10 p-2 mb-4 border border-gray-400"
        placeholder="URL del Video"
        value={data.videoUrlReflexionDiaria}
        onChangeText={(videoUrl) =>
          setData({
            ...data,
            videoUrlReflexionDiaria: videoUrl,
          })
        }
      />
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
};

export default EvangelizacionForm;
