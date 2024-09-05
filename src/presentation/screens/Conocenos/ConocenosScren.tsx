import React from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const ConocenosScreen = () => {
  return (
    <ScrollView className="flex-1 p-4">
      <View className="flex items-center justify-center mt-4">
        <Image
          className="h-40 rounded-md w-72"
          source={require("./../../../../assets/conocenos.jpg")}
        />
        <Text className="text-xl italic font-bold text-center text-primary">
          Parroquia Tres Avemarias
        </Text>
        <Text className="text-base italic text-center text-primary ">
          Valledupar
        </Text>
      </View>
      <View className="mb-6">
        <View>
          <Text className="text-base font-bold">Historia de la Parroquia</Text>
          <Text className="mt-2 text-justify">
            Bajo su dirección, la parroquia de las Tres Avemarias, desmembrada
            de la parroquia de la Inmaculada Concepción, nace a su vida jurídica
            el 15 de agosto de 1956, según Decreto No. 05 de dicho mes y año. El
            culto se inicio en el paraninfo del Colegio Loperena antes de la
            erección de la Parroquia, y al crearse esta, en uno de los garajes
            de la residencia de Rafael Lacouture, actualmente de Juvenal Paz y
            Amparo de Paz.
          </Text>
          <Text className="mt-2 text-justify">
            El 28 de abril de 1957 se inaugura la primera capilla como lugar de
            culto provisional, obra iniciada el mismo 15 de agosto de 1956,
            fecha en el cual se puso la primera piedra. Con miras a la
            celebración de las Bodas de Plata de la Parroquia, 6 de enero de
            1980 se bendijo la primera piedra que daría forma al templo
            definitivo de la Parroquia; esta monumental empresa estuvo a cargo
            del tan recordado sacerdote José Cabrera, “Fray Mariano”, quien con
            su ardiente fervor y celo apostólico dinamizó una pastoral que tuvo
            amplio impacto en toda la ciudad.
          </Text>
          <Text className="mt-2 text-justify">
            La parroquia han prestado sus servicios como párrocos diferentes
            sacerdotes pertenecientes a la comunidad capuchina. El primero de
            ellos fue el Padre Manuel Osca Pellicer (Joaquín de Guadasuar), que
            a la vez fue canciller Secretario. Luego le sucede una extensa lista
            conformada por P. Jesualdo de Bañeres, P. Diego Pérez A. P. Eliseo
            Puig M., P. Generoso Ballesta, P. Antonio Nácher, P. Vicente Osca
            Bauxauli., P. Guillermo Rozo Luque, P. José Cabrera Riquelme, P.
            Eduardo Reillo Llácer, P. Eugenio Vinalesa, P. Jorge Arcila Rivera,
            P. Francisco Luís García Salazar, P. Dubían Alirio Gómez, P. Jaime
            Arturo Román, P. Guillermo Viana Giraldo, P. Alfonso Miranda Medina.
          </Text>
          <Text className="mt-2 text-justify ">
            La parroquia celebró sus Bodas de Oro el pasado 15 de agosto de
            2006. En el departamento del Cesar, los Hermanos Menores Capuchinos
            de la Provincia de Valencia (España) iniciaron su misión
            evangelizadora entre los indígenas motilones y arahuacos, en la
            sierra del Perijá y en la Sierra Nevada de Santa Marta. Pero fue con
            la creación del vicariato apostólico de Valledupar (1952), como los
            Capuchinos consolidaron su presencia en esta ciudad. Con el
            Vicariato vino el Vicario Apostólico, Mons. Vicente Roig y Villalba
            (1904 – 1977) quien el día 9 de marzo de 1952 toma posesión del
            nuevo cargo.
          </Text>
        </View>
        <View>
          <Text className="text-base font-bold ">Espacios pastorales</Text>
          <Text className="mt-2 text-justify">
            La parroquia cuenta con múltiples realidades que intentan
            promocionar integralmente al ser humano. Concretamente, nivel
            infantil, acompañamos el grupo de acólitos, la NINFRA (Niñez
            franciscana) y los diferentes grupos de catequesis pre-sacramental;
            en cuanto a la pastoral juvenil, existen dos “presídium” de la
            Legión de María, la JUFRA (juventud franciscana), y los ministerios
            musicales.
          </Text>
          <Text className="mt-2 text-justify">
            En referencia a los adultos, existen varios grupos de las “pequeñas
            comunidades”, así como varios “presídium” de la Legión de María;
            también apoyamos a la OFS (Orden Franciscana Seglar) que es una de
            las realidades de nuestra Parroquia, que existe desde el inicio de
            la Diócesis, es decir, lleva cuarenta años de presencia en la
            Diócesis de Valledupar. Son actualmente cuarenta miembros, hombres y
            mujeres.
          </Text>
          <Text className="mt-2 text-justify">
            La OFS está dirigida por el llamado CONSEJO (término franciscano),
            integrado por una MINISTRA, Señora Cecilia Oñate de Romero; una
            VICEMINISTRA, Señora Delfina Hinojosa; una SECRETARIA, Señora Lucia
            Martínez de Anaya; MAESTRA DE FORMACION; Gloria Naranjo de Pimienta.
            La Fraternidad está bajo el patrocinio de Nuestra Señora de los
            Ángeles, la RCC (Renovación Carismática Católica), el grupo de
            parejas. Adicionalmente a esto, apoyamos otras obras como el comedor
            comunitario “Cristo llama a tu puerta”, la fundación “Casa de la
            Mujer”, los cenáculos animados por la Hermanas Peregrinas
            Eucarísticas, y algunas actividades desarrolladas por la Diócesis a
            través de la Pastoral Social y de la Salud.
          </Text>
          <Text className="mt-2 text-justify">
            Los Hermanos Menores Capuchinos también estamos al frente del “Hogar
            del Niño”, dirigido por el P. Juan Guinart; allí no solamente
            velamos por la calidad de la educación para los menores de los
            estratos más bajos de la ciudad, sino que ofrecemos diferentes
            refuerzos alimenticios, tanto para los niños, como para algunos
            adultos mayores del sector que viven en condiciones de
            desprotección. Últimamente también estamos vinculados al programa
            “Aulas en Paz” que apoya la Secretaría de Educación Municipal y, a
            partir de allí, se ha conformado un movimiento juvenil por la
            noviolencia que busca la pacificación de las relaciones en los
            jóvenes de la ciudad.
          </Text>
          <Text className="mt-2 text-justify">
            Apoyamos otras obras como el comedor comunitario. Adicionalmente
            tenemos la Fundación CRISTO LLAMA A TU PUERTA con una proyección
            netamente.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
