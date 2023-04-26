import React, { useState } from 'react';
import { 
  Text, 
  View , 
  StyleSheet, 
  Button, 
  Pressable,
  Modal,
  FlatList,
  Alert} 
from 'react-native';

import Formulario from './src/components/Formulario.jsx';
import Paciente from './src/components/Paciente.jsx';
import InformacionPaciente from './src/components/InformacionPaciente.jsx';

/*REGLAS DE HOOKS: 
1.-Los hooks siempre van en la parte superior de nuestro script
2.-No pueden ir dentro de condicionales. Ej: (if (...) 
*/

const App = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [paciente, setPaciente] = useState<any[]>([])

  const [pacienteSingular, setPacienteSingular] = useState({});
  const [modalPaciente, setModalPaciente] = useState(false);

  //para editar el paciente
  const pacienteEditar = (id: string) => {
    const pacienteEditar = paciente.filter( paciente => paciente.id === id)
    setPacienteSingular(pacienteEditar[0]);
  }

  const pacienteEliminar = (id: string) => {
    Alert.alert('¿Deseas eliminar este paciente?',
      'un paciente eliminado no se puede recuperar', 
      [
        {text: 'Cancelar'},
        {text: 'Sí, eliminar', onPress: () => {
          const pacientesActualizados = paciente.filter( 
            pacientesState => pacientesState.id !== id)
            setPaciente(pacientesActualizados);
    
        }}
      ]
    );
  }
  
  const cerrarModal = () => {
    setModalVisible(false)
  }

  return (
    <View style= {styles.container}>
      <Text style={styles.titulo}>Administrador de Citas{' '} 
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      <Pressable style={styles.btnNuevaCita} onPress={() => {setModalVisible(!modalVisible)}}>
        <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
      </Pressable>

      { paciente.length === 0 ? 
        <Text style={styles.noPacientes}>No hay pacientes aún</Text>: 
        <FlatList
          style= {styles.listado}
          data={ paciente }
          keyExtractor={(item) => item.id}
          renderItem={({item})=> {
            return(
              <Paciente 
                setModalVisible= {setModalVisible}
                setPacienteSingular = {setPacienteSingular}
                pacienteEditar= {pacienteEditar}
                pacienteEliminar= {pacienteEliminar}
                item={item}
                setModalPaciente={setModalPaciente}
               
              />
            )
          }}
        />
  
      }
      
      {modalVisible && (
        <Formulario 
        cerrarModal={cerrarModal}
        paciente= {paciente}
        setPaciente = { setPaciente }
        pacienteSingular= { pacienteSingular }
        setPacienteSingular= {setPacienteSingular}
      />
      )}
      
      
      <Modal
        visible={modalPaciente}
        animationType='fade'
      >
        <InformacionPaciente
          pacienteSingular={pacienteSingular}
          setModalPaciente={setModalPaciente}
          setPacienteSingular={setPacienteSingular}
        />

      </Modal>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1
  },
  titulo: {
    textAlign: 'center',
    fontSize: 20,
    color:'#374151',
    fontWeight:'600'
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9'
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 20,
    marginTop: 20,
    marginHorizontal:20,
    borderRadius: 10
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30
  }
});

export default App;
