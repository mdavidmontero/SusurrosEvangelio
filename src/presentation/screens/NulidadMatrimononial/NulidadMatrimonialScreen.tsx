import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import { NulidadMatrimonial } from "../../../domain/entities/nulidad.entities";
import { enviarSolicitudNulidad } from "../../../actions/nulidad.actions";
import { NulidadMatrimonialInitialValues } from "../../../types";
import { useAuthStore } from "../../store/useAuthStore";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/UserNavigation";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import * as Sharing from "expo-sharing";

export default function NulidadMatrimonialScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [consentimiento, setConsentimiento] = useState(false);
  const [nulidad, setNulidad] = useState<NulidadMatrimonial>(
    NulidadMatrimonialInitialValues
  );
  const { user } = useAuthStore();

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setNulidad({ ...nulidad, fechaNacimiento: currentDate });
  };

  const showDatepicker = () => {
    setShow(true);
  };
  const handleDocumentPick = async (field: keyof NulidadMatrimonial) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        multiple: false,
      });
      if (!result.canceled) {
        const selectedFile = result.assets[0];

        if (selectedFile.mimeType === "application/pdf") {
          const file = new File(
            [await fetch(selectedFile.uri).then((r) => r.blob())],
            selectedFile.name,
            { type: "application/pdf" }
          );
          setNulidad({ ...nulidad, [field]: file });
        } else {
          console.error("El archivo seleccionado no es un PDF");
        }
      }
    } catch (error) {
      console.error("Error al seleccionar el documento:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const nulidadToSubmit = {
        ...nulidad,
        consentimiento: consentimiento,
      };
      const envio = await enviarSolicitudNulidad(nulidadToSubmit, user?.id!);
      if (envio) {
        setNulidad(NulidadMatrimonialInitialValues);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };
  const saveFile = async () => {
    try {
      const asset = Asset.fromModule(
        require("../../../../assets/FORMATONULIDAD.pdf")
      );
      await asset.downloadAsync();

      const fileUri = `${FileSystem.documentDirectory}test.pdf`;

      await FileSystem.copyAsync({
        from: asset.localUri || asset.uri,
        to: fileUri,
      });

      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("No se puede compartir este archivo en este dispositivo.");
      }
    } catch (error) {
      // @ts-ignore
      Alert.alert("Error al guardar el archivo", error.message);
    }
  };

  return (
    <ScrollView className="flex-1 p-4">
      <View>
        <Button
          mode="contained"
          className=" bg-primary"
          onPress={() => navigation.navigate("DetalleNulidadUser")}
        >
          Ver Detalle
        </Button>
      </View>
      <Text className="mt-2 mb-6 text-2xl font-bold text-center text-primary">
        Solicitud Nulidad Matrimonial
      </Text>
      <Text className="mb-2 font-bold text-md text-primary">
        Descargar formato de nulidad Matrimonial
      </Text>
      <Button
        mode="outlined"
        textColor="#592c00"
        className="mb-2"
        onPress={saveFile}
      >
        Compartir o guardar en el teléfono
      </Button>

      <View className="mb-6">
        <Text className="mb-2 text-lg font-semibold text-primary">
          Información Personal
        </Text>
        <View className="mx-2 mb-4">
          <Text className="mb-2 text-base text-primary">Nombre</Text>
          <TextInput
            cursorColor="#592C00"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            mode="flat"
            className="h-10 bg-white border-2 rounded-3xl border-primary"
            value={nulidad.nombre}
            onChangeText={(text) => setNulidad({ ...nulidad, nombre: text })}
          />
        </View>
        <View className="mx-2 mb-4">
          <Text className="mb-2 text-base text-primary">Apellidos</Text>
          <TextInput
            cursorColor="#592C00"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            mode="flat"
            className="h-10 bg-white border-2 rounded-3xl border-primary"
            value={nulidad.apellidos}
            onChangeText={(text) => setNulidad({ ...nulidad, apellidos: text })}
          />
        </View>
        <View className="mx-2 mb-4">
          <Text className="mb-2 text-base text-primary">Fecha Nacimiento</Text>
          <TouchableOpacity onPress={showDatepicker}>
            <TextInput
              cursorColor="#592C00"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              mode="flat"
              className="h-10 bg-white border-2 rounded-3xl border-primary"
              editable={false}
              value={date.toLocaleDateString()}
            />
          </TouchableOpacity>
        </View>
        {show && (
          <RNDateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        <View className="mx-2 mb-4">
          <Text className="mb-2 text-base text-primary">
            Correo Electronico
          </Text>
          <TextInput
            cursorColor="#592C00"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            mode="flat"
            className="h-10 bg-white border-2 rounded-3xl border-primary"
            keyboardType="email-address"
            value={nulidad.correoElectronico}
            onChangeText={(text) =>
              setNulidad({ ...nulidad, correoElectronico: text })
            }
          />
        </View>
        <View className="mx-2 mb-4">
          <Text className="mb-2 text-base text-primary">
            Telefono del Contacto
          </Text>
          <TextInput
            cursorColor="#592C00"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            mode="flat"
            className="h-10 bg-white border-2 rounded-3xl border-primary"
            keyboardType="number-pad"
            value={nulidad.telefonoContacto}
            onChangeText={(text) =>
              setNulidad({ ...nulidad, telefonoContacto: text })
            }
          />
        </View>
        <Text className="mb-2 text-lg font-semibold text-primary">
          Detalles del Matrimonio
        </Text>
        <View className="mx-2 mb-4">
          <Text className="mb-2 text-base text-primary">
            Lugar del Matrimonio
          </Text>
          <TextInput
            cursorColor="#592C00"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            mode="flat"
            className="h-10 bg-white border-2 rounded-3xl border-primary"
            value={nulidad.lugarMatrimonio}
            onChangeText={(text) =>
              setNulidad({ ...nulidad, lugarMatrimonio: text })
            }
          />
        </View>
        <View className="mx-2 mb-4">
          <Text className="mb-2 text-base text-primary">
            Nombre del Sacerdote Celebrante
          </Text>
          <TextInput
            cursorColor="#592C00"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            mode="flat"
            className="h-10 bg-white border-2 rounded-3xl border-primary"
            value={nulidad.nombreSacerdoteCelebrante}
            onChangeText={(text) =>
              setNulidad({ ...nulidad, nombreSacerdoteCelebrante: text })
            }
          />
        </View>
        <View className="mx-2 mb-4">
          <Text className="mb-2 text-base text-primary">
            Duración de la Convivencia
          </Text>
          <TextInput
            cursorColor="#592C00"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            mode="flat"
            className="h-10 bg-white border-2 rounded-3xl border-primary"
            value={nulidad.duracionConvivencia}
            onChangeText={(text) =>
              setNulidad({ ...nulidad, duracionConvivencia: text })
            }
          />
        </View>
        <Text className="mb-2 text-lg font-semibold text-primary">
          Motivos de la Nulidad
        </Text>
        <View className="mx-2 mb-4">
          <Text className="mb-2 text-base text-primary">Motivo Principal</Text>
          <Picker
            className="h-10 bg-white border-2 rounded-3xl border-primary"
            selectedValue={nulidad.motivoPrincipal}
            onValueChange={(itemValue) =>
              setNulidad({ ...nulidad, motivoPrincipal: itemValue })
            }
          >
            <Picker.Item
              label="Falta de libertad o consentimiento"
              value="faltaLibertad"
            />
            <Picker.Item
              label="Incapacidad psicológica"
              value="incapacidadPsicologica"
            />
            <Picker.Item label="Error en la persona" value="errorPersona" />
            <Picker.Item
              label="Simulación del consentimiento"
              value="simulacionConsentimiento"
            />
            <Picker.Item
              label="Falta de forma canónica"
              value="faltaFormaCanonica"
            />
            <Picker.Item
              label="Impedimentos matrimoniales"
              value="impedimentosMatrimoniales"
            />
          </Picker>
        </View>
        <View className="mx-2 mb-4">
          <Text className="mb-2 text-base text-primary">Descripción</Text>
          <TextInput
            cursorColor="#592C00"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            mode="flat"
            className="bg-white border-2 rounded-3xl border-primary"
            multiline={true}
            numberOfLines={4}
            value={nulidad.descripcionMotivo}
            onChangeText={(text) =>
              setNulidad({ ...nulidad, descripcionMotivo: text })
            }
          />
        </View>
        <Text className="mb-2 text-lg font-semibold text-primary">
          Documentos Adjuntos
        </Text>
        <View className="mx-2 mb-4">
          <Text className="mb-2 text-base text-primary">
            Certificado de Matrimonio
          </Text>
          <TouchableOpacity
            className="flex items-center justify-center h-10 bg-white border-2 rounded-3xl border-primary"
            onPress={() => handleDocumentPick("certificadoMatrimonioURL")}
          >
            <Text className="text-primary">Seleccionar archivo (PDF)</Text>
          </TouchableOpacity>
        </View>
        <View className="mx-2 mb-4">
          <Text className="mb-2 text-base text-primary">
            Certificado del Bautismo
          </Text>
          <TouchableOpacity
            className="flex items-center justify-center h-10 bg-white border-2 rounded-3xl border-primary"
            onPress={() => handleDocumentPick("certificadoBautismoURL")}
          >
            <Text className="text-primary">Seleccionar archivo (PDF)</Text>
          </TouchableOpacity>
        </View>
        <View className="mx-2 mb-4">
          <Text className="mb-2 text-base text-primary">
            Formato Nulidad Matrimonial (obligatorio)
          </Text>
          <TouchableOpacity
            className="flex items-center justify-center h-10 bg-white border-2 rounded-3xl border-primary"
            onPress={() => handleDocumentPick("pruebasAdicionalesURL")}
          >
            <Text className="text-primary">Seleccionar archivo (PDF)</Text>
          </TouchableOpacity>
        </View>
        <View className="mx-2 mb-4">
          <Text className="mb-2 text-base text-primary">
            Declaración de consentimiento
          </Text>
          <View className="flex-row items-center mx-2">
            <TouchableOpacity
              onPress={() => setConsentimiento(!consentimiento)}
              className="mr-2"
            >
              <View
                className={`w-6 h-6 border-2 border-primary rounded-md ${
                  consentimiento ? "bg-primary" : "bg-white"
                }`}
              >
                {consentimiento && (
                  <Text className="text-center text-white">✓</Text>
                )}
              </View>
            </TouchableOpacity>
            <Text className="text-primary">
              Doy mi consentimiento para el procesamiento de mis datos
              personales
            </Text>
          </View>
        </View>
        <Button
          mode="contained"
          className="bg-primary"
          onPress={handleSubmit}
          disabled={!consentimiento}
        >
          Enviar
        </Button>
      </View>
    </ScrollView>
  );
}
